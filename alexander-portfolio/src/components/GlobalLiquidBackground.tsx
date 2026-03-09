"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

const simulationVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const simulationFragmentShader = `
  uniform sampler2D tPrev;
  uniform vec2 uMouse;
  uniform float uStrength;
  uniform float uRadius;
  uniform float uDissipation;
  uniform vec2 uAspect;
  varying vec2 vUv;

  void main() {
    vec4 prev = texture2D(tPrev, vUv);
    vec2 p = vUv * uAspect;
    vec2 m = uMouse * uAspect;
    float d = distance(p, m);
    float splat = exp(-d * d / (uRadius * uRadius)) * uStrength;
    float mask = prev.r * uDissipation + splat;
    gl_FragColor = vec4(clamp(mask, 0.0, 1.5), 0.0, 0.0, 1.0);
  }
`;

const displayVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const displayFragmentShader = `
  uniform sampler2D tMask;
  varying vec2 vUv;

  void main() {
    float mask = texture2D(tMask, vUv).r;
    
    // Create a "gooey reveal" style for the background
    // We reveal a subtle "interactive glow" over the dark background
    
    vec3 bg = vec3(0.015, 0.015, 0.02); // Deep dark background
    vec3 secondary = vec3(0.04, 0.06, 0.15); // Subtle blueish depth
    
    // High-impact reveal color (Cyan/Blue liquid)
    vec3 splash = vec3(0.2, 0.5, 1.0) * mask;
    
    // Gooey border logic
    float threshold = 0.1;
    float edge = 0.2;
    float gooeyMask = smoothstep(threshold - edge, threshold + edge, mask);
    
    vec3 finalCol = mix(bg, secondary + splash, gooeyMask);
    
    // Static grain for texture
    float grain = (sin(vUv.x * 2000.0) * sin(vUv.y * 2000.0)) * 0.01;
    
    gl_FragColor = vec4(finalCol + grain, 1.0);
  }
`;

export default function GlobalLiquidBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // We use innerWidth/Height because this is a fixed background
    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspect = new THREE.Vector2(width / Math.min(width, height), height / Math.min(width, height));

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    containerRef.current.appendChild(renderer.domElement);

    const simRes = 512;
    let renderTargetA = new THREE.WebGLRenderTarget(simRes, simRes, {
      type: THREE.HalfFloatType,
      format: THREE.RGBAFormat
    });
    let renderTargetB = new THREE.WebGLRenderTarget(simRes, simRes, {
      type: THREE.HalfFloatType,
      format: THREE.RGBAFormat
    });

    const simMaterial = new THREE.ShaderMaterial({
      uniforms: {
        tPrev: { value: null },
        uMouse: { value: new THREE.Vector2(-1, -1) },
        uStrength: { value: 0.15 },
        uRadius: { value: 0.25 },
        uDissipation: { value: 0.96 },
        uAspect: { value: aspect },
      },
      vertexShader: simulationVertexShader,
      fragmentShader: simulationFragmentShader,
    });

    const simMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), simMaterial);
    const simScene = new THREE.Scene();
    simScene.add(simMesh);

    const displayMaterial = new THREE.ShaderMaterial({
      uniforms: { tMask: { value: null } },
      vertexShader: displayVertexShader,
      fragmentShader: displayFragmentShader,
    });

    const displayMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), displayMaterial);
    scene.add(displayMesh);

    const mouse = new THREE.Vector2(-1, -1);
    const handleMouseMove = (e: MouseEvent) => {
      // Map global viewport cursor to [0, 1]
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = 1.0 - (e.clientY / window.innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);

    let frameId: number;
    const animate = () => {
      simMaterial.uniforms.tPrev.value = renderTargetA.texture;
      simMaterial.uniforms.uMouse.value = mouse;
      renderer.setRenderTarget(renderTargetB);
      renderer.render(simScene, camera);

      const temp = renderTargetA;
      renderTargetA = renderTargetB;
      renderTargetB = temp;

      displayMaterial.uniforms.tMask.value = renderTargetA.texture;
      renderer.setRenderTarget(null);
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      simMaterial.uniforms.uAspect.value.set(w / Math.min(w, h), h / Math.min(w, h));
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameId);
      renderer.dispose();
      renderTargetA.dispose();
      renderTargetB.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-50 pointer-events-none" />;
}

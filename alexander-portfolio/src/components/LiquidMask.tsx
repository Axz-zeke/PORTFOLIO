"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

interface LiquidMaskProps {
  imageBase: string;
  imageHover: string;
  className?: string;
  splatRadius?: number;
  splatStrength?: number;
  dissipation?: number;
  threshold?: number;
}

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
    
    // Correct for aspect ratio to keep splat circular relative to the quad
    vec2 p = vUv * uAspect;
    vec2 m = uMouse * uAspect;
    
    float d = distance(p, m);
    
    // Gaussian splat
    float splat = exp(-d * d / (uRadius * uRadius)) * uStrength;
    
    // Red channel holds our cumulative mask
    float mask = prev.r * uDissipation + splat;
    
    gl_FragColor = vec4(clamp(mask, 0.0, 1.5), 0.0, 0.0, 1.0);
  }
`;

const displayVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const displayFragmentShader = `
  uniform sampler2D tBase;
  uniform sampler2D tHover;
  uniform sampler2D tMask;
  uniform float uThreshold;
  varying vec2 vUv;

  void main() {
    vec4 base = texture2D(tBase, vUv);
    vec4 hover = texture2D(tHover, vUv);
    float mask = texture2D(tMask, vUv).r;
    
    // Gooey border effect
    float edge = 0.05;
    float alpha = smoothstep(uThreshold - edge, uThreshold + edge, mask);
    
    gl_FragColor = mix(base, hover, alpha);
  }
`;

export default function LiquidMask({
  imageBase,
  imageHover,
  className = "",
  splatRadius = 0.15,
  splatStrength = 0.5,
  dissipation = 0.98,
  threshold = 0.15,
}: LiquidMaskProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const mouseRef = useRef(new THREE.Vector2(-1, -1)); // Start outside

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const aspect = new THREE.Vector2(width / Math.min(width, height), height / Math.min(width, height));

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const loader = new THREE.TextureLoader();
    const baseTex = loader.load(imageBase);
    const hoverTex = loader.load(imageHover);
    baseTex.minFilter = THREE.LinearFilter;
    hoverTex.minFilter = THREE.LinearFilter;

    const simRes = 512;
    let renderTargetA = new THREE.WebGLRenderTarget(simRes, simRes, {
      type: THREE.HalfFloatType,
      format: THREE.RGBAFormat,
    });
    let renderTargetB = new THREE.WebGLRenderTarget(simRes, simRes, {
      type: THREE.HalfFloatType,
      format: THREE.RGBAFormat,
    });

    const simMaterial = new THREE.ShaderMaterial({
      uniforms: {
        tPrev: { value: null },
        uMouse: { value: new THREE.Vector2(-1, -1) },
        uStrength: { value: splatStrength },
        uRadius: { value: splatRadius },
        uDissipation: { value: dissipation },
        uAspect: { value: aspect },
      },
      vertexShader: simulationVertexShader,
      fragmentShader: simulationFragmentShader,
    });

    const simMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), simMaterial);
    const simScene = new THREE.Scene();
    simScene.add(simMesh);

    const displayMaterial = new THREE.ShaderMaterial({
      uniforms: {
        tBase: { value: baseTex },
        tHover: { value: hoverTex },
        tMask: { value: null },
        uThreshold: { value: threshold },
      },
      vertexShader: displayVertexShader,
      fragmentShader: displayFragmentShader,
    });

    const displayMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), displayMaterial);
    scene.add(displayMesh);

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();

      // PRECISE MAPPING: Map global viewport cursor to local component UV space
      // Even if the mouse is outside the component, we want the "splat" to track correctly
      // when it eventually passes over or near the component bounds.
      mouseRef.current.x = (e.clientX - rect.left) / rect.width;
      mouseRef.current.y = 1.0 - (e.clientY - rect.top) / rect.height;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;
    const animate = () => {
      simMaterial.uniforms.tPrev.value = renderTargetA.texture;
      simMaterial.uniforms.uMouse.value = mouseRef.current;

      renderer.setRenderTarget(renderTargetB);
      renderer.render(simScene, camera);

      const temp = renderTargetA;
      renderTargetA = renderTargetB;
      renderTargetB = temp;

      displayMaterial.uniforms.tMask.value = renderTargetA.texture;
      renderer.setRenderTarget(null);
      renderer.render(scene, camera);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      renderer.setSize(w, h);
      simMaterial.uniforms.uAspect.value.set(w / Math.min(w, h), h / Math.min(w, h));
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      renderTargetA.dispose();
      renderTargetB.dispose();
      simMesh.geometry.dispose();
      simMaterial.dispose();
      displayMesh.geometry.dispose();
      displayMaterial.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [imageBase, imageHover, splatRadius, splatStrength, dissipation, threshold]);

  return <div ref={containerRef} className={`w-full h-full ${className}`} />;
}

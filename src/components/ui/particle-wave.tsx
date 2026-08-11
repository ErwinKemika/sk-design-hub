import { useEffect, useRef, type HTMLAttributes } from "react";
import type * as THREE from "three";
import { cn } from "@/lib/utils";

export interface ParticleWaveProps extends HTMLAttributes<HTMLDivElement> {
  gap?: number;
  amountX?: number;
  amountY?: number;
}

const PARTICLE_VERTEX_SHADER = `
  attribute float scale;
  uniform float uTime;
  void main() {
    vec3 p = position;
    float s = scale;
    p.y += (sin(p.x + uTime) * 0.5) + (cos(p.y + uTime) * 0.1) * 2.0;
    p.x += (sin(p.y + uTime) * 0.5);
    s += (sin(p.x + uTime) * 0.5) + (cos(p.y + uTime) * 0.1) * 2.0;
    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = s * 15.0 * (1.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const PARTICLE_FRAGMENT_SHADER = `
  uniform vec3 uColor;
  void main() {
    gl_FragColor = vec4(uColor, 0.5);
  }
`;

// Matches this site's --charcoal / --gold brand colors (src/styles.css)
const BACKGROUND_COLOR_HEX = 0x1a1a1a;
const PARTICLE_COLOR_RGB: [number, number, number] = [201 / 255, 162 / 255, 74 / 255];

export function ParticleWave({
  className,
  gap = 0.3,
  amountX = 120,
  amountY = 60,
  ...props
}: ParticleWaveProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    // Loaded dynamically so this ~1MB WebGL library never ends up in the
    // server-rendered bundle, it only matters in the browser.
    import("three").then((THREE) => {
      if (disposed || !container) return;

      const canvas = document.createElement("canvas");
      canvas.className = "block h-full w-full";
      container.appendChild(canvas);

      const camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / Math.max(container.clientHeight, 1),
        0.01,
        1000,
      );
      camera.position.set(0, 6, 5);

      const scene = new THREE.Scene();

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(new THREE.Color(BACKGROUND_COLOR_HEX));

      const particleNum = amountX * amountY;
      const positions = new Float32Array(particleNum * 3);
      const scales = new Float32Array(particleNum);

      let i = 0;
      let j = 0;
      for (let ix = 0; ix < amountX; ix++) {
        for (let iy = 0; iy < amountY; iy++) {
          positions[i] = ix * gap - (amountX * gap) / 2;
          positions[i + 1] = 0;
          positions[i + 2] = iy * gap - (amountY * gap) / 2;
          scales[j] = 1;
          i += 3;
          j++;
        }
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

      const material = new THREE.ShaderMaterial({
        transparent: true,
        vertexShader: PARTICLE_VERTEX_SHADER,
        fragmentShader: PARTICLE_FRAGMENT_SHADER,
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new THREE.Vector3(...PARTICLE_COLOR_RGB) },
        },
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      let animationId: number | null = null;
      let isVisible = true;

      function resize() {
        const width = container!.clientWidth;
        const height = container!.clientHeight;
        if (width === 0 || height === 0) return;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
      }

      function animate() {
        if (isVisible) {
          material.uniforms.uTime.value += 0.05;
          camera.lookAt(scene.position);
          renderer.render(scene, camera);
        }
        animationId = requestAnimationFrame(animate);
      }

      resize();
      animate();

      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(container);

      const intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting;
        },
        { threshold: 0 },
      );
      intersectionObserver.observe(container);

      cleanup = () => {
        if (animationId !== null) cancelAnimationFrame(animationId);
        resizeObserver.disconnect();
        intersectionObserver.disconnect();
        scene.remove(particles);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        container.removeChild(canvas);
      };
    });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [gap, amountX, amountY]);

  return <div ref={containerRef} className={cn("absolute inset-0", className)} {...props} />;
}

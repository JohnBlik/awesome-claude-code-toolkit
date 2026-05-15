import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Subtle premium 3D background:
 *  - A slowly drifting starfield (BufferGeometry of points) reacts to scroll & mouse.
 *  - Two low-poly icosahedrons with wireframe + soft fill drift through the scene.
 *  - Two point lights tint the geometry violet/pink for depth.
 *  - Pauses via IntersectionObserver + visibilitychange. Caps DPR at 1.5.
 */
export function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const POINTS = isMobile ? 600 : 1400;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b0b15, 0.045);

    const camera = new THREE.PerspectiveCamera(
      55,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'low-power',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    renderer.domElement.setAttribute('aria-hidden', 'true');

    // -- Starfield ------------------------------------------------------------
    const positions = new Float32Array(POINTS * 3);
    const colors = new Float32Array(POINTS * 3);
    const sizes = new Float32Array(POINTS);
    const palette = [
      new THREE.Color('#818cf8'),
      new THREE.Color('#c084fc'),
      new THREE.Color('#f472b6'),
      new THREE.Color('#22d3ee'),
    ];
    for (let i = 0; i < POINTS; i++) {
      const r = 6 + Math.random() * 24;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi) - 8;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3 + 0] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
      sizes[i] = 0.03 + Math.random() * 0.06;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    starGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const starMat = new THREE.PointsMaterial({
      size: 0.07,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // -- Icosahedron pair -----------------------------------------------------
    const makeIcosa = (radius: number, detail: number, x: number, color: number) => {
      const geo = new THREE.IcosahedronGeometry(radius, detail);
      const fill = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.45,
        metalness: 0.15,
        transparent: true,
        opacity: 0.06,
      });
      const wire = new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity: 0.18,
      });
      const meshFill = new THREE.Mesh(geo, fill);
      const meshWire = new THREE.Mesh(geo, wire);
      const group = new THREE.Group();
      group.add(meshFill, meshWire);
      group.position.x = x;
      scene.add(group);
      return group;
    };

    const icosaA = makeIcosa(1.8, 1, -3.2, 0xa855f7);
    const icosaB = makeIcosa(1.1, 0, 3.4, 0x22d3ee);

    // -- Lights ---------------------------------------------------------------
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);
    const lightA = new THREE.PointLight(0xa855f7, 2.2, 22);
    lightA.position.set(-4, 3, 4);
    scene.add(lightA);
    const lightB = new THREE.PointLight(0xec4899, 1.6, 22);
    lightB.position.set(5, -2, 4);
    scene.add(lightB);

    // -- Interaction state ----------------------------------------------------
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouse.tx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.ty = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    let scrollFactor = 0;
    let scrollMax = 1;
    const onScroll = () => {
      scrollMax = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollFactor = window.scrollY / scrollMax;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // -- Loop -----------------------------------------------------------------
    let raf = 0;
    let running = true;
    const clock = new THREE.Clock();
    const tick = () => {
      if (!running) return;
      const t = clock.getElapsedTime();
      // Smooth mouse follow
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;

      stars.rotation.y = t * 0.035 + mouse.x * 0.25;
      stars.rotation.x = -mouse.y * 0.18 + scrollFactor * 0.6;

      icosaA.rotation.y += 0.0035;
      icosaA.rotation.x += 0.0018;
      icosaA.position.y = Math.sin(t * 0.7) * 0.4 - scrollFactor * 1.2;

      icosaB.rotation.y -= 0.0045;
      icosaB.rotation.z += 0.0022;
      icosaB.position.y = Math.cos(t * 0.6) * 0.6 - scrollFactor * 1.5;

      camera.position.x += (mouse.x * 1.5 - camera.position.x) * 0.04;
      camera.position.y += (mouse.y * 1.0 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };

    // -- Resize ---------------------------------------------------------------
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    // -- Visibility / IntersectionObserver -----------------------------------
    const start = () => {
      if (running || reduced) return;
      running = true;
      clock.start();
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      if (!running) return;
      running = false;
      clock.stop();
      if (raf) cancelAnimationFrame(raf);
    };

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener('visibilitychange', onVisibility);

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;
        if (e.isIntersecting) start();
        else stop();
      },
      { rootMargin: '120px' }
    );
    io.observe(mount);

    if (reduced) {
      // Render once for a still frame.
      renderer.render(scene, camera);
      running = false;
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
      io.disconnect();
      starGeo.dispose();
      starMat.dispose();
      icosaA.children.forEach((c) => {
        const m = c as THREE.Mesh;
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
      });
      icosaB.children.forEach((c) => {
        const m = c as THREE.Mesh;
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [reduced]);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ contain: 'strict' }}
    />
  );
}

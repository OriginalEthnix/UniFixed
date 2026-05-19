"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [threeLoaded, setThreeLoaded] = useState(false);

  useEffect(() => {
    if (!threeLoaded || !canvasRef.current) return;

    const THREE = (window as any).THREE;
    if (!THREE) return;

    const canvas = canvasRef.current;
    
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const camera = new THREE.PerspectiveCamera(
      45,
      canvas.offsetWidth / canvas.offsetHeight,
      0.1,
      100
    );
    camera.position.z = 5;

    const scene = new THREE.Scene();

    // 1. THE GLOBE
    const texCanvas = document.createElement("canvas");
    texCanvas.width = 512;
    texCanvas.height = 512;
    const ctx = texCanvas.getContext("2d")!;
    ctx.fillStyle = "#0a0a1a";
    ctx.fillRect(0, 0, 512, 512);
    ctx.fillStyle = "rgba(168,85,247,0.6)";

    for (let i = 0; i < 30; i++) {
      ctx.beginPath();
      const startX = Math.random() * 512;
      const startY = Math.random() * 512;
      ctx.moveTo(startX, startY);
      for (let j = 0; j < 5; j++) {
        ctx.bezierCurveTo(
          startX + (Math.random() - 0.5) * 100,
          startY + (Math.random() - 0.5) * 100,
          startX + (Math.random() - 0.5) * 100,
          startY + (Math.random() - 0.5) * 100,
          startX + (Math.random() - 0.5) * 100,
          startY + (Math.random() - 0.5) * 100
        );
      }
      ctx.fill();
    }
    const globeTex = new THREE.CanvasTexture(texCanvas);

    const globeGeo = new THREE.SphereGeometry(1.5, 64, 64);
    const globeMat = new THREE.MeshPhongMaterial({
      color: 0x0a0a1a,
      emissive: 0x1a0a3a,
      specular: 0xa855f7,
      shininess: 120,
      map: globeTex,
    });
    const globe = new THREE.Mesh(globeGeo, globeMat);

    const wireGeo = new THREE.SphereGeometry(1.52, 24, 24);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const wireframeSphere = new THREE.Mesh(wireGeo, wireMat);

    const glowGeo = new THREE.SphereGeometry(1.65, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.06,
      side: THREE.BackSide,
    });
    const glowShell = new THREE.Mesh(glowGeo, glowMat);

    const pl1 = new THREE.PointLight(0xffffff, 1.2);
    pl1.position.set(-3, 3, 3);
    scene.add(pl1);

    const al = new THREE.AmbientLight(0x1a0a3a, 0.8);
    scene.add(al);

    const pl2 = new THREE.PointLight(0x22d3ee, 0.6);
    pl2.position.set(3, -2, -3);
    scene.add(pl2);

    const pl3 = new THREE.PointLight(0xa855f7, 0.5);
    pl3.position.set(-2, 2, -3);
    scene.add(pl3);

    // 2. THE GRADUATION CAP
    const capGroup = new THREE.Group();
    capGroup.position.y = 1.6;

    const boardGeo = new THREE.BoxGeometry(1.8, 0.06, 1.8);
    const boardMat = new THREE.MeshPhongMaterial({
      color: 0x0d0d0d,
      specular: 0xffffff,
      shininess: 300,
      reflectivity: 1,
    });
    const board = new THREE.Mesh(boardGeo, boardMat);
    capGroup.add(board);

    const boardRimGeo = new THREE.BoxGeometry(1.82, 0.065, 1.82);
    const boardRimMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.5,
    });
    const boardRim = new THREE.Mesh(boardRimGeo, boardRimMat);
    capGroup.add(boardRim);

    const baseGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.2, 32);
    const capBase = new THREE.Mesh(baseGeo, boardMat);
    capBase.position.y = -0.13;
    capGroup.add(capBase);

    const baseRimGeo = new THREE.TorusGeometry(0.45, 0.012, 8, 32);
    const baseRimMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee });
    const baseRim = new THREE.Mesh(baseRimGeo, baseRimMat);
    baseRim.position.y = -0.1;
    baseRim.rotation.x = Math.PI / 2;
    capBase.add(baseRim);

    const buttonGeo = new THREE.SphereGeometry(0.06, 16, 16);
    const buttonMat = new THREE.MeshBasicMaterial({ color: 0xf472b6 });
    const button = new THREE.Mesh(buttonGeo, buttonMat);
    button.position.y = 0.06;
    capGroup.add(button);

    const tassel = new THREE.Group();
    tassel.position.set(0.9, 0, 0.9);
    
    const tasselLineGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.5, 8);
    const tasselLineMat = new THREE.MeshBasicMaterial({ color: 0xf4d03f });
    const tasselLine = new THREE.Mesh(tasselLineGeo, tasselLineMat);
    tasselLine.position.y = -0.25;
    tassel.add(tasselLine);
    
    const tasselEndGeo = new THREE.SphereGeometry(0.03);
    const tasselEnd = new THREE.Mesh(tasselEndGeo, tasselLineMat);
    tasselEnd.position.y = -0.5;
    tassel.add(tasselEnd);
    
    capGroup.add(tassel);

    // 3. GROUPING
    const masterGroup = new THREE.Group();
    masterGroup.add(globe);
    masterGroup.add(wireframeSphere);
    masterGroup.add(glowShell);
    masterGroup.add(capGroup);
    scene.add(masterGroup);

    // 4. ORBITING PARTICLES
    const orbits: any[] = [];
    const colors = [0x22d3ee, 0xf472b6, 0xa855f7];
    for (let i = 0; i < 3; i++) {
      const pivot = new THREE.Object3D();
      const pGeo = new THREE.SphereGeometry(0.04, 8, 8);
      const pMat = new THREE.MeshBasicMaterial({ color: colors[i] });
      const pMesh = new THREE.Mesh(pGeo, pMat);
      pMesh.position.x = 2.0 + i * 0.3;
      pivot.add(pMesh);
      scene.add(pivot);
      orbits.push(pivot);
    }

    // 5. STAR FIELD
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(200 * 3);
    for (let i = 0; i < 600; i++) {
      starPos[i] = (Math.random() - 0.5) * 30;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.03,
      transparent: true,
      opacity: 0.6,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // 6. RESIZE & ANIMATION
    const onResize = () => {
      if (!canvasRef.current) return;
      const w = canvasRef.current.offsetWidth;
      const h = canvasRef.current.offsetHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);
    onResize();

    const clock = new THREE.Clock();
    let frameId: number;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      masterGroup.rotation.y += 0.004;
      wireframeSphere.rotation.y += 0.002;
      wireframeSphere.rotation.x = Math.sin(elapsed * 0.2) * 0.1;
      masterGroup.position.y = Math.sin(elapsed * 0.8) * 0.12;

      tassel.rotation.z = Math.sin(elapsed * 1.5) * 0.2;

      const rotXSpeeds = [0.3, -0.5, 0.8];
      for (let i = 0; i < 3; i++) {
        orbits[i].rotation.y += 0.01 + i * 0.005;
        orbits[i].rotation.x = rotXSpeeds[i];
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(frameId);
      renderer.dispose();
      globeGeo.dispose();
      globeMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      glowGeo.dispose();
      glowMat.dispose();
      boardGeo.dispose();
      boardMat.dispose();
    };
  }, [threeLoaded]);

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        padding: "6rem 2rem 2rem",
        overflow: "hidden",
      }}
    >
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"
        strategy="lazyOnload"
        onLoad={() => setThreeLoaded(true)}
      />

      {/* Left content */}
      <div
        style={{
          flex: 1,
          maxWidth: "640px",
          zIndex: 2,
          position: "relative",
        }}
      >
        <h1
          className="hero-stagger-1"
          style={{
            fontSize: "clamp(3.5rem, 8vw, 7rem)",
            lineHeight: 1.05,
            marginBottom: "0.5rem",
            letterSpacing: "-0.03em",
          }}
        >
          <span style={{ fontWeight: 300, color: "#fff" }}>Uni</span>
          <span className="gradient-text-full" style={{ fontWeight: 800 }}>
            Fixed
          </span>
        </h1>

        <p
          className="hero-stagger-2"
          style={{
            fontSize: "clamp(1rem, 2vw, 1.35rem)",
            color: "var(--text-muted)",
            marginBottom: "2rem",
            fontWeight: 400,
          }}
        >
          AI powered college counseling
        </p>

        <div
          className="hero-stagger-3"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.3rem",
            marginBottom: "2.5rem",
          }}
        >
          {["JoSAA", "CSAB", "MCC", "and many other", "counseling bodies"].map(
            (item, i) => (
              <span
                key={i}
                style={{
                  fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
                  fontWeight: 500,
                  color: "var(--text-body)",
                }}
              >
                {item}
              </span>
            )
          )}
        </div>

        <div className="hero-stagger-4">
          <a href="#predict">
            <button className="btn-neon" style={{ fontSize: "1.05rem" }}>
              Get Started →
            </button>
          </a>
        </div>
      </div>

      {/* Right side — 3D Scene */}
      <div
        className="hero-stagger-5"
        style={{
          flex: 1,
          position: "relative",
          zIndex: 2,
        }}
      >
        <canvas id="hero-canvas" ref={canvasRef} />
      </div>

      {/* Tagline bottom-left */}
      <div
        className="hero-stagger-5"
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "2rem",
          zIndex: 2,
        }}
      >
        <p className="tagline">Predict. Compare. Decide.</p>
      </div>
    </section>
  );
}
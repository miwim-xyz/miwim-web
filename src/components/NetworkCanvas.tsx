"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  isSpecial: boolean;
}

const CONNECT_DIST = 160;
const MOUSE_RADIUS = 220;
const MOUSE_FORCE = 0.5;
const PRIMARY = "42, 161, 152"; // #2aa198 RGB
const ACCENT = "211, 54, 130"; // #d33682 RGB
const EDGE_COLOR = "147, 161, 161"; // text-tertiary RGB (light theme)

export default function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const nodesRef = useRef<Node[]>([]);
  const animRef = useRef<number>(0);
  const visibleRef = useRef(true);
  const cleanupMouseRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const NODE_COUNT = isMobile ? 40 : 80;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      canvas!.style.width = window.innerWidth + "px";
      canvas!.style.height = window.innerHeight + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    // Initialize nodes
    const nodes: Node[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: i < 5 ? 6 + Math.random() * 3 : 2.5 + Math.random() * 2.5,
        isSpecial: i < 5,
      });
    }
    nodesRef.current = nodes;

    // Mouse tracking
    if (!isMobile) {
      const onMove = (e: MouseEvent) => {
        mouseRef.current = { x: e.clientX, y: e.clientY };
      };
      const onClick = (e: MouseEvent) => {
        for (const node of nodes) {
          const dx = node.x - e.clientX;
          const dy = node.y - e.clientY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 280 && dist > 0) {
            const force = (1 - dist / 280) * 10;
            node.vx += (dx / dist) * force;
            node.vy += (dy / dist) * force;
          }
        }
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("click", onClick);

      cleanupMouseRef.current = () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("click", onClick);
      };
    }

    // IntersectionObserver to pause when not visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const w = () => window.innerWidth;
    const h = () => window.innerHeight;

    function animate() {
      animRef.current = requestAnimationFrame(animate);
      if (!visibleRef.current || !ctx) return;

      ctx.clearRect(0, 0, w(), h());
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Update nodes
      for (const node of nodes) {
        // Brownian motion
        node.vx += (Math.random() - 0.5) * 0.03;
        node.vy += (Math.random() - 0.5) * 0.03;

        // Mouse gravity (desktop)
        if (!isMobile) {
          const dx = mx - node.x;
          const dy = my - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS && dist > 0) {
            const force = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE;
            node.vx += (dx / dist) * force * 0.15;
            node.vy += (dy / dist) * force * 0.15;
          }
        }

        // Damping
        node.vx *= 0.97;
        node.vy *= 0.97;

        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Boundary wrapping
        if (node.x < -20) node.x = w() + 20;
        if (node.x > w() + 20) node.x = -20;
        if (node.y < -20) node.y = h() + 20;
        if (node.y > h() + 20) node.y = -20;
      }

      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const opacity = (1 - dist / CONNECT_DIST) * 0.18;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(${EDGE_COLOR}, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw nodes with glow
      for (const node of nodes) {
        const color = node.isSpecial ? ACCENT : PRIMARY;
        const alpha = node.isSpecial ? 0.65 : 0.45;

        // Glow
        if (node.radius > 4) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
          const grad = ctx.createRadialGradient(
            node.x, node.y, 0,
            node.x, node.y, node.radius * 3
          );
          grad.addColorStop(0, `rgba(${color}, 0.15)`);
          grad.addColorStop(1, `rgba(${color}, 0)`);
          ctx.fillStyle = grad;
          ctx.fill();
        }

        // Core
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${alpha})`;
        ctx.fill();
      }
    }

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      observer.disconnect();
      cleanupMouseRef.current?.();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ width: "100%", height: "100%" }}
    />
  );
}

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

const CONNECT_DIST = 150;
const MOUSE_RADIUS = 200;
const MOUSE_FORCE = 0.3;
const PRIMARY = "#2aa198";
const ACCENT = "#d33682";
const EDGE_COLOR = "101, 123, 131"; // text-tertiary RGB

export default function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const nodesRef = useRef<Node[]>([]);
  const animRef = useRef<number>(0);
  const visibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const NODE_COUNT = isMobile ? 35 : 70;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // Initialize nodes
    const nodes: Node[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: i < 4 ? 8 : 3 + Math.random() * 3,
        isSpecial: i < 4,
      });
    }
    nodesRef.current = nodes;

    // Mouse tracking (desktop only)
    if (!isMobile) {
      const onMove = (e: MouseEvent) => {
        mouseRef.current = { x: e.clientX, y: e.clientY };
      };
      const onClick = (e: MouseEvent) => {
        // Repulsion burst on click
        for (const node of nodes) {
          const dx = node.x - e.clientX;
          const dy = node.y - e.clientY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 250 && dist > 0) {
            const force = (1 - dist / 250) * 8;
            node.vx += (dx / dist) * force;
            node.vy += (dy / dist) * force;
          }
        }
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("click", onClick);

      // Cleanup stored for later
      (canvas as unknown as Record<string, () => void>)._cleanupMouse = () => {
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

    function animate() {
      animRef.current = requestAnimationFrame(animate);
      if (!visibleRef.current || !ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Update nodes
      for (const node of nodes) {
        // Brownian motion
        node.vx += (Math.random() - 0.5) * 0.02;
        node.vy += (Math.random() - 0.5) * 0.02;

        // Mouse gravity (desktop)
        if (!isMobile) {
          const dx = mx - node.x;
          const dy = my - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS && dist > 0) {
            const force = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE;
            node.vx += dx * force * 0.001;
            node.vy += dy * force * 0.001;
          }
        }

        // Damping
        node.vx *= 0.98;
        node.vy *= 0.98;

        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Boundary wrapping
        if (node.x < -20) node.x = canvas.width + 20;
        if (node.x > canvas.width + 20) node.x = -20;
        if (node.y < -20) node.y = canvas.height + 20;
        if (node.y > canvas.height + 20) node.y = -20;
      }

      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const opacity = (1 - dist / CONNECT_DIST) * 0.15;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(${EDGE_COLOR}, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.isSpecial
          ? `rgba(211, 54, 130, 0.6)`
          : `rgba(42, 161, 152, 0.4)`;
        ctx.fill();
      }
    }

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      observer.disconnect();
      const cleanup = (canvas as unknown as Record<string, () => void>)._cleanupMouse;
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0"
      style={{ width: "100%", height: "100%" }}
    />
  );
}

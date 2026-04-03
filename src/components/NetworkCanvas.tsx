"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  isSpecial: boolean;
  pulsePhase: number;
}

const CONNECT_DIST = 180;
const MOUSE_RADIUS = 280;
const MOUSE_FORCE = 1.2;
const PRIMARY = "42, 161, 152"; // #2aa198 RGB
const ACCENT = "211, 54, 130"; // #d33682 RGB
const EDGE_COLOR = "7, 54, 66"; // darker edge for light theme

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
    const NODE_COUNT = isMobile ? 45 : 90;

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
      const isSpecial = i < 6;
      const baseRadius = isSpecial ? 5 + Math.random() * 4 : 2 + Math.random() * 3;
      nodes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: baseRadius,
        baseRadius,
        isSpecial,
        pulsePhase: Math.random() * Math.PI * 2,
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
          if (dist < 320 && dist > 0) {
            const force = (1 - dist / 320) * 14;
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
    let time = 0;

    function animate() {
      animRef.current = requestAnimationFrame(animate);
      if (!visibleRef.current || !ctx) return;

      time += 0.016;
      ctx.clearRect(0, 0, w(), h());
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Update nodes
      for (const node of nodes) {
        // Brownian motion
        node.vx += (Math.random() - 0.5) * 0.04;
        node.vy += (Math.random() - 0.5) * 0.04;

        // Pulse radius for special nodes
        if (node.isSpecial) {
          node.radius = node.baseRadius + Math.sin(time * 1.5 + node.pulsePhase) * 1.5;
        }

        // Mouse gravity (desktop)
        if (!isMobile) {
          const dx = mx - node.x;
          const dy = my - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS && dist > 0) {
            const force = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE;
            node.vx += (dx / dist) * force * 0.3;
            node.vy += (dy / dist) * force * 0.3;
          }
        }

        // Damping
        node.vx *= 0.965;
        node.vy *= 0.965;

        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Boundary wrapping
        if (node.x < -20) node.x = w() + 20;
        if (node.x > w() + 20) node.x = -20;
        if (node.y < -20) node.y = h() + 20;
        if (node.y > h() + 20) node.y = -20;
      }

      // Draw mouse glow halo (desktop only)
      if (!isMobile && mx > 0 && my > 0) {
        const haloGrad = ctx.createRadialGradient(mx, my, 0, mx, my, 200);
        haloGrad.addColorStop(0, "rgba(42, 161, 152, 0.06)");
        haloGrad.addColorStop(0.5, "rgba(42, 161, 152, 0.02)");
        haloGrad.addColorStop(1, "rgba(42, 161, 152, 0)");
        ctx.beginPath();
        ctx.arc(mx, my, 200, 0, Math.PI * 2);
        ctx.fillStyle = haloGrad;
        ctx.fill();
      }

      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const opacity = (1 - dist / CONNECT_DIST) * 0.12;
            // Brighten connections near mouse
            let mouseBoost = 0;
            if (!isMobile) {
              const midX = (nodes[i].x + nodes[j].x) / 2;
              const midY = (nodes[i].y + nodes[j].y) / 2;
              const dMouse = Math.sqrt((midX - mx) ** 2 + (midY - my) ** 2);
              if (dMouse < MOUSE_RADIUS) {
                mouseBoost = (1 - dMouse / MOUSE_RADIUS) * 0.25;
              }
            }
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(${EDGE_COLOR}, ${opacity + mouseBoost})`;
            ctx.lineWidth = 1 + mouseBoost * 2;
            ctx.stroke();
          }
        }
      }

      // Draw nodes with glow
      for (const node of nodes) {
        const color = node.isSpecial ? ACCENT : PRIMARY;
        const alpha = node.isSpecial ? 0.85 : 0.65;

        // Proximity boost near mouse
        let proximityScale = 1;
        if (!isMobile) {
          const dMouse = Math.sqrt((node.x - mx) ** 2 + (node.y - my) ** 2);
          if (dMouse < MOUSE_RADIUS) {
            proximityScale = 1 + (1 - dMouse / MOUSE_RADIUS) * 0.4;
          }
        }

        const drawRadius = node.radius * proximityScale;

        // Glow for larger nodes
        if (drawRadius > 3.5) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, drawRadius * 3.5, 0, Math.PI * 2);
          const grad = ctx.createRadialGradient(
            node.x, node.y, 0,
            node.x, node.y, drawRadius * 3.5
          );
          grad.addColorStop(0, `rgba(${color}, 0.2)`);
          grad.addColorStop(1, `rgba(${color}, 0)`);
          ctx.fillStyle = grad;
          ctx.fill();
        }

        // Core
        ctx.beginPath();
        ctx.arc(node.x, node.y, drawRadius, 0, Math.PI * 2);
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

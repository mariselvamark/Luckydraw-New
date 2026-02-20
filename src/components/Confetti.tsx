import React, { useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';

const Canvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 9999;
`;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  rotation: number;
  rotationSpeed: number;
  gravity: number;
  opacity: number;
  decay: number;
  shape: 'rect' | 'circle' | 'strip';
}

const COLORS = [
  '#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF',
  '#FF8E53', '#845EC2', '#FF6F91', '#FFC75F',
  '#F9F871', '#00C9A7', '#C34A36', '#FF4E50',
  '#FC913A', '#F9D423', '#E8125C', '#7B68EE',
  '#FFD700', '#FF1493', '#00BFFF', '#32CD32',
];

interface ConfettiProps {
  active: boolean;
  duration?: number;
}

const Confetti: React.FC<ConfettiProps> = ({ active, duration = 4000 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  const createParticles = useCallback(() => {
    const particles: Particle[] = [];
    const count = 200;

    for (let i = 0; i < count; i++) {
      // Burst from center-ish with spread
      const angle = (Math.random() * Math.PI * 2);
      const speed = 4 + Math.random() * 12;
      const shapes: Particle['shape'][] = ['rect', 'circle', 'strip'];

      particles.push({
        x: window.innerWidth / 2 + (Math.random() - 0.5) * 200,
        y: window.innerHeight / 2 - 50 + (Math.random() - 0.5) * 100,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - Math.random() * 6,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 5 + Math.random() * 8,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 15,
        gravity: 0.12 + Math.random() * 0.08,
        opacity: 1,
        decay: 0.003 + Math.random() * 0.005,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
      });
    }

    // Add extra burst from top edges
    for (let i = 0; i < 80; i++) {
      const side = Math.random() > 0.5 ? 0 : window.innerWidth;
      particles.push({
        x: side + (Math.random() - 0.5) * 100,
        y: -20,
        vx: (side === 0 ? 1 : -1) * (2 + Math.random() * 5),
        vy: 2 + Math.random() * 4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 4 + Math.random() * 7,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        gravity: 0.1 + Math.random() * 0.06,
        opacity: 1,
        decay: 0.004 + Math.random() * 0.004,
        shape: 'strip',
      });
    }

    return particles;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const elapsed = Date.now() - startTimeRef.current;
    if (elapsed > duration + 2000) {
      particlesRef.current = [];
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current = particlesRef.current.filter((p) => {
      p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.99;
      p.rotation += p.rotationSpeed;
      p.opacity -= p.decay;

      if (p.opacity <= 0 || p.y > canvas.height + 50) return false;

      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;

      switch (p.shape) {
        case 'rect':
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
          break;
        case 'circle':
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
          break;
        case 'strip':
          ctx.fillRect(-p.size / 6, -p.size, p.size / 3, p.size * 2);
          break;
      }

      ctx.restore();
      return true;
    });

    if (particlesRef.current.length > 0) {
      animFrameRef.current = requestAnimationFrame(draw);
    }
  }, [duration]);

  useEffect(() => {
    if (active) {
      startTimeRef.current = Date.now();
      particlesRef.current = createParticles();
      animFrameRef.current = requestAnimationFrame(draw);
    }

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [active, createParticles, draw]);

  if (!active && particlesRef.current.length === 0) return null;

  return <Canvas ref={canvasRef} />;
};

export default Confetti;

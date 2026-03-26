"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// PIXRITY BRAND COLORS
const PIXRITY_COLORS = [
  "#00E5FF", // Neon Cyan
  "#7B61FF", // Electric Purple
  "#FF2D95"  // Neon Pink
];

const PIXRITY_LIGHTS = [
  "#00E5FF",
  "#7B61FF",
  "#1A1A2E",
  "#FF2D95"
];

interface TubesBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  enableClickInteraction?: boolean;
}

export function TubesBackground({ 
  children, 
  className,
  enableClickInteraction = true 
}: TubesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tubesRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;

    const initTubes = async () => {
      if (!canvasRef.current) return;

      try {
        // @ts-ignore
        const module = await import('https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js');
        const TubesCursor = module.default;

        if (!mounted) return;

        const app = TubesCursor(canvasRef.current, {
          tubes: {
            colors: PIXRITY_COLORS,
            lights: {
              intensity: 200,
              colors: PIXRITY_LIGHTS
            }
          }
        });

        tubesRef.current = app;
        setIsLoaded(true);

      } catch (error) {
        console.error("Failed to load TubesCursor:", error);
      }
    };

    initTubes();

    return () => {
      mounted = false;
    };
  }, []);

  const handleClick = () => {
    if (!enableClickInteraction || !tubesRef.current) return;

    // Shuffle within Pixrity palette
    const colors = [...PIXRITY_COLORS].sort(() => Math.random() - 0.5);
    const lights = [...PIXRITY_LIGHTS].sort(() => Math.random() - 0.5);

    tubesRef.current.tubes.setColors(colors);
    tubesRef.current.tubes.setLightsColors(lights);
  };

  return (
    <div 
      className={cn("relative w-full h-full min-h-screen overflow-hidden bg-black", className)}
      onClick={handleClick}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
      />
      
      <div className="relative z-10 w-full h-full pointer-events-none">
        {children}
      </div>
    </div>
  );
}

export default TubesBackground;

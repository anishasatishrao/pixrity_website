import React from "react";
import { TubesBackground } from "@/components/ui/neon-flow";
import { MousePointer2 } from "lucide-react";
import "./App.css";

export default function App() {
  return (
    <div className="w-full h-screen font-sans">
      <TubesBackground>
        <div className="flex flex-col items-center justify-center w-full h-full gap-6 text-center px-4">

          <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter">
            Pixrity
          </h1>

          <p className="text-white/60">
            AI • AR • 3D Experiences
          </p>

          <div className="absolute bottom-8 flex flex-col items-center gap-2 text-white/50 animate-pulse">
            <MousePointer2 />
            <span className="text-xs uppercase tracking-widest">
              Move the cursor and click to interact
            </span>
          </div>

        </div>
      </TubesBackground>
    </div>
  );
}

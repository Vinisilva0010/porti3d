import React from 'react';

export default function MonitorContent({ activeImage }) {
  return (
    <div 
      id="screen-content" 
      // MUDANÇA: Fundo Azul Noturno Sólido e Texto Branco
      className="w-[1024px] h-[640px] bg-[#020617] relative overflow-hidden flex items-center justify-center border-4 border-gray-800 font-mono text-white"
    >
      {/* 1. Standby Screen - Glassy Tech Background */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/20">

        {/* High visibility grid pattern */}
        <div className="absolute inset-0 opacity-30 bg-[linear-gradient(rgba(0,255,255,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.3)_1px,transparent_1px)] bg-size-[50px_50px]"></div>

        <h1 className="text-9xl font-black tracking-[0.2em] drop-shadow-[0_0_30px_rgba(255,255,255,0.8)] text-white mb-8">
          vinicius
        </h1>

        <div className="flex items-center gap-6 px-12 py-6 border-4 border-cyan-400 rounded-full bg-cyan-900/90 shadow-[0_0_50px_rgba(0,255,255,0.5)]">
          <div className="w-6 h-6 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_20px_#00ffff]"></div>
          <p className="text-cyan-50 font-bold text-4xl tracking-widest">full stack &</p>
          <p className="text-cyan-50 font-bold text-4xl tracking-widest">Blockchain</p>
        </div>
      </div>

      {/* 2. Project Image - Overlays if active */}
      {activeImage && (
        <img
          src={activeImage}
          alt="Project Preview"
          className="absolute inset-0 w-full h-full object-cover z-20"
        />
      )}
    </div>
  );
}
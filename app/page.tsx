'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import MonitorContent from '../components/MonitorContent';
import ProjectMenu from '../components/ProjectMenu';
import PremiumMenu from '../components/PremiumMenu';

const Zanvexis3D = dynamic(() => import('../components/Zanvexis3D'), {
  ssr: false,
  loading: () => <div className="h-screen w-full bg-black flex items-center justify-center text-cyan-500 font-bold tracking-widest">CARREGANDO SISTEMA...</div>
});

export default function Home() {
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  // Efeito do Scroll (opcional, já que agora o 3D vai dominar)
  useEffect(() => {
    // Forçar o topo ao carregar
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full min-h-[200vh] bg-black relative">
      
      {/* --- CAMADA DE DADOS (ESCONDIDA) --- 
          Os menus precisam existir no HTML para o Three.js pegar,
          MAS eles não podem aparecer na tela 2D, senão bloqueiam o mouse.
          Solução: Usar uma div oculta ou fora da tela.
      */}
      <div className="fixed top-0 left-0 opacity-0 pointer-events-none -z-50">
          <MonitorContent activeImage={currentImage} />
          {/* O Three.js vai "roubar" esses elementos daqui */}
          <ProjectMenu setHoveredProject={setCurrentImage} />
          <PremiumMenu setHoveredProject={setCurrentImage} />
      </div>

      {/* --- CAMADA 3D (FUNDO E INTERAÇÃO) --- */}
      <div className="fixed top-0 left-0 w-full h-screen z-0">
        <Zanvexis3D />
      </div>

      {/* --- ESPAÇO PARA ROLAGEM --- */}
      <div className="h-[120vh] w-full pointer-events-none"></div>

      {/* --- SEÇÃO SOBRE MIM (REFEITA: CLEAN E CENTRALIZADA) --- */}
      <section className="relative z-20 w-full min-h-screen flex items-center justify-center pointer-events-none p-4">

        {/* O CARD PROPRIAMENTE DITO */}
        <div
            // pointer-events-auto para permitir clicar no botão
            className="pointer-events-auto max-w-3xl w-full relative overflow-hidden transition-all duration-500 hover:scale-[1.01]"
            style={{
                // ESTILO CYBERPUNK GLASS
                borderRadius: '2rem', // Bem arredondado (32px)
                background: 'rgba(13, 13, 18, 0.75)', // Fundo azulado/preto muito transparente
                backdropFilter: 'blur(25px) saturate(120%)', // O segredo: desfoque forte do fundo 3D
                border: '1px solid rgba(120, 120, 255, 0.15)', // Borda sutil brilhante
                boxShadow: `
                  0 30px 60px -12px rgba(0, 0, 0, 0.8),   // Sombra profunda para destacar do fundo
                  0 0 40px rgba(100, 50, 255, 0.1) inset  // Brilho roxo interno
                `
            }}
        >
            {/* Efeito de luz decorativa no topo */}
            <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70 blur-sm"></div>

            {/* CONTEÚDO DO CARD */}
            <div className="p-10 md:p-14 text-center flex flex-col items-center gap-8">

                {/* Cabeçalho */}
                <div>
                    <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-3 drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
                        SOBRE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 filtering blur-[0.5px]">MIM</span>
                    </h2>
                    <p className="text-cyan-200 font-mono uppercase tracking-[0.3em] text-sm font-bold bg-cyan-900/30 px-4 py-1 rounded-full inline-block border border-cyan-500/20">
                        /// Fullstack & 3D Creator
                    </p>
                </div>

                {/* Texto Principal - Mais compacto e direto */}
                <div className="text-lg text-gray-100 leading-relaxed space-y-4 max-w-2xl font-light">
                    <p>
                       Construo produtos digitais com <strong className="text-white font-bold">velocidade e alta qualidade</strong>.
                    </p>
                    <p>
                       Minha especialidade é unir o poder do <span className="text-cyan-300 font-medium">Fullstack Moderno</span> (Next.js, Node) com a imersão do <span className="text-purple-300 font-medium">3D (Three.js)</span> e a inovação da <span className="text-pink-300 font-medium">IA</span>.
                    </p>
                    <p className="text-base text-gray-300">
                       Foco em criar Dashboards, SaaS e experiências que não são apenas funcionais, mas memoráveis.
                    </p>
                </div>

                {/* Grid de Skills (Chips Brilhantes) */}
                <div className="flex flex-wrap justify-center gap-3 max-w-xl">
                     {["React", "Next.js 14", "TypeScript", "Three.js Fiber", "Node API", "Python AI", "Tailwind", "Figma"].map((tech, i) => (
                         <span
                            key={tech}
                            className="px-5 py-2 rounded-full text-sm font-bold text-white transition-all hover:-translate-y-1 cursor-default"
                            style={{
                                background: `rgba(${i%2 ? '147, 51, 234' : '6, 182, 212'}, 0.15)`, // Alterna entre roxo e ciano
                                border: `1px solid rgba(${i%2 ? '147, 51, 234' : '6, 182, 212'}, 0.3)`,
                                boxShadow: `0 0 15px rgba(${i%2 ? '147, 51, 234' : '6, 182, 212'}, 0.1)`
                            }}
                         >
                             {tech}
                         </span>
                     ))}
                </div>

                {/* Botão de Ação */}
                <div className="mt-4">
                    <button className="group relative px-12 py-4 bg-white text-black font-black text-lg rounded-xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                        <span className="relative z-10 flex items-center gap-2">
                           VAMOS CONVERSAR ➜
                        </span>
                        {/* Efeito de hover no botão */}
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity z-0"></div>
                    </button>
                </div>

            </div>
        </div>
      </section>

    </main>
  );
}
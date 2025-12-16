'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import MonitorContent from '../components/MonitorContent';
import ProjectMenu from '../components/ProjectMenu';
import PremiumMenu from '../components/PremiumMenu';

// Carregamento do 3D
const Zanvexis3D = dynamic(() => import('../components/Zanvexis3D'), {
  ssr: false,
  loading: () => null
});

export default function Home() {
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full min-h-screen bg-black relative selection:bg-purple-500/30 selection:text-white overflow-x-hidden">
      
      {/* 1. MENUS FUNCIONAIS (MANTIDOS) */}
      <div className="fixed top-0 left-0 opacity-0 pointer-events-none -z-50">
          <div id="monitor-content"><MonitorContent activeImage={currentImage} /></div>
          <div id="project-menu"><ProjectMenu setHoveredProject={setCurrentImage} /></div>
          <div id="premium-menu"><PremiumMenu setHoveredProject={setCurrentImage} /></div>
      </div>

      {/* 2. FUNDO 3D */}
      <div className="fixed top-0 left-0 w-full h-screen z-0">
        <Zanvexis3D />
        <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
      </div>

      {/* Espaço inicial (Hero Section invisível para scroll) */}
      <div className="h-[90vh] w-full pointer-events-none flex flex-col items-center justify-end pb-12">
        <div className="animate-bounce text-white/30 text-[10px] tracking-[0.4em] uppercase font-bold">
            Role para explorar
        </div>
      </div>

      {/* ============================================================== */}
      {/* CONTEÚDO PRINCIPAL (COM CONTAINER TRAVADO)                     */}
      {/* ============================================================== */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 pb-40 flex flex-col gap-32">

        {/* --- CARD 1: ZANVEXIS (LAYOUT REFEITO) --- */}
        <section className="w-full">
            <div className="text-center mb-8">
                <span className="inline-block py-1 px-3 rounded-full bg-purple-900/30 border border-purple-500/30 text-[10px] font-bold text-purple-300 tracking-widest uppercase mb-4 backdrop-blur-md">
                    Startup +200 usuarios

                </span>
                <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter drop-shadow-2xl">
                    ZANVEXIS
                </h2>
            </div>

            {/* O CARD EM SI */}
            <div className="group relative w-full rounded-3xl bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/10 overflow-hidden hover:border-purple-500/30 transition-all duration-500 shadow-2xl">
                
                {/* Glow Traseiro */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-cyan-500/20 to-pink-600/20 blur-2xl opacity-0 group-hover:opacity-100 transition duration-700"></div>

                <div className="relative grid grid-cols-1 lg:grid-cols-5 h-full">
                    {/* VÍDEO (Ocupa 3 colunas) */}
                    <div className="lg:col-span-3 bg-black relative border-b lg:border-b-0 lg:border-r border-white/10 min-h-[300px] lg:min-h-[400px]">
                       <iframe 
                          className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-500 grayscale group-hover:grayscale-0"
                          src="https://www.youtube.com/embed/1gjreY0JYr8?autoplay=1&mute=1&loop=1&playlist=1gjreY0JYr8&controls=0&rel=0&showinfo=0&modestbranding=1" 
                          title="Zanvexis AI Workforce"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen
                      ></iframe>
                        {/* Overlay Gradiente para o texto não colar no vídeo */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                    </div>

                    {/* TEXTO (Ocupa 2 colunas) */}
                    <div className="lg:col-span-2 p-8 lg:p-10 flex flex-col justify-center bg-gradient-to-b from-white/5 to-transparent">
                        <h3 className="text-3xl font-black text-white mb-4 italic uppercase tracking-tighter">
                            Ecossistema <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">IA</span>
                        </h3>
                        
                        <p className="text-sm text-gray-300 leading-relaxed mb-8 font-light border-l-2 border-purple-500 pl-4">
                            A tecnologia proprietária da <strong className="text-white">Zanvexis</strong> utiliza enxames de Agentes Autônomos para eliminar processos manuais financeiros e de atendimento.
                        </p>

                        <div className="grid grid-cols-2 gap-3 mb-8">
                             <div className="bg-black/40 border border-cyan-500/30 rounded px-3 py-2 text-[10px] font-bold text-cyan-400 uppercase tracking-wider text-center">Next.js 14</div>
                             <div className="bg-black/40 border border-purple-500/30 rounded px-3 py-2 text-[10px] font-bold text-purple-400 uppercase tracking-wider text-center">AI Agents</div>
                             <div className="bg-black/40 border border-pink-500/30 rounded px-3 py-2 text-[10px] font-bold text-pink-400 uppercase tracking-wider text-center">Stripe</div>
                             <div className="bg-black/40 border border-orange-500/30 rounded px-3 py-2 text-[10px] font-bold text-orange-400 uppercase tracking-wider text-center">Rust</div>
                        </div>

                        <a 
                            href="https://zanvexis.com" 
                            target="_blank"
                            className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs uppercase tracking-[0.2em] transition-all text-center shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.6)]"
                        >
                            Acessar Plataforma
                        </a>
                    </div>
                </div>
            </div>
        </section>

        {/* --- CARD 2: SOBRE MIM (LAYOUT REFEITO) --- */}
        <section id="sobre" className="w-full flex justify-center">
             <div className="relative w-full max-w-4xl">
                
                {/* Efeito Neon Decorativo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[90%] bg-gradient-to-r from-purple-600/10 via-transparent to-cyan-600/10 blur-3xl -z-10 rounded-full"></div>

                <div className="bg-[#050505]/80 backdrop-blur-2xl border border-white/10 rounded-[32px] overflow-hidden shadow-2xl">
                    <div className="flex flex-col md:flex-row min-h-[450px]">
                        
                        {/* COLUNA DA FOTO */}
                        <div className="w-full md:w-[35%] bg-gradient-to-b from-white/5 to-black p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/10">
                            <div className="relative mb-6 group cursor-pointer">
                                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-purple-500 rounded-full blur opacity-40 group-hover:opacity-70 transition-opacity"></div>
                                <div className="relative w-32 h-32 rounded-full bg-black border border-white/20 flex items-center justify-center text-6xl overflow-hidden">
                                    👨‍💻
                                </div>
                            </div>
                            <h2 className="text-2xl font-black text-white uppercase tracking-tight">Founder</h2>
                            <p className="text-[10px] font-bold text-purple-400 tracking-[0.25em] uppercase mt-1">Fullstack & 3D</p>
                        </div>

                        {/* COLUNA DO TEXTO */}
                        <div className="w-full md:w-[65%] p-8 md:p-12 flex flex-col justify-center">
                            <h3 className="text-4xl font-black text-white mb-6">SOBRE MIM</h3>
                            
                            {/* AQUI ESTAVA O PROBLEMA: O texto agora tem cor e altura livre */}
                            <div className="prose prose-invert">
                                <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed mb-8">
                                    Fundador da <strong className="text-white font-bold">Zanvexis</strong> e Cientista da Computação. 
                                    <br/><br/>
                                    Minha missão é unir a performance extrema do <span className="text-cyan-400">Next.js</span> com a imersão visual e a inteligência de <span className="text-purple-400">Agentes de IA</span>. Crio interfaces que não são apenas ferramentas, são experiências.
                                </p>
                            </div>

                            {/* SKILLS */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {[
                                    { name: 'Next.js', icon: '⚡', color: 'group-hover:text-cyan-400', border: 'group-hover:border-cyan-500/50' },
                                    { name: 'TypeScript', icon: '📘', color: 'group-hover:text-blue-400', border: 'group-hover:border-blue-500/50' },
                                    { name: 'Rust', icon: '⚙️', color: 'group-hover:text-orange-400', border: 'group-hover:border-orange-500/50' },
                                    { name: 'Polkadot', icon: '🔗', color: 'group-hover:text-pink-400', border: 'group-hover:border-pink-500/50' },
                                    { name: 'Three.js', icon: '🧊', color: 'group-hover:text-white', border: 'group-hover:border-white/50' },
                                    { name: 'AI Agents', icon: '🤖', color: 'group-hover:text-purple-400', border: 'group-hover:border-purple-500/50' },
                                ].map((skill) => (
                                    <div key={skill.name} className={`group flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 transition-all duration-300 ${skill.border}`}>
                                        <span className="text-lg opacity-50 group-hover:opacity-100 transition-opacity">{skill.icon}</span>
                                        <span className={`text-[10px] font-bold text-gray-400 uppercase tracking-wider transition-colors ${skill.color}`}>{skill.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
             </div>
        </section>

        {/* --- CARD 3: CARROSSEL CRYPTO & BLOCKCHAIN (NOVO) --- */}
        <section className="w-full">
            {/* Cabeçalho da Seção */}
            <div className="mb-10 flex items-end justify-between px-2">
                <div>
                    <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                        Crypto <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">&</span> DApps
                    </h3>
                    <p className="text-xs text-gray-400 font-mono mt-2 tracking-[0.2em] uppercase">
                        Soluções Blockchain & Web3
                    </p>
                </div>
                {/* Indicador visual de scroll */}
                <div className="hidden md:flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest animate-pulse">
                    Deslize para ver <span>➜</span>
                </div>
            </div>

            {/* Area do Scroll Horizontal */}
            <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory px-2 -mx-2 scroll-smooth custom-scrollbar">
                
                {/* Mapeando 6 Cards de Exemplo */}
                {[
                    { title: "DEX Polkadot", tag: "Rust", color: "border-pink-500/50" },
                    { title: "NFT Marketplace", tag: "Solidity", color: "border-purple-500/50" },
                    { title: "DeFi Dashboard", tag: "Next.js", color: "border-cyan-500/50" },
                    { title: "Crypto Wallet", tag: "Mobile", color: "border-green-500/50" },
                    { title: "Token Sniper", tag: "Python", color: "border-yellow-500/50" },
                    { title: "DAO Governance", tag: "Smart Contract", color: "border-blue-500/50" }
                ].map((project, index) => (
                    <div 
                        key={index} 
                        className="snap-center shrink-0 w-[85vw] md:w-[350px] group relative rounded-2xl bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 overflow-hidden hover:border-white/30 transition-all duration-300"
                    >
                        {/* Imagem do Projeto (Placeholder Escuro) */}
                        <div className="h-48 w-full bg-black/50 relative overflow-hidden group-hover:bg-black/30 transition-colors">
                            <div className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90`}></div>
                            
                            {/* Ícone ou Imagem aqui */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-4xl opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                                    ⛓️
                                </span>
                            </div>

                            {/* Tag no topo */}
                            <div className={`absolute top-4 right-4 px-2 py-1 rounded border bg-black/80 backdrop-blur text-[10px] font-bold uppercase tracking-wider text-white ${project.color}`}>
                                {project.tag}
                            </div>
                        </div>

                        {/* Conteúdo do Card */}
                        <div className="p-6 relative">
                            <h4 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{project.title}</h4>
                            <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 mb-4">
                                Desenvolvimento de infraestrutura descentralizada com foco em segurança e escalabilidade para o ecossistema Web3.
                            </p>
                            
                            <button className="text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-2 group/btn">
                                Ver Projeto <span className="group-hover/btn:translate-x-1 transition-transform text-cyan-500">➜</span>
                            </button>
                        </div>
                    </div>
                ))}

            </div>
        </section>
        {/* --- CARD 4: BLOG / NEURAL FEED (NOVO) --- */}
        <section className="w-full">
            <div className="flex items-center justify-between mb-8 px-2">
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter">
                    Dev <span className="text-purple-500">Logs</span>
                </h3>
                <div className="h-px flex-1 bg-white/10 mx-6"></div>
                <a href="/blog" className="text-[10px] font-bold text-gray-500 hover:text-white uppercase tracking-widest transition-colors">
                    Ver Arquivo ➜
                </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Post 1 */}
                <a href="/blog/post-1" className="group relative p-6 rounded-2xl bg-[#0a0a0a]/40 border border-white/10 hover:border-purple-500/50 hover:bg-white/5 transition-all duration-300">
                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <div className="text-[10px] font-mono text-gray-500 mb-3">12 DEC 2025 • AI AGENTS</div>
                    <h4 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-purple-400 transition-colors">
                        Como Agentes Autônomos estão substituindo APIs tradicionais
                    </h4>
                    <p className="text-xs text-gray-400 font-light line-clamp-3">
                        A era da integração manual acabou. Veja como estamos usando LLMs para criar pipelines de dados auto-corretivos na Zanvexis.
                    </p>
                    <div className="mt-4 text-[10px] font-bold text-purple-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                        Ler Artigo ⚡
                    </div>
                </a>

                {/* Post 2 */}
                <a href="/blog/post-2" className="group relative p-6 rounded-2xl bg-[#0a0a0a]/40 border border-white/10 hover:border-cyan-500/50 hover:bg-white/5 transition-all duration-300">
                    <div className="text-[10px] font-mono text-gray-500 mb-3">08 DEC 2025 • RUST</div>
                    <h4 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-cyan-400 transition-colors">
                        Otimizando Smart Contracts em Rust para alta performance
                    </h4>
                    <p className="text-xs text-gray-400 font-light line-clamp-3">
                        Uma análise profunda sobre gerenciamento de memória e segurança em contratos Polkadot comparado ao Solidity.
                    </p>
                    <div className="mt-4 text-[10px] font-bold text-cyan-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                        Ler Artigo ⚡
                    </div>
                </a>

                {/* Post 3 */}
                <a href="/blog/post-3" className="group relative p-6 rounded-2xl bg-[#0a0a0a]/40 border border-white/10 hover:border-pink-500/50 hover:bg-white/5 transition-all duration-300">
                    <div className="text-[10px] font-mono text-gray-500 mb-3">01 DEC 2025 • UI/UX</div>
                    <h4 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-pink-400 transition-colors">
                        Glassmorphism & Neon: Criando interfaces imersivas
                    </h4>
                    <p className="text-xs text-gray-400 font-light line-clamp-3">
                        Tutorial de como aplicar efeitos de vidro realistas usando apenas Tailwind CSS e backdrop-filter.
                    </p>
                    <div className="mt-4 text-[10px] font-bold text-pink-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                        Ler Artigo ⚡
                    </div>
                </a>
            </div>

            {/* Botão Extra no Final */}
            <div className="mt-12 flex justify-center">
                <a href="/blog" className="px-8 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:scale-105 transition-all text-xs font-bold text-white uppercase tracking-[0.2em]">
                    Acessar Blog Completo
                </a>
            </div>
        </section>

      </div>
    </main>
  );
}
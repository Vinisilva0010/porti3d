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
        Zanvexis <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Vision</span>
    </h3>
    
    <p className="text-sm text-gray-300 leading-relaxed mb-8 font-light border-l-2 border-purple-500 pl-4">
        Operando na fronteira da inovação, a <strong className="text-white">Zanvexis</strong> não apenas desenvolve software, mas forja ativos digitais. Orquestramos enxames de <strong className="text-white">IA Autônoma</strong> e arquiteturas descentralizadas para criar sistemas que escalam enquanto você dorme.
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
        {/* Efeito de Glow (Brilho atrás) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-purple-500 rounded-full blur opacity-40 group-hover:opacity-70 transition-opacity"></div>
        
        {/* Container da Imagem (Círculo) */}
        <div className="relative w-32 h-32 rounded-full bg-black border border-white/20 flex items-center justify-center overflow-hidden">
            <img 
                src="/image/minha-foto.png"   
                alt="Vinicius - Founder" 
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity grayscale hover:grayscale-0 duration-500"
            />
        </div>
    </div>
    
    <h2 className="text-2xl font-black text-white uppercase tracking-tight">Vinicius</h2>
    <p className="text-[10px] font-bold text-purple-400 tracking-[0.25em] uppercase mt-1">Founder & Lead Dev</p>
</div>
                       {/* COLUNA DO TEXTO */}
<div className="w-full md:w-[65%] p-8 md:p-12 flex flex-col justify-center">
    <h3 className="text-4xl font-black text-white mb-6 tracking-tighter">
        SOBRE MIM
    </h3>
    
    <div className="prose prose-invert">
        <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed mb-8">
            Engenheiro de Software e Fundador da <strong className="text-white font-bold">Zanvexis</strong>. 
            <br/><br/>
            Atuo na convergência entre <span className="text-orange-400">Blockchain</span> e <span className="text-purple-400">Inteligência Artificial</span>. Minha especialidade é arquitetar ecossistemas descentralizados (dApps) e redes de Agentes Autônomos que operam com precisão cirúrgica. Transformo lógica complexa em interfaces imersivas e de alta performance.
        </p>
    </div>

    {/* SKILLS - Atualizadas para High Ticket */}
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
            { name: 'Solana / Rust', icon: '⛓️', color: 'group-hover:text-teal-400', border: 'group-hover:border-teal-500/50' },
            { name: 'AI Architecture', icon: '🧠', color: 'group-hover:text-purple-400', border: 'group-hover:border-purple-500/50' },
            { name: 'Smart Contracts', icon: '📜', color: 'group-hover:text-yellow-400', border: 'group-hover:border-yellow-500/50' },
            { name: 'Next.js Ultra', icon: '⚡', color: 'group-hover:text-cyan-400', border: 'group-hover:border-cyan-500/50' },
            { name: 'TypeScript', icon: 'Mw', color: 'group-hover:text-blue-400', border: 'group-hover:border-blue-500/50' },
            { name: 'WebGL / Three', icon: '🧊', color: 'group-hover:text-pink-400', border: 'group-hover:border-pink-500/50' },
        ].map((skill) => (
            <div key={skill.name} className={`group flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 transition-all duration-300 ${skill.border}`}>
                <span className="text-lg opacity-50 group-hover:opacity-100 transition-opacity filter drop-shadow-lg">{skill.icon}</span>
                <span className={`text-[10px] font-bold text-gray-400 uppercase tracking-wider transition-colors ${skill.color}`}>{skill.name}</span>
            </div>
        ))}
    </div>
</div>

                    </div>
                </div>
             </div>
        </section>

        {/* --- CARD 3: CARROSSEL CRYPTO & BLOCKCHAIN (UPDATED) --- */}
<section className="w-full">
    {/* Cabeçalho da Seção */}
    <div className="mb-10 flex items-end justify-between px-2">
        <div>
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                Crypto <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">&</span> DApps
            </h3>
            <p className="text-xs text-gray-400 font-mono mt-2 tracking-[0.2em] uppercase">
                Arquitetura de Alta Frequência & Web3
            </p>
        </div>
        {/* Indicador visual de scroll */}
        <div className="hidden md:flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest animate-pulse">
            Deslize para ver <span>➜</span>
        </div>
    </div>

    {/* Area do Scroll Horizontal */}
    <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory px-2 -mx-2 scroll-smooth custom-scrollbar">
        
        {/* DATA DOS PROJETOS - MIX DE SOLANA, AI E DEFI */}
        {[
            { 
                title: "Solana Sniper Bot", 
                tag: "RUST / RPC", 
                desc: "Algoritmo de alta frequência que monitora mempool para execução de ordens em milissegundos. Conexão direta via Websockets.",
                color: "border-teal-500/50",
                icon: "⚡"
            },
            { 
                title: "AI Hedge Fund Agent", 
                tag: "LLM / PYTHON", 
                desc: "Agente autônomo que analisa sentimento de mercado em tempo real e sugere rebalanceamento de portfólio DeFi automático.",
                color: "border-purple-500/50",
                icon: "🤖"
            },
            { 
                title: "NFT Marketplace Pro", 
                tag: "NEXT.JS / ETH", 
                desc: "Plataforma de troca de ativos digitais com indexação off-chain para performance instantânea e UI imersiva.",
                color: "border-pink-500/50",
                icon: "💎"
            },
            { 
                title: "Smart Contract Audit", 
                tag: "SECURITY", 
                desc: "Ferramenta de análise estática para identificar vulnerabilidades em contratos inteligentes antes do deploy na Mainnet.",
                color: "border-yellow-500/50",
                icon: "🛡️"
            },
            { 
                title: "Tokenization RWA", 
                tag: "SOLIDITY", 
                desc: "Protocolo para fracionamento de ativos do mundo real (Imóveis/Carros) transformando-os em tokens líquidos na Blockchain.",
                color: "border-blue-500/50",
                icon: "🏢"
            },
            { 
                title: "DAO Governance UI", 
                tag: "WEB3 / REACT", 
                desc: "Interface de votação descentralizada com integração de identidade digital (DID) e execução transparente on-chain.",
                color: "border-gray-500/50",
                icon: "⚖️"
            }
        ].map((project, index) => (
            <div 
                key={index} 
                className="snap-center shrink-0 w-[85vw] md:w-[350px] group relative rounded-2xl bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 overflow-hidden hover:border-white/30 transition-all duration-300"
            >
                {/* Imagem do Projeto (Placeholder Escuro com Ícone) */}
                <div className="h-48 w-full bg-black/50 relative overflow-hidden group-hover:bg-black/30 transition-colors">
                    <div className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90`}></div>
                    
                    {/* Ícone Central Gigante */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-5xl opacity-20 group-hover:opacity-100 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                            {project.icon}
                        </span>
                    </div>

                    {/* Tag no topo */}
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded border bg-black/90 backdrop-blur text-[10px] font-black uppercase tracking-wider text-white ${project.color}`}>
                        {project.tag}
                    </div>
                </div>

                {/* Conteúdo do Card */}
                <div className="p-6 relative">
                    <h4 className="text-xl font-black text-white mb-3 group-hover:text-cyan-400 transition-colors uppercase tracking-tight">
                        {project.title}
                    </h4>
                    
                    {/* DESCRIÇÃO DINÂMICA AQUI */}
                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-3 mb-6 font-light border-l border-white/10 pl-3">
                        {project.desc}
                    </p>
                    
                    <button className="text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-2 group/btn hover:text-cyan-400 transition-colors">
                        Detalhes Técnicos <span className="group-hover/btn:translate-x-1 transition-transform">➜</span>
                    </button>
                </div>
            </div>
        ))}

    </div>
</section>

{/* --- CARD 4: CARROSSEL AI & PREMIUM APPS (NOVO) --- */}
<section className="w-full mt-20"> {/* Adicionei mt-20 para dar espaço entre os carrosséis */}
    
    {/* Cabeçalho da Seção */}
    <div className="mb-10 flex items-end justify-between px-2">
        <div>
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                Super Apps <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">&</span> Intelligence
            </h3>
            <p className="text-xs text-gray-400 font-mono mt-2 tracking-[0.2em] uppercase">
                Machine Learning & Interfaces Imersivas
            </p>
        </div>
        {/* Indicador visual de scroll */}
        <div className="hidden md:flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest animate-pulse">
            Deslize para ver <span>➜</span>
        </div>
    </div>

    {/* Area do Scroll Horizontal */}
    <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory px-2 -mx-2 scroll-smooth custom-scrollbar">
        
        {/* DATA DOS PROJETOS - IA, SAAS E 3D */}
        {[
            { 
                title: "Computer Vision AI", 
                tag: "PYTHON / OPENCV", 
                desc: "Sistema de monitoramento industrial que utiliza redes neurais para detecção de falhas e análise de segurança em tempo real.",
                color: "border-red-500/50",
                icon: "👁️"
            },
            { 
                title: "Enterprise Super App", 
                tag: "MICRO-FRONTENDS", 
                desc: "Plataforma corporativa unificada integrando RH, Financeiro e CRM. Arquitetura escalável para milhares de usuários simultâneos.",
                color: "border-blue-500/50",
                icon: "🏢"
            },
            { 
                title: "Immersive 3D Commerce", 
                tag: "THREE.JS / WEBGL", 
                desc: "Experiência de compra gamificada com visualização de produtos em 3D interativo diretamente no navegador, sem plugins.",
                color: "border-orange-500/50",
                icon: "🧊"
            },
            { 
                title: "Predictive Dashboard", 
                tag: "DATA SCIENCE", 
                desc: "Painel executivo que não apenas mostra dados passados, mas utiliza IA para projetar tendências futuras de faturamento e risco.",
                color: "border-cyan-500/50",
                icon: "📊"
            },
            { 
                title: "Gamified LMS Core", 
                tag: "NEXT.JS / NODE", 
                desc: "Plataforma de ensino (E-learning) com mecânicas de jogos (XP, Rankings) e personalização de trilha de ensino via IA.",
                color: "border-green-500/50",
                icon: "🎓"
            },
            { 
                title: "Generative Marketing", 
                tag: "STABLE DIFFUSION", 
                desc: "Automação que cria ativos de marketing (imagens e copy) sob demanda para campanhas, reduzindo o custo de criação em 90%.",
                color: "border-purple-500/50",
                icon: "🎨"
            }
        ].map((project, index) => (
            <div 
                key={index} 
                className="snap-center shrink-0 w-[85vw] md:w-[350px] group relative rounded-2xl bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 overflow-hidden hover:border-white/30 transition-all duration-300"
            >
                {/* Imagem do Projeto (Placeholder Escuro com Ícone) */}
                <div className="h-48 w-full bg-black/50 relative overflow-hidden group-hover:bg-black/30 transition-colors">
                    <div className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90`}></div>
                    
                    {/* Ícone Central Gigante */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-5xl opacity-20 group-hover:opacity-100 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                            {project.icon}
                        </span>
                    </div>

                    {/* Tag no topo */}
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded border bg-black/90 backdrop-blur text-[10px] font-black uppercase tracking-wider text-white ${project.color}`}>
                        {project.tag}
                    </div>
                </div>

                {/* Conteúdo do Card */}
                <div className="p-6 relative">
                    <h4 className="text-xl font-black text-white mb-3 group-hover:text-pink-400 transition-colors uppercase tracking-tight">
                        {project.title}
                    </h4>
                    
                    {/* DESCRIÇÃO DINÂMICA AQUI */}
                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-3 mb-6 font-light border-l border-white/10 pl-3">
                        {project.desc}
                    </p>
                    
                    <button className="text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-2 group/btn hover:text-pink-400 transition-colors">
                        Ver Case <span className="group-hover/btn:translate-x-1 transition-transform">➜</span>
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
    
    {/* Post 1 - Foco em DINHEIRO/SOLANA (Mostra que você gera lucro) */}
    <a href="/blog/solana-bot" className="group relative p-6 rounded-2xl bg-[#0a0a0a]/40 border border-white/10 hover:border-green-500/50 hover:bg-white/5 transition-all duration-300">
        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        <div className="text-[10px] font-mono text-gray-500 mb-3 tracking-widest">18 jan 2025 • SOLANA</div>
        <h4 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-green-400 transition-colors">
            Arbitragem Neural: Criando um Bot de Trading que roda na Edge
        </h4>
        <p className="text-xs text-gray-400 font-light line-clamp-3 leading-relaxed">
            Case study de como utilizei Rust e RPC Nodes privados para bater bots concorrentes e executar transações em milissegundos na Blockchain.
        </p>
        <div className="mt-4 text-[10px] font-bold text-green-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
            Ler Case Study ⚡
        </div>
    </a>

    {/* Post 2 - Foco em ARQUITETURA DE IA (Mostra que você pensa grande) */}
    <a href="/blog/ai-agents" className="group relative p-6 rounded-2xl bg-[#0a0a0a]/40 border border-white/10 hover:border-purple-500/50 hover:bg-white/5 transition-all duration-300">
        <div className="text-[10px] font-mono text-gray-500 mb-3 tracking-widest">15 jun 2025 • AI AGENTS</div>
        <h4 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-purple-400 transition-colors">
            O Fim das APIs: Orquestrando Enxames de LLMs Autônomos
        </h4>
        <p className="text-xs text-gray-400 font-light line-clamp-3 leading-relaxed">
            Como a Zanvexis substituiu 40% do backend tradicional por Agentes de IA que se auto-corrigem e gerenciam bancos de dados sozinhos.
        </p>
        <div className="mt-4 text-[10px] font-bold text-purple-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
            Ler Artigo 🧠
        </div>
    </a>

    {/* Post 3 - Foco em PERFORMANCE VISUAL (Mostra que você manja de UI/UX High-end) */}
    <a href="/blog/webgl-performance" className="group relative p-6 rounded-2xl bg-[#0a0a0a]/40 border border-white/10 hover:border-cyan-500/50 hover:bg-white/5 transition-all duration-300">
        <div className="text-[10px] font-mono text-gray-500 mb-3 tracking-widest">10 nov 2025 • PERFORMANCE</div>
        <h4 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-cyan-400 transition-colors">
            60 FPS no Browser: Renderizando 100k Partículas com WebGL
        </h4>
        <p className="text-xs text-gray-400 font-light line-clamp-3 leading-relaxed">
            Técnicas avançadas de otimização no Next.js para criar dashboards financeiros 3D que rodam lisos até em celulares modestos.
        </p>
        <div className="mt-4 text-[10px] font-bold text-cyan-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
            Ver Tutorial 🧊
        </div>
    </a>
</div>

{/* Botão Extra no Final */}
<div className="mt-16 flex justify-center">
    <a href="/blog" className="px-8 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-purple-500/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-all text-xs font-bold text-white uppercase tracking-[0.2em] group">
        Explorar todo o conhecimento <span className="group-hover:ml-2 transition-all">➜</span>
    </a>
</div>
        </section>

      </div>
    </main>
  );
}
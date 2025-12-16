'use client';

import { useState } from 'react';
import Link from 'next/link';
// Importamos os dados do arquivo centralizado
import { blogPosts } from './data';

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  // Lógica de Filtro usando os dados importados (blogPosts)
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || post.category.includes(selectedCategory);
    
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-black text-white selection:bg-purple-500/30 selection:text-white pb-20">
      
      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-900/10 blur-[120px] rounded-full"></div>
        <div className="absolute top-[20%] right-0 w-[400px] h-[400px] bg-cyan-900/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-10">
        
        {/* HEADER & NAV */}
        <div className="flex items-center justify-between mb-20">
            <Link href="/" className="group flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white uppercase tracking-widest transition-colors">
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Voltar para HQ
            </Link>
            <div className="text-[10px] font-mono text-purple-500 animate-pulse">
                SYSTEM: ONLINE
            </div>
        </div>

        {/* HERO SECTION DO BLOG */}
        <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                NEURAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">ARCHIVE</span>
            </h1>
            <p className="text-sm text-gray-400 font-mono tracking-widest uppercase">
                Pensamentos, Códigos & Transmissões da Zanvexis
            </p>
        </div>

        {/* BARRA DE FILTRO & BUSCA */}
        <div className="sticky top-4 z-50 mb-12 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-2xl">
            
            {/* Categorias */}
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 custom-scrollbar">
                {['ALL', 'AI AGENTS', 'CRYPTO', 'DESIGN', '3D WEB'].map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all whitespace-nowrap border ${
                            selectedCategory === cat 
                            ? 'bg-purple-600 border-purple-500 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)]' 
                            : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Input de Busca */}
            <div className="relative w-full md:w-64">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>
                <input 
                    type="text" 
                    placeholder="Buscar no arquivo..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                />
            </div>
        </div>

        {/* GRID DE POSTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
                // O Link agora usa o ID real do arquivo data.ts (ex: /blog/agentes-autonomos)
                <Link key={post.id} href={`/blog/${post.id}`} className="group">
                    <article className="h-full flex flex-col justify-between p-6 rounded-2xl bg-[#0a0a0a]/40 border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all duration-300 relative overflow-hidden">
                        
                        {/* Glow de fundo no hover dinâmico baseado na cor do post */}
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-${post.color}-500 blur-xl`}></div>

                        <div>
                            {/* Header do Card */}
                            <div className="flex justify-between items-start mb-4">
                                <span className={`text-[9px] font-bold px-2 py-1 rounded bg-white/5 border border-white/10 text-${post.color}-400 uppercase tracking-wider`}>
                                    {post.category}
                                </span>
                                <span className="text-[10px] text-gray-600 font-mono">
                                    {post.readTime}
                                </span>
                            </div>

                            {/* Título */}
                            <h2 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                                {post.title}
                            </h2>

                            {/* Resumo */}
                            <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                                {post.excerpt}
                            </p>
                        </div>

                        {/* Footer do Card */}
                        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                            <span className="text-[10px] font-mono text-gray-600">{post.date}</span>
                            <span className="text-[10px] font-bold text-white opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 flex items-center gap-1">
                                LER <span className={`text-${post.color}-400`}>➜</span>
                            </span>
                        </div>
                    </article>
                </Link>
            ))}
        </div>

        {/* EMPTY STATE (Se a busca não achar nada) */}
        {filteredPosts.length === 0 && (
            <div className="w-full py-20 text-center border border-dashed border-white/10 rounded-2xl">
                <div className="text-4xl mb-4">👾</div>
                <h3 className="text-lg font-bold text-white mb-2">Dados não encontrados</h3>
                <p className="text-xs text-gray-500">Nenhum registro compatível com sua busca no sistema.</p>
                <button 
                    onClick={() => {setSearchTerm(''); setSelectedCategory('ALL')}}
                    className="mt-4 text-xs font-bold text-purple-500 hover:text-purple-400 uppercase tracking-widest"
                >
                    Limpar Filtros
                </button>
            </div>
        )}

      </div>
    </main>
  );
}
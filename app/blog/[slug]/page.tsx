'use client'
import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, Share2, Tag } from 'lucide-react';

// IMPORTANDO SEU NOVO BANCO DE DADOS CENTRALIZADO
// Ajuste o caminho '../content' dependendo de onde você salvou o arquivo
import { allContent } from '../../content'; 

export default function UniversalPage() {
  const params = useParams();
  const rawSlug = params?.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;

  // Busca os dados no arquivo content.ts
  const data = slug ? allContent[slug] : null;

  // Se não achar, mostra erro 404 Estiloso
  if (!data) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-6 text-center">
        <h1 className="text-6xl font-black text-purple-600 mb-4">404</h1>
        <p className="text-xl text-gray-400 mb-8">Conteúdo não encontrado na base de dados.</p>
        <div className="bg-white/5 p-4 rounded text-left font-mono text-xs text-gray-500 border border-white/10 mb-8">
            Debug Info: Procurando por slug "{slug}"
        </div>
        <Link href="/" className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest rounded hover:bg-gray-200 transition-colors">
            Voltar ao Início
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-purple-500/30">
      
      {/* Navbar Fixa */}
      <div className="fixed top-0 left-0 w-full z-50 px-6 py-6 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none">
        <Link href="/" className="pointer-events-auto inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
          <ArrowLeft size={14} /> Voltar
        </Link>
      </div>

      <article className="max-w-4xl mx-auto pt-32 pb-20 px-6">
        
        {/* HEADER */}
        <header className="mb-12 border-b border-white/10 pb-12">
            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-purple-400 mb-6">
                <span className="bg-purple-500/10 px-3 py-1 rounded border border-purple-500/20">{data.category}</span>
                <span className="flex items-center gap-1 text-gray-500"><Calendar size={12} /> {data.date}</span>
                <span className="flex items-center gap-1 text-gray-500"><Clock size={12} /> {data.readTime}</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-8 tracking-tighter">
                {data.title}
            </h1>

            <div className="flex flex-wrap gap-2">
                {data.tags?.map((tag: string) => (
                    <span key={tag} className="flex items-center gap-1 text-xs text-gray-400 bg-white/5 px-3 py-1 rounded-full border border-white/5 transition-colors hover:border-purple-500/50">
                        <Tag size={10} /> {tag}
                    </span>
                ))}
            </div>
        </header>

        {/* CONTEÚDO (HTML RENDERIZADO) 
            Isso permite que você use <h3>, <p>, <ul> e até classes do Tailwind dentro do content.ts
        */}
        <div 
            className="prose prose-invert prose-lg max-w-none 
            prose-headings:text-white prose-p:text-gray-400 prose-li:text-gray-400 
            prose-a:text-purple-400 prose-strong:text-white prose-code:text-purple-300
            prose-pre:bg-[#0a0a0a] prose-pre:border prose-pre:border-white/10"
            dangerouslySetInnerHTML={{ __html: data.content }}
        />

        {/* CTA FINAL - VENDER O PROJETO */}
        <div className="mt-20 pt-10 border-t border-white/10 bg-white/5 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Gostou dessa arquitetura?</h3>
            <p className="text-sm text-gray-400 mb-6">Posso implementar uma solução similar para sua empresa.</p>
            <a href="https://wa.me/SEUNUMERO" target="_blank" className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold uppercase tracking-widest rounded-lg transition-all transform hover:scale-105">
                Solicitar Orçamento <Share2 size={16} />
            </a>
        </div>

      </article>
    </main>
  );
}
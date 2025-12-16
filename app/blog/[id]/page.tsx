import Link from 'next/link';
import { blogPosts } from '../data'; // Importa nosso banco de dados
import { notFound } from 'next/navigation';

// Isso diz pro Next.js quais páginas existem pra gerar estático
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id,
  }));
}

// ATENÇÃO: Adicionei 'async' e mudei o tipo do params para Promise
export default async function BlogPost({ params }: { params: Promise<{ id: string }> }) {
  
  // NOVA FORMA DO NEXT.JS 15+: Primeiro a gente espera (await) o parametro carregar
  const { id } = await params;

  // Agora buscamos usando o ID já carregado
  const post = blogPosts.find((p) => p.id === id);

  // Se não achar (link errado), manda pra página 404
  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-gray-300 selection:bg-purple-500/30 selection:text-white pb-20">
      
      {/* Barra de Progresso de Leitura (Fixo no topo) */}
      <div className={`fixed top-0 left-0 h-1 bg-${post.color}-500 w-full z-50 opacity-50`}></div>

      {/* HEADER DO ARTIGO */}
      <header className="relative w-full pt-32 pb-20 px-4 overflow-hidden border-b border-white/10 bg-[#050505]">
          {/* Efeitos de Fundo */}
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-${post.color}-600/10 blur-[100px] rounded-full pointer-events-none`}></div>

          <div className="max-w-3xl mx-auto relative z-10 text-center">
              <Link href="/blog" className="inline-flex items-center gap-2 text-[10px] font-bold text-gray-500 hover:text-white uppercase tracking-widest mb-8 transition-colors">
                  ← Voltar ao Arquivo
              </Link>
              
              <div className="flex justify-center gap-4 mb-6">
                  <span className={`px-3 py-1 rounded border border-${post.color}-500/30 bg-${post.color}-500/10 text-${post.color}-400 text-[10px] font-bold uppercase tracking-wider`}>
                      {post.category}
                  </span>
                  <span className="px-3 py-1 rounded border border-white/10 bg-white/5 text-gray-400 text-[10px] font-mono uppercase tracking-wider">
                      {post.date}
                  </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-8">
                  {post.title}
              </h1>

              <div className="flex items-center justify-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-500 p-[1px]">
                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-lg">👨‍💻</div>
                   </div>
                   <div className="text-left">
                        <div className="text-xs font-bold text-white">Zanvexis Founder</div>
                        <div className="text-[10px] text-gray-500">@zanvexis • {post.readTime}</div>
                   </div>
              </div>
          </div>
      </header>

      {/* CONTEÚDO DO ARTIGO */}
      <article className="max-w-3xl mx-auto px-6 py-12">
          {/* Aqui injetamos o HTML que você escreveu no data.ts */}
          <div 
            className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-purple-400 hover:prose-a:text-purple-300 prose-strong:text-white"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
      </article>

      {/* FOOTER DO POST */}
      <div className="max-w-3xl mx-auto px-6 mt-10 pt-10 border-t border-white/10 flex justify-between items-center">
          <div className="text-xs text-gray-500">
              Gostou? Compartilhe essa transmissão.
          </div>
          <Link href="/blog" className="text-xs font-bold text-white hover:text-purple-400 uppercase tracking-widest transition-colors">
              Ler Próximo Artigo ➜
          </Link>
      </div>

    </main>
  );
}
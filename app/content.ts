// app/content.ts

export const allContent: any = {
  // ==============================================
  // PROJETO 1: SOLANA SNIPER (O carro-chefe)
  // ==============================================
  'solana-sniper': {
    title: "Solana Sniper: Arbitragem de Alta Frequência (HFT) em Rust",
    category: "PROJECT • BLOCKCHAIN",
    date: "CASE STUDY",
    readTime: "Tech Spec",
    tags: ["Rust", "Jito Bundles", "RPC Websockets", "Smart Contract"],
    content: `
      <div class="space-y-8">
        
        <section>
          <h3 class="text-2xl font-bold text-white mb-4">O Desafio de Negócio</h3>
          <p class="text-gray-400 leading-relaxed">
            Em Blockchains de alta performance como a Solana (400ms por bloco), a latência de rede é o maior adversário. 
            O cliente precisava de um sistema capaz de detectar a injeção de liquidez em novos Pools (Raydium/Orca) e executar a compra na 
            <strong>mesma transação</strong> (Atomic Transaction), evitando rug-pulls e garantindo a entrada no "Block 0".
          </p>
        </section>

        <section class="border-l-4 border-teal-500 pl-6 my-8 bg-teal-900/10 py-4 pr-4">
          <h4 class="text-teal-400 font-bold uppercase tracking-widest text-xs mb-2">Resultado Final</h4>
          <p class="text-white font-mono text-lg">
            ⚡ Latência Reduzida: <span class="text-teal-400">24ms</span> (vs 150ms em Node.js)<br>
            💸 Taxa de Sucesso: <span class="text-teal-400">99.2%</span> usando Jito Bundles
          </p>
        </section>

        <section>
          <h3 class="text-2xl font-bold text-white mb-4">Arquitetura da Solução</h3>
          <p class="text-gray-400 leading-relaxed mb-6">
            Abandonamos a arquitetura tradicional de polling (perguntar a cada X segundos) e implementamos uma conexão 
            <strong>WebSocket direta (WSS)</strong> com nós RPC privados. O código foi inteiramente escrito em <strong>Rust</strong> 
            para aproveitar o gerenciamento de memória sem Garbage Collector.
          </p>
          
          <div class="bg-[#111] border border-white/10 rounded-lg p-4 overflow-x-auto">
            <div class="text-xs text-gray-500 mb-2 font-mono">/src/engine/listener.rs</div>
            <pre class="text-sm font-mono text-gray-300"><code>
// Exemplo da lógica de listener assíncrono (Zero-Copy)
pub async fn monitor_logs(client: &RpcClient) -> Result<()> {
    let filter = RpcTransactionLogsFilter::Mentions(vec![RAYDIUM_PROGRAM_ID]);
    let config = RpcTransactionLogsConfig { commitment: CommitmentConfig::processed() };
    
    let (mut stream, _) = client.logs_subscribe(filter, config).await?;

    while let Some(log) = stream.next().await {
        if let Some(pool_id) = parse_liquidity_event(&log) {
            // Executa a compra em < 2ms de processamento interno
            tokio::spawn(async move {
                execute_jito_bundle(pool_id).await;
            });
        }
    }
    Ok(())
}
            </code></pre>
          </div>
        </section>

        <section>
          <h3 class="text-2xl font-bold text-white mb-4">Infraestrutura & Jito</h3>
          <p class="text-gray-400 leading-relaxed">
            Utilizamos o <strong>Jito Block Engine</strong> para enviar "Bundles". Isso significa que nossa transação de compra e a "gorjeta" (bribe) 
            para o validador são enviadas juntas. Se a compra falhar, a gorjeta não é paga. Isso protegeu o capital do cliente contra transações falhas que apenas gastam Gas.
          </p>
        </section>
      </div>
    `
  },

  // ==============================================
  // PROJETO 2: AI HEDGE FUND (Agentes Autônomos)
  // ==============================================
  'ai-hedge-fund': {
    title: "AI Hedge Fund: Orquestração de Agentes Financeiros",
    category: "PROJECT • AI AGENTS",
    date: "CASE STUDY",
    readTime: "Architecture",
    tags: ["Python", "LangChain", "OpenAI", "Pinecone"],
    content: `
      <div class="space-y-8">
        <section>
          <h3 class="text-2xl font-bold text-white mb-4">Visão Geral</h3>
          <p class="text-gray-400 leading-relaxed">
            A Zanvexis foi contratada para criar um "Analista Financeiro Autônomo". O objetivo não era apenas gerar texto, 
            mas tomar decisões de rebalanceamento de carteira baseadas em dados em tempo real (Notícias + Preço On-chain).
          </p>
        </section>

        <section>
          <h3 class="text-2xl font-bold text-white mb-4">O Conceito de "Swarm" (Enxame)</h3>
          <p class="text-gray-400 leading-relaxed mb-6">
            Um único LLM (como o GPT-4) alucina quando sobrecarregado. Nossa solução dividiu a inteligência em 3 agentes especializados que "conversam" entre si:
          </p>
          <ul class="list-disc list-inside space-y-2 text-gray-400 ml-4 mb-6">
            <li><strong class="text-purple-400">Agente Pesquisador:</strong> Varre Twitter e NewsAPI buscando sentimento de mercado.</li>
            <li><strong class="text-purple-400">Agente Quant:</strong> Analisa gráficos técnicos (RSI, MACD) via API da Binance.</li>
            <li><strong class="text-purple-400">Agente Executor:</strong> Recebe os relatórios dos dois acima e decide: "Comprar" ou "Vender".</li>
          </ul>
        </section>

        <section>
          <h3 class="text-2xl font-bold text-white mb-4">Memória Vetorial (RAG)</h3>
          <p class="text-gray-400 leading-relaxed">
            Para que o Agente "lembrasse" de estratégias passadas, implementamos um banco de dados vetorial (Pinecone). 
            Cada decisão de sucesso é armazenada como um vetor, permitindo que a IA consulte "O que fizemos na última queda do Bitcoin?" antes de agir.
          </p>
        </section>
      </div>
    `
  },

  // ==============================================
  // BLOG POST 1: ARBITRAGEM NEURAL (Conteúdo Educativo)
  // ==============================================
  'solana-bot': {
    title: "Arbitragem Neural: Otimizando Bots na Edge",
    category: "BLOG • TUTORIAL",
    date: "18 DEC 2025",
    readTime: "8 min read",
    tags: ["Rust", "Performance", "Edge Computing"],
    content: `
      <div class="space-y-6">
        <p class="text-xl text-gray-300 font-light italic border-l-2 border-purple-500 pl-4">
          "Na guerra dos bots de arbitragem, o vencedor não é o mais inteligente, é o que está fisicamente mais perto do servidor."
        </p>
        
        <p class="text-gray-400 leading-relaxed">
          Você já se perguntou por que seu bot em Python perde todas as oportunidades de snipe? A resposta está na Latência de Event Loop.
          Neste artigo, vou explicar como migrei a infraestrutura da Zanvexis para Rust e consegui reduzir o tempo de execução em 400%.
        </p>

        <h3 class="text-2xl font-bold text-white mt-8">Por que Node.js não serve para HFT?</h3>
        <p class="text-gray-400 leading-relaxed">
          O JavaScript é single-threaded. Quando o Garbage Collector entra em ação para limpar a memória, ele "pausa" seu código por alguns milissegundos.
          Em HFT (High Frequency Trading), 10ms é uma eternidade. Rust não tem Garbage Collector; você gerencia a memória manualmente, garantindo consistência.
        </p>
      </div>
    `
  },

  // ADICIONE AQUI SEUS OUTROS POSTS (AI, WEBGL, ETC) SEGUINDO O MESMO PADRÃO...
};
// Esse é o seu "Banco de Dados".
// Para adicionar um post novo, copie um bloco {}, cole embaixo e mude os textos.

export const blogPosts = [
    {
      id: "agentes-autonomos", // O link vai ficar /blog/agentes-autonomos
      title: "Agentes Autônomos vs. APIs Tradicionais",
      excerpt: "A era da integração manual acabou. Veja como estamos usando LLMs para criar pipelines de dados auto-corretivos na Zanvexis.",
      date: "12 DEC 2025",
      category: "AI AGENTS",
      color: "purple", // Opções: purple, cyan, pink, orange, green, blue
      readTime: "5 min read",
      // AQUI VAI O TEXTO COMPLETO DO ARTIGO (Pode usar HTML básico)
      content: `
        <p>A integração de sistemas sempre foi um pesadelo. Documentações desatualizadas, endpoints que mudam sem aviso e autenticações complexas.</p>
        <br>
        <h3 class="text-2xl font-bold text-white mb-4">O Problema das APIs</h3>
        <p>Tradicionalmente, conectamos o Sistema A ao Sistema B hardcodando regras. Se o Sistema B muda, tudo quebra. É frágil.</p>
        <br>
        <h3 class="text-2xl font-bold text-white mb-4">A Solução Zanvexis</h3>
        <p>Nossos Agentes de IA não seguem um script rígido. Eles "leem" a resposta do erro, entendem o que mudou na API e corrigem a requisição em tempo real.</p>
      `
    },
    {
      id: "rust-smart-contracts",
      title: "Rust em Produção: Otimizando Smart Contracts",
      excerpt: "Uma análise profunda sobre gerenciamento de memória e segurança em contratos Polkadot comparado ao Solidity.",
      date: "08 DEC 2025",
      category: "RUST / CRYPTO",
      color: "orange",
      readTime: "8 min read",
      content: `
        <p>Rust tem se tornado a linguagem favorita para infraestrutura crítica na Web3. Sua segurança de memória sem Garbage Collector o torna perfeito para ambientes onde cada ciclo de CPU custa dinheiro (gas).</p>
      `
    },
    // ... ADICIONE OUTROS POSTS AQUI ...
  ];
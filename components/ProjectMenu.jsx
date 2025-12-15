import React from 'react';
import { projects } from './projectsData';

export default function ProjectMenu({ setHoveredProject }) {
  // Estilo base para garantir que o texto seja branco e legível
  const cardStyle = {
    background: 'rgba(10, 10, 10, 0.9)', // Fundo quase preto sólido
    border: '1px solid #00ffff',          // Borda Ciano Neon
    boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)', // Brilho
    color: 'white',
    textDecoration: 'none', // Remove o sublinhado feio
  };

  return (
    <div
      id="project-menu"
      className="p-8 rounded-xl select-none"
      style={{
        width: '500px',
        background: 'rgba(0, 0, 0, 0.85)', // Fundo escuro forte
        backdropFilter: 'blur(10px)',
        borderLeft: '6px solid #a855f7', // Borda Roxa grossa na esquerda
        fontFamily: 'sans-serif',
      }}
    >
      {/* Título */}
      <h2 
        className="text-5xl font-black mb-8 pb-4" 
        style={{ color: '#ffffff', borderBottom: '1px solid #333' }}
      >
        <span style={{ color: '#a855f7', marginRight: '10px' }}>///</span>
        PROJETOS
      </h2>

      <div className="flex flex-col gap-4">
        {projects.map((project) => (
          <a
            key={project.id}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            // AQUI É A MÁGICA: style direto para matar o azul
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '20px',
              background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              textDecoration: 'none', // Tira o sublinhado
              color: 'white',         // Tira o azul
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            // Eventos de hover via JS simples ou classes tailwind auxiliares
            className="hover:bg-white/10 hover:border-cyan-400 hover:scale-[1.02] transition-all"
            onMouseEnter={(e) => {
              setHoveredProject(project.image);
              e.currentTarget.style.borderColor = '#00ffff'; // Borda ciano no hover
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            }}
            onMouseLeave={(e) => {
              setHoveredProject(null);
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; // Volta ao normal
              e.currentTarget.style.background = 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)';
            }}
          >
            <div>
              <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: '#ffffff' }}>
                {project.title}
              </h3>
              <p style={{ margin: '5px 0 0 0', fontSize: '0.8rem', color: '#aaaaaa', textTransform: 'uppercase' }}>
                {project.subtitle}
              </p>
            </div>
            
            <span style={{ fontSize: '1.5rem', color: '#00ffff' }}>→</span>
          </a>
        ))}
      </div>
    </div>
  );
}
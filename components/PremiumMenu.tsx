import React from 'react';

// --- CORREÇÃO DO TYPESCRIPT ---
// Definimos que setHoveredProject é uma função que aceita string ou null
interface PremiumMenuProps {
  setHoveredProject: (image: string | null) => void;
}

const premiumProjects = [
  { 
    id: 'p1', 
    title: 'SAAS Enterprise', 
    subtitle: 'High Ticket System', 
    image: '/projects/saas-plataform.jpg', 
    link: 'https://seulink.com' 
  },
  { 
    id: 'p2', 
    title: 'Fintech Dashboard', 
    subtitle: 'Banking System', 
    image: '/projects/fintech.jpg', 
    link: 'https://seulink.com' 
  },
  { 
    id: 'p3', 
    title: 'AI Automation', 
    subtitle: 'Python & LLMs', 
    image: '/projects/ai-bot.jpg', 
    link: 'https://seulink.com' 
  },
];

// Aplicamos o tipo aqui (: PremiumMenuProps)
export default function PremiumMenu({ setHoveredProject }: PremiumMenuProps) {
  return (
    <div
      id="premium-menu"
      className="select-none"
      style={{
        width: '500px',
        background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)',
        borderRadius: '16px',
        border: '2px solid #FFD700',
        boxShadow: '0 0 40px rgba(255, 215, 0, 0.25)', 
        padding: '30px',
        fontFamily: 'sans-serif',
      }}
    >
      {/* Cabeçalho Premium */}
      <div style={{ 
          borderBottom: '1px solid rgba(255, 215, 0, 0.3)', 
          paddingBottom: '15px', 
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
      }}>
        <h2 style={{ 
            margin: 0, 
            fontSize: '2.5rem', 
            fontWeight: '900', 
            color: '#FFD700', 
            textTransform: 'uppercase',
            letterSpacing: '2px',
            textShadow: '0 0 10px rgba(255, 215, 0, 0.5)'
        }}>
          PREMIUM
        </h2>
        <span style={{ fontSize: '2rem' }}>💎</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {premiumProjects.map((project) => (
          <a
            key={project.id}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '20px',
              background: 'rgba(255, 215, 0, 0.05)', 
              border: '1px solid rgba(255, 215, 0, 0.2)',
              borderRadius: '8px',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              setHoveredProject(project.image);
              e.currentTarget.style.background = 'rgba(255, 215, 0, 0.2)'; 
              e.currentTarget.style.transform = 'scale(1.03) translateX(10px)'; 
              e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.4)';
            }}
            onMouseLeave={(e) => {
              setHoveredProject(null);
              e.currentTarget.style.background = 'rgba(255, 215, 0, 0.05)';
              e.currentTarget.style.transform = 'scale(1) translateX(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div>
              <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 'bold', color: '#fff' }}>
                {project.title}
              </h3>
              <p style={{ margin: '5px 0 0 0', fontSize: '0.8rem', color: '#FFD700', fontWeight: 'bold' }}>
                ⭐ {project.subtitle}
              </p>
            </div>
            <span style={{ fontSize: '1.5rem', color: '#FFD700' }}>➜</span>
          </a>
        ))}
      </div>
    </div>
  );
}
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from 'next/script'; // Mantido para o Iconify

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zanvexis | Founder Portfolio", // Atualizei para ficar mais profissional
  description: "Workspace 3D & AI Agents",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" className="dark">
      <body className={`${inter.className} bg-black text-white antialiased selection:bg-purple-500 selection:text-white`}>
        
        {children}

        {/* Mantendo seu script do Iconify para não quebrar nada */}
        <Script 
          src="https://code.iconify.design/3/3.1.0/iconify.min.js" 
          strategy="beforeInteractive" 
        />
      </body>
    </html>
  );
}
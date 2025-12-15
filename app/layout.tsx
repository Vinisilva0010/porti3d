import "./globals.css"; // <--- ESSA LINHA É OBRIGATÓRIA

export const metadata = {
  title: "Zanvexis 3D",
  description: "Workspace 3D",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}

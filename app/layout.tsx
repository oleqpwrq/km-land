import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KMLeads — Лидогенерация из Telegram-чатов",
  description: "Инструмент для поиска и привлечения клиентов из Telegram в реальном времени.",
  icons: { icon: "/favicon.ico", shortcut: "/favicon.ico", apple: "/apple-touch-icon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-[#0e1114] text-white antialiased">
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0" style={{ background:
            "radial-gradient(50% 50% at 10% 10%, rgba(255,43,106,0.18) 0%, transparent 60%),"+
            "radial-gradient(40% 40% at 90% 0%, rgba(255,43,106,0.12) 0%, transparent 60%),"+
            "radial-gradient(60% 60% at 50% 100%, rgba(255,43,106,0.16) 0%, transparent 60%)" }} />
        </div>
        {children}
      </body>
    </html>
  );
}

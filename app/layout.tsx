// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "KMLeads — Лидогенерация из Telegram-чатов",
  description: "Инструмент для поиска и привлечения клиентов из Telegram в реальном времени.",
  icons: { icon: "/favicon.ico", shortcut: "/favicon.ico", apple: "/apple-touch-icon.png" },
};

const METRIKA_ID = 104932560; // ваш ID счётчика

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        {/* Yandex.Metrika */}
        <Script id="ym-loader" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j=0; j<document.scripts.length; j++) {
                if (document.scripts[j].src === r) { return; }
              }
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(${METRIKA_ID}, "init", {
              webvisor: true,
              clickmap: true,
              ecommerce: "dataLayer",
              accurateTrackBounce: true,
              trackLinks: true
            });
          `}
        </Script>
      </head>
      <body className="min-h-screen bg-[#0e1114] text-white antialiased">
        <div className="fixed inset-0 -z-10">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(50% 50% at 10% 10%, rgba(255,43,106,0.18) 0%, transparent 60%)," +
                "radial-gradient(40% 40% at 90% 0%, rgba(255,43,106,0.12) 0%, transparent 60%)," +
                "radial-gradient(60% 60% at 50% 100%, rgba(255,43,106,0.16) 0%, transparent 60%)",
            }}
          />
        </div>

        {children}

        {/* noscript-пиксель Метрики (для пользователей без JS) */}
        <noscript>
          <div>
            <img
              src={`https://mc.yandex.ru/watch/${METRIKA_ID}`}
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
      </body>
    </html>
  );
}

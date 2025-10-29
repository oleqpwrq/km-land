# KMLeads Landing — Next.js + Tailwind + Resend

## Как развернуть (пошагово)
1) **Скачать и распаковать** архив, затем:
```bash
cd kmleads-landing
npm i
npm run dev
```
Открой http://localhost:3000

2) **Resend (отправка заявок)** — создай `.env.local`:
```
RESEND_API_KEY=ваш_ключ
TO_EMAIL=куда_получать_заявки@example.com
FROM_EMAIL="KMLeads <noreply@your-domain.com>"
```
В Resend добавь домен (Dashboard → Domains) и дождись **Verified**.

3) **Деплой на Vercel**
- Вариант А (web): импортируй репозиторий, добавьn ENV (`RESEND_API_KEY`, `TO_EMAIL`, `FROM_EMAIL`), Deploy.
- Вариант Б (CLI):
```bash
npm i -g vercel
vercel login
vercel          # Preview
vercel --prod   # Production
```

4) **Статика**
Файлы в `/public`: `logo.png`, `feeds.png`, `favicon.ico`, `apple-touch-icon.png`. Заменяй на свои.

5) **Где что лежит**
- `app/layout.tsx` — фикс-фон + фавиконы
- `app/page.tsx` — весь лендинг
- `app/api/lead/route.ts` — отправка заявок через Resend
- `app/globals.css` — Tailwind подключение

6) **Проверка**
- Маска телефона: `+7` + 10 цифр.
- Email: пустой или `*@*.(ru|com)`.
- В футере: Telegram-ссылка и оферта.

by @oleqpwrq

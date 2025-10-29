// Next.js landing page with header, hero, features, how-it-works, pricing, form, footer
"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
const accent = "#ff2b6a";

const CALL_PLAIN = "+7 965 383-55-61";
const CALL_URI = "callto:+79653835561";

// утилита для конкатенации классов
function cx(...arr: (string | false | null | undefined)[]) { return arr.filter(Boolean).join(" "); }

// Кнопка «Позвонить»: по умолчанию размер как у «Оставить заявку» в хедере.
// В герое при необходимости увеличиваем через className.
function CallButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={CALL_URI}
      aria-label={`Позвонить ${CALL_PLAIN}`}
      className={cx(
        "rounded-xl px-4 py-2 text-sm font-semibold shadow border border-white/20 hover:bg-white/10",
        className
      )}
    >
      Позвонить
    </a>
  );
}

function validatePhone(v: string) { return /^\+7\d{10}$/.test(v); }
function formatPhoneInput(raw: string) {
  const digits = raw.replace(/\D/g, ""); let tail = digits;
  if (tail.startsWith("7")) tail = tail.slice(1);
  if (tail.startsWith("8")) tail = tail.slice(1);
  tail = tail.slice(0, 10); return "+7" + tail;
}
function validateEmailOptional(v: string) { return !v || /^[^\s@]+@[^\s@]+\.(ru|com)$/i.test(v); }

export default function Page() {
  const [name, setName] = useState(""); const [phone, setPhone] = useState("+7");
  const [email, setEmail] = useState(""); const [extra, setExtra] = useState("");
  const [agree, setAgree] = useState(true); const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const nameOk = name.trim().length > 1; const phoneOk = validatePhone(phone); const emailOk = validateEmailOptional(email);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault(); setMessage(null);
    if (!nameOk || !phoneOk || !emailOk || !agree) { setMessage("Проверьте обязательные поля"); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, extra, source: "kmleads-landing" }) });
      const data = await res.json(); if (!res.ok) throw new Error(data?.error || "Ошибка отправки");
      setMessage("Спасибо! Заявка отправлена. Мы свяжемся с вами в ближайшее время.");
      setName(""); setPhone("+7"); setEmail(""); setExtra("");
    } catch (err: any) { setMessage(err.message || "Ошибка сети"); } finally { setLoading(false); }
  }

  const statItem = (v: string, l: string) => (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur">
      <div className="text-3xl md:text-4xl font-bold" style={{ color: accent }}>{v}</div>
      <div className="mt-2 text-sm text-white/70">{l}</div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0e1114]/70 backdrop-blur">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="KMLeads" width={32} height={32} className="rounded" />
            <span className="font-semibold">KMLeads</span>
          </div>
          {/* Кнопки справа одной группой с равным размером */}
          <div className="flex items-center gap-3">
            <a href="#form" className="rounded-xl px-4 py-2 text-sm font-semibold shadow" style={{ background: accent }}>
              Оставить заявку
            </a>
            <CallButton />
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-8 pt-12 pb-10 md:pt-20 md:pb-16">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-extrabold leading-tight">
                Лидогенерация из Telegram-чатов <span style={{ color: accent }}>KMLeads</span>
              </motion.h1>
              <p className="mt-6 text-white/80 text-lg md:text-xl max-w-xl">
                Инновационный инструмент для поиска и привлечения клиентов: морфологический поиск, расширенный синтаксис,
                крупнейшая база источников и доставка лидов в реальном времени.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#form" className="rounded-2xl px-6 py-3 text-base font-semibold shadow-lg" style={{ background: accent }}>Получить поток заявок</a>
                <a href="#how" className="rounded-2xl px-6 py-3 text-base font-semibold border border-white/20">Как это работает</a>
                {/* В герое делаем кнопку больше, чтобы соответствовать крупным CTA */}
                <CallButton className="px-6 py-3 text-base" />
              </div>
              <div className="mt-10 grid grid-cols-2 gap-4 md:max-w-md">
                {statItem("> 200", "клиентов уже используют KMLeads")}
                {statItem("~ 4 сек", "среднее время доставки лида")}
              </div>
            </div>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 0.1 }} className="relative">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-1">
                <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#0b0e11]">
                  <Image src="/feeds.png" alt="Realtime feed" fill className="object-cover" />
                </div>
              </div>
              <div className="pointer-events-none absolute -bottom-8 right-0 h-40 w-40 rounded-full blur-2xl opacity-60"
                   style={{ background: `conic-gradient(from 180deg at 50% 50%, ${accent}66, transparent)` }} />
            </motion.div>
          </div>
        </div>
      </section>

      <section id="features" className="relative">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-8 py-16 md:py-24">
          <h2 className="text-3xl md:text-5xl font-extrabold">Наши возможности</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Морфологический поиск", desc: "Поиск по слову или фразе с учетом морфологии русского языка." },
              { title: "Расширенный синтаксис", desc: "Минус-слова, точные фразы, гибкие правила фильтрации." },
              { title: "Крупнейшая база источников", desc: "40 000+ отслеживаемых чатов. 5 млн новых публикаций ежедневно." },
              { title: "Реальное время", desc: "Уведомления в течение 3–10 секунд с момента публикации." },
              { title: "Доставка уведомлений", desc: "В личный диалог с Telegram-ботом или в рабочий групповой чат." },
              { title: "Масштабирование", desc: "Ежедневное пополнение базы новых чатов и запросов." },
            ].map((f, i) => (
              <motion.div key={i} initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur hover:bg-white/15">
                <div className="text-lg font-semibold" style={{ color: accent }}>{f.title}</div>
                <p className="mt-2 text-white/80">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="relative">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-8 py-16 md:py-24">
          <h2 className="text-3xl md:text-5xl font-extrabold">Как это работает</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-5">
            {[
              { step: "1", title: "Сообщение в чате", desc: "В тематическом Telegram-чате появляется запрос/боль: «Нужен таргетолог…»" },
              { step: "2", title: "Поиск KMLeads", desc: "Морфологический и синтаксический поиск находит релевантные упоминания в реальном времени." },
              { step: "3", title: "Анализ нейросетью", desc: "Нейромодель оценивает намерение и приоритет лида, отбрасывает спам и шум." },
              { step: "4", title: "Ответ и лид", desc: "Автоответ или персональный отклик. Лид попадает к вам в бот/чат и в CRM." },
              { step: "5", title: "Сделка", desc: "Нейро-продавец ведёт диалог по воронке до брони/оплаты. Метрики доступны в отчётах." },
            ].map((s, i) => (
              <motion.div key={s.step} initial={{ y: 16, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.4, delay: i * 0.05 }}
                className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="text-sm text-white/60">Шаг {s.step}</div>
                <div className="mt-2 text-lg font-semibold" style={{ color: accent }}>{s.title}</div>
                <div className="mt-2 text-white/80 text-sm">{s.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="relative">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-8 py-16 md:py-24">
          <h2 className="text-3xl md:text-5xl font-extrabold">Услуги и цены</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <div className="text-sm uppercase tracking-wider text-white/60">Пакет 1</div>
              <div className="mt-2 text-2xl font-bold">Сбор и анализ + ответ на первичный лид</div>
              <div className="mt-3 text-4xl font-extrabold" style={{ color: accent }}>20 000 ₽ / мес</div>
              <ul className="mt-4 space-y-2 text-white/80 list-disc list-inside">
                <li>Нейросеть анализирует релевантность и заинтересованность</li>
                <li>Персонализированный ответ клиенту</li>
                <li>Доставка в бот или рабочий чат</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <div className="text-sm uppercase tracking-wider text-white/60">Пакет 2</div>
              <div className="mt-2 text-2xl font-bold">Полная автономия (Нейро-продавец)</div>
              <div className="mt-3 text-4xl font-extrabold" style={{ color: accent }}>+20 000 ₽ / мес</div>
              <ul className="mt-4 space-y-2 text-white/80 list-disc list-inside">
                <li>Ведение диалога по воронке</li>
                <li>Оформление сделок и поддержка 24/7</li>
                <li>Максимум конверсии за счёт скорости реакции</li>
              </ul>
            </div>
          </div>
          <p className="mt-6 text-sm text-white/50">*Не является публичной офертой. Цены действительны на день отправки КП.</p>
        </div>
      </section>

      <section id="form" className="relative">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-8 py-16 md:py-24">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-3xl md:text-5xl font-extrabold">Готовы начать?</h2>
              <p className="mt-5 text-white/80 max-w-xl">Оставьте заявку — подключим KMLeads, настроим ключевые запросы и запустим поток лидов уже сегодня.</p>
              <div className="mt-8 grid grid-cols-2 gap-4 md:max-w-md">
                {statItem("200 тыс.", "отслеживаемых чатов")}
                {statItem("3–10 сек", "доставка уведомлений")}
              </div>
            </div>
            <div>
              <form onSubmit={onSubmit} className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
                <div className="grid gap-5">
                  <div>
                    <label className="text-sm text-white/70">Имя *</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ваше имя"
                      className={cx("mt-2 w-full rounded-xl bg-[#0b0e11] px-4 py-3 outline-none ring-1 ring-inset", nameOk ? "ring-white/10" : "ring-red-500/60")} />
                  </div>
                  <div>
                    <label className="text-sm text-white/70">Телефон (+7XXXXXXXXXX) *</label>
                    <input inputMode="numeric" value={phone} onChange={(e) => setPhone(formatPhoneInput(e.target.value))} placeholder="+7XXXXXXXXXX"
                      className={cx("mt-2 w-full rounded-xl bg-[#0b0e11] px-4 py-3 outline-none ring-1 ring-inset", phoneOk ? "ring-white/10" : "ring-red-500/60")} />
                    <p className="mt-1 text-xs text-white/50">Допускается только формат: +7 и 10 цифр</p>
                  </div>
                  <div>
                    <label className="text-sm text-white/70">Почта (необязательно)</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.ru | name@company.com"
                      className={cx("mt-2 w-full rounded-xl bg-[#0b0e11] px-4 py-3 outline-none ring-1 ring-inset", emailOk ? "ring-white/10" : "ring-red-500/60")} />
                    <p className="mt-1 text-xs text-white/50">Должна содержать @ и заканчиваться на .ru или .com</p>
                  </div>
                  <div>
                    <label className="text-sm text-white/70">Дополнительно (необязательно)</label>
                    <textarea value={extra} onChange={(e) => setExtra(e.target.value)} placeholder="Кратко опишите задачу, нишу и KPI"
                      className="mt-2 w-full rounded-xl bg-[#0b0e11] px-4 py-3 outline-none ring-1 ring-inset ring-white/10 min-h-[96px]" />
                  </div>
                  <label className="flex items-start gap-3 text-sm text-white/70">
                    <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5" />
                    <span>Даю согласие на обработку персональных данных</span>
                  </label>
                  <button type="submit" disabled={!nameOk || !phoneOk || !emailOk || !agree || loading}
                    className="rounded-2xl px-6 py-3 font-semibold shadow-lg disabled:opacity-50" style={{ background: accent }}>
                    {loading ? "Отправка..." : "Отправить заявку"}
                  </button>
                  {message && <div className="text-sm text-white/80">{message}</div>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-8 py-10 text-sm text-white/60 grid md:grid-cols-3 gap-6 items-center">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="KMLeads" width={24} height={24} className="rounded" />
            <div>
              <div className="font-semibold text-white">KMLeads</div>
              <div>Корпоративный Маркетинг</div>
            </div>
          </div>

          {/* Адрес и кнопка в одну линию */}
          <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
            <div>Москва, Проспект Мира 102к1, БЦ «Парк Мира»</div>
            <CallButton className="px-4 py-2 text-sm" />
          </div>

          <div className="flex items-center gap-4 md:justify-end">
            <a href="https://t.me/kmleads" target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 hover:bg-white/10">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 4L2 11l6 2 2 6 12-15Z" stroke="white" strokeWidth="1.5"/></svg>
              <span className="text-white">Telegram</span>
            </a>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-8 pb-8 -mt-4 text-xs text-white/50">*Не является публичной офертой</div>
      </footer>
    </div>
  );
}

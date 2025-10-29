export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { Resend } from "resend";

function isValidPhone(p: string) { return /^\+7\d{10}$/.test(p); }
function isValidEmailOptional(e?: string) { return !e || /^[^\s@]+@[^\s@]+\.(ru|com)$/i.test(e); }

export async function POST(req: Request) {
  try {
    const { name, phone, email, extra, source } = await req.json();

    if (!name || typeof name !== "string" || name.trim().length < 2)
      return NextResponse.json({ error: "Некорректное имя" }, { status: 400 });
    if (!isValidPhone(phone))
      return NextResponse.json({ error: "Телефон должен быть в формате +7XXXXXXXXXX" }, { status: 400 });
    if (!isValidEmailOptional(email))
      return NextResponse.json({ error: "Email должен заканчиваться на .ru или .com" }, { status: 400 });

    const resend = new Resend(process.env.RESEND_API_KEY);

    const html = `
      <h2>Новая заявка с лендинга KMLeads</h2>
      <p><b>Имя:</b> ${escapeHtml(name)}</p>
      <p><b>Телефон:</b> ${escapeHtml(phone)}</p>
      ${email ? `<p><b>Email:</b> ${escapeHtml(email)}</p>` : ""}
      ${extra ? `<p><b>Дополнительно:</b> ${escapeHtml(extra)}</p>` : ""}
      <p><b>Источник:</b> ${escapeHtml(source || "web")}</p>
    `;

    await resend.emails.send({
      from: process.env.FROM_EMAIL || "KMLeads <noreply@your-domain.com>",
      to: [process.env.TO_EMAIL || "team@example.com"],
      subject: "Новая заявка KMLeads",
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
function escapeHtml(s: string) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
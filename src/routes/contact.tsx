import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Send, CheckCircle2, Mail } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Reveal, SectionTitle } from "@/components/site/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Djamal TOKO" },
      { name: "description", content: "Contactez Djamal TOKO, développeur full stack au Bénin, pour un projet ou une collaboration." },
      { property: "og:title", content: "Contact — Djamal TOKO" },
      { property: "og:description", content: "Un projet ou une idée ? Écrivez à Djamal TOKO." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const EMAIL = "Djamaltoko256@gmail.com";

function Contact() {
  const { t } = useLang();
  const schema = z.object({
    name: z.string().trim().min(1, t({ fr: "Nom requis", en: "Name required" })).max(100),
    email: z.string().trim().email(t({ fr: "Email invalide", en: "Invalid email" })).max(255),
    message: z.string().trim().min(10, t({ fr: "10 caractères minimum", en: "At least 10 characters" })).max(1000),
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const r = schema.safeParse(data);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      return setErrors(errs);
    }
    setErrors({});
    const subject = encodeURIComponent(`Portfolio — ${r.data.name}`);
    const body = encodeURIComponent(`${r.data.message}\n\n— ${r.data.name} (${r.data.email})`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const field = "w-full rounded-xl border bg-background/40 px-4 py-3 outline-none transition-all focus:border-primary focus:shadow-glow";

  return (
    <div className="mx-auto max-w-2xl px-6">
      <SectionTitle kicker="Contact" title={t({ fr: "Travaillons ensemble", en: "Let's work together" })} />
      <Reveal className="mb-6">
        <a href={`mailto:${EMAIL}`} className="glass inline-flex items-center gap-3 rounded-full px-5 py-3 transition-all hover:shadow-glow">
          <Mail className="size-4 text-gold" /> <span className="font-mono text-sm">{EMAIL}</span>
        </a>
      </Reveal>
      <Reveal className="glass rounded-3xl p-8">
        {sent ? (
          <div className="py-10 text-center">
            <CheckCircle2 className="mx-auto size-12 text-primary-glow" />
            <p className="mt-4 text-xl font-semibold">{t({ fr: "Merci ! Votre messagerie s'ouvre pour envoyer le message.", en: "Thanks! Your email app is opening to send the message." })}</p>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="space-y-5">
            {(["name", "email"] as const).map((f) => (
              <div key={f}>
                <label htmlFor={f} className="mb-2 block text-sm text-muted-foreground">
                  {f === "name" ? t({ fr: "Nom", en: "Name" }) : "Email"}
                </label>
                <input id={f} name={f} type={f === "email" ? "email" : "text"} maxLength={f === "name" ? 100 : 255} className={field} />
                {errors[f] && <p className="mt-1 text-sm text-destructive">{errors[f]}</p>}
              </div>
            ))}
            <div>
              <label htmlFor="message" className="mb-2 block text-sm text-muted-foreground">Message</label>
              <textarea id="message" name="message" rows={5} maxLength={1000} className={field} />
              {errors["message"] && <p className="mt-1 text-sm text-destructive">{errors["message"]}</p>}
            </div>
            <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-primary py-3 font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]">
              {t({ fr: "Envoyer", en: "Send" })} <Send className="size-4" />
            </button>
          </form>
        )}
      </Reveal>
    </div>
  );
}

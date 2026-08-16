import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mic, Volume2, Send, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { AppShell, SophronMark } from "@/components/sophron/AppShell";
import { Panel } from "@/components/sophron/bits";
import { conversation } from "@/lib/sophron-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/child/talk")({
  head: () => ({
    meta: [
      { title: "Talk to Sophron — Voice Companion" },
      { name: "description", content: "Chat or speak with the Sophron companion for gentle, reflective guidance." },
      { property: "og:title", content: "Talk to Sophron — Voice Companion" },
      { property: "og:description", content: "A friendly companion that answers with questions, not judgement." },
    ],
  }),
  component: Talk,
});

const personalities = ["Friendly", "Mentor", "Fun"];

const canned: Record<string, string> = {
  default:
    "Let's think about it together. What do you imagine the other person is feeling right now?",
  trust:
    "Trust is like a bridge — every honest choice adds a strong piece to it. What piece could you add today?",
};

function Wave({ active }: { active: boolean }) {
  return (
    <div className="flex h-10 items-end gap-1">
      {[6, 14, 22, 30, 22, 14, 24, 12, 18, 8].map((h, i) => (
        <span
          key={i}
          className={cn("w-1.5 rounded-full bg-primary transition-all duration-300", active ? "animate-pulse" : "opacity-40")}
          style={{ height: active ? `${h + 8}px` : `${h / 2}px`, animationDelay: `${i * 90}ms` }}
        />
      ))}
    </div>
  );
}

function Talk() {
  const [msgs, setMsgs] = useState(conversation);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [voice, setVoice] = useState("Friendly");

  function send(text: string) {
    if (!text.trim()) return;
    const reply = /trust|bridge/i.test(text) ? canned["trust"]! : canned["default"]!;
    setMsgs((m) => [...m, { from: "child", text }, { from: "sophron", text: reply }]);
    setInput("");
  }

  return (
    <AppShell variant="child" title="Talk to Sophron" subtitle="Ask anything — Sophron will think with you">
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Panel title="Conversation">
          <div className="space-y-4">
            {msgs.map((m, i) => (
              <div key={i} className={cn("flex gap-3", m.from === "child" && "justify-end")}>
                {m.from === "sophron" && (
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-soft border border-border">
                    <SophronMark className="h-7 w-7" />
                  </span>
                )}
                <p
                  className={cn(
                    "max-w-md rounded-2xl px-4 py-3 text-[15px] leading-relaxed shadow-soft",
                    m.from === "child"
                      ? "rounded-tr-md bg-brand text-primary-foreground"
                      : "rounded-tl-md border border-border bg-card",
                  )}
                >
                  {m.text}
                </p>
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="mt-6 flex flex-wrap items-center gap-3"
          >
            <button
              type="button"
              onClick={() => {
                setListening((l) => !l);
                if (!listening) {
                  toast("Listening… (simulated)", { description: "Voice interaction is optional in this prototype." });
                  setTimeout(() => { setListening(false); send("Why was my first answer not a good choice?"); }, 1600);
                }
              }}
              className={cn(
                "grid h-12 w-12 place-items-center rounded-full shadow-soft transition",
                listening ? "bg-coral text-coral-foreground animate-pulse" : "bg-brand text-primary-foreground hover:brightness-110",
              )}
              aria-label="Speak to Sophron"
            >
              <Mic className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => toast("Playing Sophron's reply aloud (simulated)")}
              className="grid h-12 w-12 place-items-center rounded-full border border-border bg-card shadow-soft transition hover:border-primary"
              aria-label="Play reply"
            >
              <Volume2 className="h-5 w-5" />
            </button>
            <Wave active={listening} />
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question…"
              className="min-w-[12rem] flex-1 rounded-full border border-border bg-card px-5 py-3 text-sm outline-none transition focus:border-primary"
            />
            <button
              type="submit"
              className="grid h-12 w-12 place-items-center rounded-full bg-brand text-primary-foreground shadow-soft transition hover:brightness-110"
              aria-label="Send"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
          <p className="mt-3 text-xs text-muted-foreground">Voice interaction is optional.</p>
        </Panel>

        <div className="space-y-6">
          <Panel title="Sophron's voice" description="Pick the companion style you like.">
            <div className="grid gap-3">
              {personalities.map((p) => (
                <button
                  key={p}
                  onClick={() => { setVoice(p); toast.success(`${p} voice selected`); }}
                  className={cn(
                    "flex items-center justify-between rounded-2xl border-2 border-border px-4 py-3 font-display font-bold transition hover:border-primary",
                    voice === p && "border-primary bg-primary/5",
                  )}
                >
                  {p}
                  {voice === p && <Sparkles className="h-4 w-4 text-primary" />}
                </button>
              ))}
            </div>
          </Panel>
          <Panel title="Try asking">
            <ul className="space-y-2 text-sm">
              {["Why was my first answer not a good choice?", "What is trust?", "How can I be kinder at school?"].map((q) => (
                <li key={q}>
                  <button onClick={() => send(q)} className="w-full rounded-xl border border-border px-4 py-2.5 text-left transition hover:border-primary">
                    {q}
                  </button>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}

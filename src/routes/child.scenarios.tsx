import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Lock, PlayCircle } from "lucide-react";
import { AppShell } from "@/components/sophron/AppShell";
import { Panel, Pill } from "@/components/sophron/bits";

export const Route = createFileRoute("/child/scenarios")({
  head: () => ({
    meta: [
      { title: "Scenarios — Sophron" },
      { name: "description", content: "Browse Sophron's real-life scenarios across honesty, empathy, kindness and more." },
      { property: "og:title", content: "Scenarios — Sophron" },
      { property: "og:description", content: "Real-life stories that turn choices into understanding." },
    ],
  }),
  component: Scenarios,
});

const list = [
  { name: "The Lost Wallet", value: "Honesty", state: "today", difficulty: "Medium", emoji: "👛" },
  { name: "The Lunch Box", value: "Empathy", state: "open", difficulty: "Easy", emoji: "🥪" },
  { name: "The Group Project", value: "Responsibility", state: "done", difficulty: "Medium", emoji: "📋" },
  { name: "The New Student", value: "Kindness", state: "done", difficulty: "Easy", emoji: "🙋" },
  { name: "Library Voices", value: "Respect", state: "done", difficulty: "Easy", emoji: "📚" },
  { name: "The Broken Window", value: "Honesty", state: "open", difficulty: "Medium", emoji: "🪟" },
  { name: "The Forgotten Homework", value: "Responsibility", state: "open", difficulty: "Medium", emoji: "📒" },
  { name: "Sharing the Swing", value: "Fairness", state: "locked", difficulty: "Easy", emoji: "🛝" },
];

function Scenarios() {
  return (
    <AppShell variant="child" title="Scenarios" subtitle="Stories from everyday life">
      <Panel title="All scenarios" description="Pick a story and see where each choice leads.">
        <div className="grid gap-4 md:grid-cols-2">
          {list.map((s) => (
            <div key={s.name} className="flex items-center gap-4 rounded-2xl border border-border p-4 transition hover:shadow-soft">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-soft text-2xl">{s.emoji}</span>
              <div className="min-w-0 flex-1">
                <p className="font-display font-bold">{s.name}</p>
                <div className="mt-1 flex flex-wrap gap-2">
                  <Pill>{s.value}</Pill>
                  <Pill tint="sun">{s.difficulty}</Pill>
                </div>
              </div>
              {s.state === "done" ? (
                <span className="flex items-center gap-1 text-sm font-bold text-leaf"><CheckCircle2 className="h-4 w-4" /> Done</span>
              ) : s.state === "locked" ? (
                <span className="flex items-center gap-1 text-sm font-bold text-muted-foreground"><Lock className="h-4 w-4" /> Soon</span>
              ) : (
                <Link
                  to="/child/scenario"
                  className="inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-sm font-bold text-primary-foreground shadow-soft transition hover:brightness-110"
                >
                  {s.state === "today" ? <PlayCircle className="h-4 w-4" /> : null} Start <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </Panel>
    </AppShell>
  );
}

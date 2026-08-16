import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Shield, Heart, HandHeart, Handshake, Target, Scale } from "lucide-react";
import { AppShell } from "@/components/sophron/AppShell";
import { Pill, ProgressBar } from "@/components/sophron/bits";
import { chapters } from "@/lib/sophron-data";
import { cn } from "@/lib/utils";
import { useSophron } from "@/lib/sophron-store";

export const Route = createFileRoute("/child/learn")({
  head: () => ({
    meta: [
      { title: "Choose a Value Chapter — Sophron" },
      { name: "description", content: "Pick a value chapter: honesty, empathy, kindness, respect, responsibility or fairness." },
      { property: "og:title", content: "Choose a Value Chapter — Sophron" },
      { property: "og:description", content: "What would you like to learn today?" },
    ],
  }),
  component: Learn,
});

const accentClass: Record<string, string> = {
  primary: "bg-primary/12 text-primary",
  grape: "bg-grape/12 text-grape",
  sky: "bg-sky/12 text-sky",
  leaf: "bg-leaf/15 text-leaf",
  sun: "bg-sun/25 text-sun-foreground",
  coral: "bg-coral/15 text-coral",
};

const icons: Record<string, typeof Shield> = {
  honesty: Shield,
  empathy: Heart,
  kindness: HandHeart,
  respect: Handshake,
  responsibility: Target,
  fairness: Scale,
};

function Learn() {
  const { honestyProgress, honestyCompleted } = useSophron();
  return (
    <AppShell variant="child" title="Learn" subtitle="Chapters chosen with your parent">
      <h2 className="font-display text-2xl font-extrabold">What would you like to learn today?</h2>
      <p className="mt-1 text-muted-foreground">Every chapter is a set of real-life stories.</p>

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {chapters.map((c) => {
          const Icon = icons[c.id] ?? Shield;
          const progress = c.id === "honesty" ? honestyProgress : c.progress;
          const completed = c.id === "honesty" ? honestyCompleted : c.completed;
          return (
            <article key={c.id} className="card-soft flex flex-col p-6 transition hover:-translate-y-1 hover:shadow-lift">
              <div className="flex items-start justify-between">
                <span className={cn("grid h-12 w-12 place-items-center rounded-2xl", accentClass[c.accent])}>
                  <Icon className="h-6 w-6" />
                </span>
                <Pill tint={c.accent}>{c.difficulty}</Pill>
              </div>
              <h3 className="mt-4 font-display text-xl font-bold">{c.value}</h3>
              <p className="text-sm text-muted-foreground">{c.blurb}</p>
              <p className="mt-4 text-sm font-bold">
                {completed} / {c.total} scenarios completed
              </p>
              <div className="mt-2"><ProgressBar value={progress} tint={c.accent} /></div>
              <p className="mt-1 text-xs font-semibold text-muted-foreground">{progress}% complete</p>
              <Link
                to="/child/scenario"
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-brand px-4 py-2.5 font-display font-bold text-primary-foreground shadow-soft transition hover:brightness-110"
              >
                {progress === 0 ? "Start" : "Continue"} <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          );
        })}
      </div>
    </AppShell>
  );
}

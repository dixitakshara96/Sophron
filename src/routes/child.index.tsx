import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, Flame, Trophy, Target, ArrowRight, Sparkles, Gauge } from "lucide-react";
import { AppShell } from "@/components/sophron/AppShell";
import { Panel, ProgressBar, StatCard, Pill } from "@/components/sophron/bits";
import { useSophron } from "@/lib/sophron-store";
import { chapters, recommendations } from "@/lib/sophron-data";
import wallet from "@/assets/scenario-wallet.jpg";

export const Route = createFileRoute("/child/")({
  head: () => ({
    meta: [
      { title: "Child Dashboard — Sophron" },
      { name: "description", content: "Arjun's daily mission, stars, streak and value chapters on Sophron." },
      { property: "og:title", content: "Child Dashboard — Sophron" },
      { property: "og:description", content: "Today's mission, stars, streaks and value chapters." },
    ],
  }),
  component: ChildHome,
});

function ChildHome() {
  const { stars, streak, level, unlockedBadges, honestyProgress } = useSophron();

  return (
    <AppShell variant="child" title="Hi, Arjun! 👋" subtitle="Ready for today's challenge?">
      <div className="space-y-6">
        <section className="card-soft overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-[1.1fr_1fr]">
            <div className="bg-soft p-6 md:p-8">
              <p className="font-display text-3xl font-extrabold">Hi, Arjun! 👋</p>
              <p className="mt-1 text-muted-foreground">Ready for today's challenge?</p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="flex items-center gap-2 rounded-full bg-card px-4 py-2 font-bold shadow-soft">
                  <Gauge className="h-4 w-4 text-primary" /> Level {level}
                </span>
                <span className="flex items-center gap-2 rounded-full bg-card px-4 py-2 font-bold shadow-soft">
                  <Star className="h-4 w-4 fill-sun text-sun" /> {stars} Stars
                </span>
                <span className="flex items-center gap-2 rounded-full bg-card px-4 py-2 font-bold shadow-soft">
                  <Flame className="h-4 w-4 text-coral" /> {streak} Day Streak
                </span>
                <span className="flex items-center gap-2 rounded-full bg-card px-4 py-2 font-bold shadow-soft">
                  <Trophy className="h-4 w-4 text-grape" /> {4 + unlockedBadges.length} Badges
                </span>
              </div>

              <div className="mt-7 rounded-2xl border border-border bg-card p-5 shadow-soft">
                <p className="text-xs font-bold uppercase tracking-wide text-primary">Today's mission</p>
                <p className="font-display text-2xl font-bold">The Lost Wallet</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  A story about honesty, trust and how our choices reach other people.
                </p>
                <Link
                  to="/child/scenario"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 font-display font-bold text-primary-foreground shadow-lift transition hover:brightness-110"
                >
                  Start Scenario <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <img
              src={wallet}
              alt="A child noticing a wallet on the playground path"
              width={1280}
              height={800}
              className="h-full w-full object-cover"
            />
          </div>
        </section>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Today's goal" value="1 scenario" sub="Finish before 7:00 PM" icon={<Target className="h-5 w-5" />} />
          <StatCard label="Stars" value={stars} sub="+10 from your last story" icon={<Star className="h-5 w-5" />} tint="sun" />
          <StatCard label="Streak" value={`${streak} days`} sub="Keep it glowing!" icon={<Flame className="h-5 w-5" />} tint="coral" />
          <StatCard label="Level" value={level} sub="Value Explorer" icon={<Sparkles className="h-5 w-5" />} tint="grape" />
        </div>

        <Panel
          title="Continue where you left off"
          description="Your chapters are waiting."
          action={
            <Link to="/child/learn" className="text-sm font-bold text-primary hover:underline">
              See all chapters →
            </Link>
          }
        >
          <div className="grid gap-4 md:grid-cols-3">
            {chapters.slice(0, 3).map((c) => {
              const progress = c.id === "honesty" ? honestyProgress : c.progress;
              return (
                <div key={c.id} className="rounded-2xl border border-border p-4 transition hover:shadow-soft">
                  <div className="flex items-center justify-between">
                    <p className="font-display font-bold">{c.value}</p>
                    <Pill tint={c.accent}>{progress}%</Pill>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{c.blurb}</p>
                  <div className="mt-3"><ProgressBar value={progress} tint={c.accent} /></div>
                </div>
              );
            })}
          </div>
        </Panel>

        <Panel title="Made for You" description="Sophron adapts your next stories to how you learn.">
          <div className="grid gap-4 md:grid-cols-3">
            {recommendations.map((r) => (
              <div key={r.title} className="rounded-2xl border border-border bg-soft p-5">
                <span className="text-2xl">{r.emoji}</span>
                <p className="mt-2 font-display text-lg font-bold">{r.title}</p>
                <p className="text-xs text-muted-foreground">{r.why}</p>
                <div className="mt-3 flex gap-2">
                  <Pill>{r.value}</Pill>
                  <Pill tint="sun">{r.difficulty}</Pill>
                </div>
                <Link
                  to="/child/scenario"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-border bg-card px-4 py-2 text-sm font-bold shadow-soft transition hover:border-primary/60"
                >
                  Start
                </Link>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}

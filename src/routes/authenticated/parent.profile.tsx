import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/sophron/AppShell";
import { Panel, Pill, ProgressBar } from "@/components/sophron/bits";
import { GpsForLife } from "@/components/sophron/GpsForLife";
import { FamilyAccess } from "@/components/sophron/FamilyAccess";
import { child, badges } from "@/lib/sophron-data";
import { useSophron } from "@/lib/sophron-store";

export const Route = createFileRoute("/authenticated/parent/profile")({
  head: () => ({
    meta: [
      { title: "Child Profile — Sophron Parents" },
      { name: "description", content: "Arjun's profile: level, learning habits, strengths and the Sophron learning philosophy." },
      { property: "og:title", content: "Child Profile — Sophron Parents" },
      { property: "og:description", content: "A calm summary of your child's learning identity." },
    ],
  }),
  component: Profile,
});

function Profile() {
  const { scores, stars, streak, overall, unlockedBadges } = useSophron();
  const unlocked = badges.filter((b) => b.unlocked || unlockedBadges.includes(b.id));

  return (
    <AppShell variant="parent" title="Child Profile" subtitle="Who Arjun is as a learner">
      <div className="space-y-6">
        <Panel>
          <div className="flex flex-wrap items-center gap-6">
            <span className="grid h-20 w-20 place-items-center rounded-3xl bg-soft text-4xl">🦉</span>
            <div className="min-w-[14rem] flex-1">
              <p className="font-display text-2xl font-bold">{child.name}</p>
              <p className="text-sm text-muted-foreground">
                Age {child.age} · Level {child.level} · Last active {child.lastActive}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Pill tint="sun">⭐ {stars} stars</Pill>
                <Pill tint="coral">🔥 {streak} day streak</Pill>
                <Pill tint="leaf">{overall}% overall</Pill>
              </div>
            </div>
          </div>
        </Panel>

        <FamilyAccess />

        <div className="grid gap-6 lg:grid-cols-2">
          <Panel title="Strengths and growth areas">
            <div className="space-y-4">
              {scores.map((s) => (
                <div key={s.value}>
                  <div className="flex items-center justify-between text-sm font-bold">
                    <span>{s.value}</span>
                    <span>{s.score}%</span>
                  </div>
                  <div className="mt-1.5"><ProgressBar value={s.score} /></div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Learning habits">
            <ul className="space-y-3 text-sm">
              {[
                "Prefers evening sessions between 5:30 and 6:30 PM.",
                "Engages more deeply with story-based analogies.",
                "Often revisits a scenario after reflection — a strong growth signal.",
                "Responds well to empathy prompts about friends and classmates.",
              ].map((t) => (
                <li key={t} className="rounded-2xl border border-border bg-soft p-4">{t}</li>
              ))}
            </ul>
          </Panel>
        </div>

        <Panel title="Badges earned">
          <div className="flex flex-wrap gap-3">
            {unlocked.map((b) => (
              <span key={b.id} className="flex items-center gap-2 rounded-2xl border border-border px-4 py-2.5 shadow-soft">
                <span className="text-xl">{b.emoji}</span>
                <span className="font-display font-bold">{b.name}</span>
              </span>
            ))}
          </div>
        </Panel>

        <Panel title="The Sophron philosophy">
          <GpsForLife compact />
        </Panel>
      </div>
    </AppShell>
  );
}

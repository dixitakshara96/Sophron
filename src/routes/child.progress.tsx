import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";
import { ArrowRight, Star, Flame, Target, Gauge } from "lucide-react";
import { AppShell } from "@/components/sophron/AppShell";
import { Panel, StatCard, SophronBubble, ProgressBar, Pill } from "@/components/sophron/bits";
import { useSophron } from "@/lib/sophron-store";
import { weeklyTrend, badges } from "@/lib/sophron-data";

export const Route = createFileRoute("/child/progress")({
  head: () => ({
    meta: [
      { title: "My Progress — Sophron" },
      { name: "description", content: "Arjun's values score, streaks and value-by-value growth across Sophron scenarios." },
      { property: "og:title", content: "My Progress — Sophron" },
      { property: "og:description", content: "See how your values are growing week by week." },
    ],
  }),
  component: Progress,
});

function Progress() {
  const { overall, stars, streak, scenariosCompleted, scores, unlockedBadges } = useSophron();
  const radarData = scores.map((s) => ({ value: s.value, score: s.score }));

  return (
    <AppShell variant="child" title="My Progress" subtitle="Look how far you've come">
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Overall Values Score" value={`${overall}%`} sub="+2% this week" icon={<Gauge className="h-5 w-5" />} />
          <StatCard label="Scenarios Completed" value={scenariosCompleted} sub="Across 5 chapters" icon={<Target className="h-5 w-5" />} tint="sky" />
          <StatCard label="Stars" value={stars} sub="Spend them on new avatars" icon={<Star className="h-5 w-5" />} tint="sun" />
          <StatCard label="Current Streak" value={`${streak} days`} sub="Personal best: 9 days" icon={<Flame className="h-5 w-5" />} tint="coral" />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Panel title="Your values map" description="Each point grows as you practise.">
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} outerRadius="72%">
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis dataKey="value" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                  <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar dataKey="score" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.35} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 grid gap-2">
              {scores.map((s) => (
                <div key={s.value} className="flex items-center gap-3">
                  <span className="w-32 shrink-0 text-sm font-bold">{s.value}</span>
                  <ProgressBar value={s.score} />
                  <span className="w-10 text-right text-sm font-bold">{s.score}%</span>
                </div>
              ))}
            </div>
          </Panel>

          <div className="space-y-6">
            <Panel title="Weekly growth" description="Your values score over 6 weeks.">
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyTrend}>
                    <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" />
                    <XAxis dataKey="week" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                    <YAxis domain={[40, 100]} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} />
                    <Line type="monotone" dataKey="score" stroke="var(--grape)" strokeWidth={3} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Panel>

            <Panel title="Sophron's Recommendation">
              <SophronBubble>
                <p>
                  You're doing great with <strong>Respect</strong> and <strong>Honesty</strong>. Let's
                  practice <strong>Responsibility</strong> with a few more scenarios.
                </p>
              </SophronBubble>
              <Link
                to="/child/scenario"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 font-display font-bold text-primary-foreground shadow-lift transition hover:brightness-110"
              >
                Practice Responsibility <ArrowRight className="h-4 w-4" />
              </Link>
            </Panel>
          </div>
        </div>

        <Panel title="Recently earned" description="Badges you unlocked lately." action={<Link to="/child/badges" className="text-sm font-bold text-primary hover:underline">All badges →</Link>}>
          <div className="flex flex-wrap gap-3">
            {badges
              .filter((b) => b.unlocked || unlockedBadges.includes(b.id))
              .map((b) => (
                <span key={b.id} className="flex items-center gap-2 rounded-2xl border border-border px-4 py-2.5 shadow-soft">
                  <span className="text-xl">{b.emoji}</span>
                  <span className="font-display font-bold">{b.name}</span>
                  {unlockedBadges.includes(b.id) && <Pill tint="leaf">New</Pill>}
                </span>
              ))}
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}

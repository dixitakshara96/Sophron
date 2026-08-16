import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell,
} from "recharts";
import { Gauge, Target, Flame, Layers, Bell, ArrowRight, Clock } from "lucide-react";
import { AppShell } from "@/components/sophron/AppShell";
import { Panel, StatCard, Pill } from "@/components/sophron/bits";
import { useSophron } from "@/lib/sophron-store";
import { weeklyTrend, parentInsights, child } from "@/lib/sophron-data";

export const Route = createFileRoute("/authenticated/parent/")({
  head: () => ({
    meta: [
      { title: "Parent Dashboard — Sophron" },
      { name: "description", content: "A calm, data-informed view of your child's values learning journey on Sophron." },
      { property: "og:title", content: "Parent Dashboard — Sophron" },
      { property: "og:description", content: "Progress, insights and gentle learning-pattern signals." },
    ],
  }),
  component: ParentOverview,
});

const tint = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

function ParentOverview() {
  const { overall, scenariosCompleted, streak, scores, alertDismissed } = useSophron();

  return (
    <AppShell variant="parent" title="Parent Dashboard" subtitle="Good evening, Parent 👋">
      <div className="space-y-6">
        <section className="card-soft flex flex-wrap items-center justify-between gap-4 p-6">
          <div className="flex items-center gap-4">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-soft text-2xl">🦉</span>
            <div>
              <p className="font-display text-xl font-bold">{child.name}</p>
              <p className="text-sm text-muted-foreground">
                Age {child.age} · Level {child.level} · Last active {child.lastActive}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Pill tint="leaf">On track</Pill>
            <Pill tint="sky">Schedule 5–7 PM</Pill>
            <Link to="/authenticated/parent/performance" className="rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-soft transition hover:brightness-110">
              View full report
            </Link>
          </div>
        </section>

        {!alertDismissed && (
          <Link
            to="/authenticated/parent/alerts"
            className="flex items-start gap-4 rounded-2xl border border-sun/50 bg-sun/10 p-5 shadow-soft transition hover:shadow-lift"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-card"><Bell className="h-5 w-5 text-sun-foreground" /></span>
            <div>
              <p className="font-display font-bold">Learning Pattern Alert</p>
              <p className="text-sm text-muted-foreground">
                A change in recent learning behaviour was detected in Responsibility scenarios.
              </p>
            </div>
            <ArrowRight className="ml-auto mt-1 h-5 w-5 shrink-0 text-muted-foreground" />
          </Link>
        )}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Overall Performance" value={`${overall}%`} sub="+8% over 6 weeks" icon={<Gauge className="h-5 w-5" />} />
          <StatCard label="Scenarios Completed" value={scenariosCompleted} sub="This learning period" icon={<Target className="h-5 w-5" />} tint="sky" />
          <StatCard label="Learning Streak" value={`${streak} days`} sub="Consistent evenings" icon={<Flame className="h-5 w-5" />} tint="coral" />
          <StatCard label="Values Practiced" value={6} sub="Including Fairness (new)" icon={<Layers className="h-5 w-5" />} tint="grape" />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <Panel title="Performance trend" description="Overall values score across the last six weeks.">
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyTrend}>
                  <defs>
                    <linearGradient id="trend" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.03} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" />
                  <XAxis dataKey="week" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                  <YAxis domain={[40, 100]} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} />
                  <Area type="monotone" dataKey="score" stroke="var(--primary)" strokeWidth={3} fill="url(#trend)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <Panel title="Sophron's Learning Insights" description="Written to inform, never to label.">
            <ul className="space-y-3">
              {parentInsights.map((i) => (
                <li key={i} className="rounded-2xl border border-border bg-soft p-4 text-sm leading-relaxed">
                  {i}
                </li>
              ))}
            </ul>
            <Link
              to="/authenticated/parent/chapters"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 font-display font-bold text-primary-foreground shadow-soft transition hover:brightness-110"
            >
              View Recommendations <ArrowRight className="h-4 w-4" />
            </Link>
          </Panel>
        </div>

        <Panel
          title="Values performance"
          description="Language is descriptive, never judgemental."
          action={
            <div className="flex flex-wrap gap-2 text-xs font-bold">
              <span className="flex items-center gap-1.5">🟢 Strong</span>
              <span className="flex items-center gap-1.5">🟡 Developing</span>
              <span className="flex items-center gap-1.5">🔵 Needs Practice</span>
            </div>
          }
        >
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scores}>
                <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="value" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                <Tooltip cursor={{ fill: "var(--muted)" }} contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} />
                <Bar dataKey="score" radius={[10, 10, 0, 0]}>
                  {scores.map((_, i) => (
                    <Cell key={i} fill={tint[i % tint.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Recent activity" description="Evening sessions in the approved learning window.">
          <div className="grid gap-3 md:grid-cols-3">
            {[
              { t: "Today, 5:42 PM", d: "Completed The Lost Wallet with reflection" },
              { t: "Yesterday, 6:10 PM", d: "Completed The Lunch Box (Empathy)" },
              { t: "Monday, 5:30 PM", d: "Started The Group Project (Responsibility)" },
            ].map((r) => (
              <div key={r.t} className="rounded-2xl border border-border p-4">
                <p className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" /> {r.t}
                </p>
                <p className="mt-1.5 text-sm font-semibold">{r.d}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import {
  LineChart, Line, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { AppShell } from "@/components/sophron/AppShell";
import { Panel, ProgressBar, Pill } from "@/components/sophron/bits";
import { weeklyTrend, recentScenarios } from "@/lib/sophron-data";
import { useSophron } from "@/lib/sophron-store";

export const Route = createFileRoute("/authenticated/parent/performance")({
  head: () => ({
    meta: [
      { title: "Performance Report — Sophron Parents" },
      { name: "description", content: "A detailed report of weekly trends, value-wise performance and recent scenarios." },
      { property: "og:title", content: "Performance Report — Sophron Parents" },
      { property: "og:description", content: "Weekly trends and value-wise performance at a glance." },
    ],
  }),
  component: Performance,
});

const tint = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

function band(score: number) {
  if (score >= 85) return { label: "🟢 Strong", tint: "leaf" };
  if (score >= 70) return { label: "🟡 Developing", tint: "sun" };
  return { label: "🔵 Needs Practice", tint: "sky" };
}

function Performance() {
  const { overall, scores } = useSophron();
  return (
    <AppShell variant="parent" title="Performance" subtitle="Detailed learning report for Arjun">
      <div className="space-y-6">
        <Panel title="Overall progress">
          <div className="flex flex-wrap items-center gap-6">
            <div className="grid h-28 w-28 place-items-center rounded-full bg-soft">
              <span className="font-display text-3xl font-extrabold text-brand">{overall}%</span>
            </div>
            <div className="min-w-[16rem] flex-1">
              <ProgressBar value={overall} />
              <p className="mt-2 text-sm text-muted-foreground">
                Steady improvement across six weeks, with the strongest gains in Respect and Honesty.
              </p>
            </div>
          </div>
        </Panel>

        <div className="grid gap-6 lg:grid-cols-2">
          <Panel title="Weekly trend" description="Values score by week.">
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyTrend}>
                  <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" />
                  <XAxis dataKey="week" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                  <YAxis domain={[40, 100]} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} />
                  <Line type="monotone" dataKey="score" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="scenarios" stroke="var(--grape)" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <Panel title="Value-wise performance">
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scores} layout="vertical" margin={{ left: 24 }}>
                  <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                  <YAxis type="category" dataKey="value" width={100} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                  <Tooltip cursor={{ fill: "var(--muted)" }} contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} />
                  <Bar dataKey="score" radius={[0, 10, 10, 0]} barSize={18}>
                    {scores.map((_, i) => <Cell key={i} fill={tint[i % tint.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        </div>

        <Panel title="Value bands">
          <div className="grid gap-3 md:grid-cols-5">
            {scores.map((s) => {
              const b = band(s.score);
              return (
                <div key={s.value} className="rounded-2xl border border-border p-4">
                  <p className="font-display font-bold">{s.value}</p>
                  <p className="mt-1 font-display text-2xl font-extrabold">{s.score}%</p>
                  <div className="mt-2"><Pill tint={b.tint}>{b.label}</Pill></div>
                </div>
              );
            })}
          </div>
        </Panel>

        <Panel title="Recent scenarios">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="py-3 font-bold">Scenario</th>
                  <th className="py-3 font-bold">Value</th>
                  <th className="py-3 font-bold">Score</th>
                  <th className="py-3 font-bold">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentScenarios.map((r) => (
                  <tr key={r.name} className="border-b border-border last:border-0">
                    <td className="py-3.5 font-semibold">{r.name}</td>
                    <td className="py-3.5"><Pill>{r.value}</Pill></td>
                    <td className="py-3.5 font-bold">{r.score}%</td>
                    <td className="py-3.5 text-muted-foreground">{r.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}

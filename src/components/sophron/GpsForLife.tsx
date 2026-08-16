import { ArrowDown } from "lucide-react";

const rows = [
  { step: "Situation", icon: "🚗", note: "A wrong turn happens", tint: "border-sky/40 bg-sky/5" },
  { step: "Choice", icon: "🧭", note: "\u201cLet's recalculate.\u201d", tint: "border-primary/40 bg-primary/5" },
  { step: "Consequence", icon: "💭", note: "Understand another person's perspective", tint: "border-grape/40 bg-grape/5" },
  { step: "Understanding", icon: "❤️", note: "Learn empathy", tint: "border-coral/40 bg-coral/5" },
  { step: "Better Path", icon: "🛣️", note: "Choose a better road next time", tint: "border-leaf/40 bg-leaf/5" },
];

export function GpsForLife({ compact }: { compact?: boolean }) {
  return (
    <section className={compact ? "" : "bg-soft"}>
      <div className={`mx-auto max-w-4xl px-5 ${compact ? "py-2" : "py-16"}`}>
        <h2 className="text-center font-display text-3xl font-extrabold">
          Sophron is like a <span className="text-brand">GPS for life.</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
          It never scolds a wrong turn — it shows where each road leads.
        </p>

        <div className="mt-9 flex flex-col items-center gap-1">
          {rows.map((r, i) => (
            <div key={r.step} className="flex w-full max-w-xl flex-col items-center">
              <div
                className={`flex w-full items-center gap-4 rounded-2xl border-2 border-dashed ${r.tint} px-5 py-4 shadow-soft transition hover:scale-[1.02]`}
              >
                <span className="text-2xl">{r.icon}</span>
                <div>
                  <p className="font-display font-bold">{r.step}</p>
                  <p className="text-sm text-muted-foreground">{r.note}</p>
                </div>
              </div>
              {i < rows.length - 1 && <ArrowDown className="my-1 h-5 w-5 text-muted-foreground" />}
            </div>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-2xl rounded-2xl border border-border bg-card p-5 text-center font-display text-lg font-semibold shadow-soft">
          "Sophron doesn't punish a wrong turn. It helps children understand where each road leads."
        </p>
      </div>
    </section>
  );
}

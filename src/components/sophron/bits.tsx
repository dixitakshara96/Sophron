import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SophronMark } from "./AppShell";

const tintMap: Record<string, string> = {
  primary: "bg-primary/12 text-primary",
  grape: "bg-grape/12 text-grape",
  sky: "bg-sky/12 text-sky",
  leaf: "bg-leaf/15 text-leaf",
  sun: "bg-sun/25 text-sun-foreground",
  coral: "bg-coral/15 text-coral",
};

export function StatCard({
  label, value, sub, icon, tint = "primary",
}: { label: string; value: ReactNode; sub?: string; icon: ReactNode; tint?: keyof typeof tintMap | string }) {
  return (
    <div className="card-soft flex items-start gap-4 p-5 transition hover:shadow-lift">
      <span className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-2xl", tintMap[tint])}>{icon}</span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-muted-foreground">{label}</p>
        <p className="font-display text-2xl font-bold">{value}</p>
        {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
      </div>
    </div>
  );
}

export function Panel({
  title, description, action, children, className,
}: { title?: string; description?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={cn("card-soft p-5 md:p-6", className)}>
      {(title || action) && (
        <header className="mb-5 flex flex-wrap items-start justify-between gap-3">
          <div>
            {title && <h2 className="font-display text-lg font-bold">{title}</h2>}
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
          {action}
        </header>
      )}
      {children}
    </section>
  );
}

export function ProgressBar({ value, tint = "primary" }: { value: number; tint?: string }) {
  const bar: Record<string, string> = {
    primary: "bg-primary", grape: "bg-grape", sky: "bg-sky",
    leaf: "bg-leaf", sun: "bg-sun", coral: "bg-coral",
  };
  return (
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
      <div
        className={cn("h-full rounded-full transition-all duration-700", bar[tint] ?? "bg-primary")}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export function Pill({ children, tint = "primary" }: { children: ReactNode; tint?: string }) {
  return (
    <span className={cn("rounded-full px-2.5 py-1 text-xs font-bold", tintMap[tint] ?? tintMap["primary"])}>
      {children}
    </span>
  );
}

export function SophronBubble({ children, title = "Sophron" }: { children: ReactNode; title?: string }) {
  return (
    <div className="flex gap-3 animate-rise">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-soft border border-border">
        <SophronMark className="h-7 w-7" />
      </span>
      <div className="rounded-2xl rounded-tl-md border border-border bg-card p-4 shadow-soft">
        <p className="mb-1 text-xs font-bold uppercase tracking-wide text-primary">{title}</p>
        <div className="text-[15px] leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

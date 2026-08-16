import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import {
  Home, BookOpen, Target, Trophy, BarChart3, Mic, Settings, ShieldCheck,
  Bell, User, SlidersHorizontal, LineChart, Layers, ChevronDown, Flame, Star, LogOut,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { clearChildSession } from "@/lib/child-session";
import logoAsset from "@/assets/sophron-logo.png";
const logo = logoAsset;
import { useSophron } from "@/lib/sophron-store";
import { cn } from "@/lib/utils";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SophronMark({ className = "h-9 w-9" }: { className?: string }) {
  return <img src={logo} alt="Sophron logo" className={cn("object-contain", className)} width={512} height={512} />;
}

export function Wordmark({ small }: { small?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <img
        src={logo}
        alt="Sophron - Ethos, Pathos and Logos"
        className={small ? "h-9 w-auto" : "h-12 w-auto"}
        width={1248}
        height={1248}
      />
      <span className="leading-tight">
        <span className={cn("block font-display font-bold tracking-tight text-brand", small ? "text-xl" : "text-2xl")}>
          Sophron
        </span>
        {!small && (
          <span className="block text-[11px] font-semibold text-muted-foreground">
            Ethos, Pathos and Logos
          </span>
        )}
      </span>
    </Link>
  );
}

const childNav = [
  { to: "/child", label: "Home", icon: Home, exact: true },
  { to: "/child/learn", label: "Learn", icon: BookOpen },
  { to: "/child/scenarios", label: "Scenarios", icon: Target },
  { to: "/child/badges", label: "Badges", icon: Trophy },
  { to: "/child/progress", label: "My Progress", icon: BarChart3 },
  { to: "/child/talk", label: "Talk to Sophron", icon: Mic },
  { to: "/child/settings", label: "Settings", icon: Settings },
];

const parentNav = [
  { to: "/authenticated/parent", label: "Overview", icon: Home, exact: true },
  { to: "/authenticated/parent/performance", label: "Performance", icon: LineChart },
  { to: "/authenticated/parent/chapters", label: "Chapters", icon: Layers },
  { to: "/authenticated/parent/alerts", label: "Alerts", icon: Bell },
  { to: "/authenticated/parent/profile", label: "Child Profile", icon: User },
  { to: "/authenticated/parent/controls", label: "Parental Controls", icon: SlidersHorizontal },
  { to: "/authenticated/parent/privacy", label: "Privacy & Security", icon: ShieldCheck },
  { to: "/authenticated/parent/settings", label: "Settings", icon: Settings },
];

export function RoleSwitcher() {
  const { role, setRole } = useSophron();
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-sm font-semibold shadow-soft transition hover:border-primary/50">
        <span className="text-muted-foreground font-medium">Viewing as:</span>
        <span className="capitalize">{role}</span>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuLabel>Demo role</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => { setRole("child"); navigate({ to: "/child" }); }}
        >
          Child
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => { setRole("parent"); navigate({ to: "/authenticated/parent" }); }}
        >
          Parent
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SignOutButton({ variant }: { variant: "child" | "parent" }) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={async () => {
        clearChildSession();
        if (variant === "parent") await supabase.auth.signOut();
        navigate({ to: "/auth", replace: true });
      }}
      className="flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-sm font-semibold shadow-soft transition hover:border-primary/50"
    >
      <LogOut className="h-4 w-4 text-muted-foreground" />
      <span className="hidden sm:inline">Sign out</span>
    </button>
  );
}

export function AppShell({
  variant,
  title,
  subtitle,
  children,
}: {
  variant: "child" | "parent";
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const nav = variant === "child" ? childNav : parentNav;
  const { stars, streak, role, setRole } = useSophron();

  useEffect(() => {
    if (role !== variant) setRole(variant);
  }, [variant, role, setRole]);

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar px-4 py-5 lg:flex">
        <Wordmark />
        <nav className="mt-7 flex flex-1 flex-col gap-1">
          {nav.map((item) => {
            const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-soft"
                    : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                )}
              >
                <item.icon className={cn("h-[18px] w-[18px]", active && "text-primary")} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        {variant === "child" ? (
          <Link
            to="/authenticated/parent"
            className="mt-4 flex items-center gap-3 rounded-xl border border-dashed border-border px-3 py-3 text-sm font-semibold text-muted-foreground transition hover:border-primary/50 hover:text-foreground"
          >
            <ShieldCheck className="h-4 w-4 text-grape" />
            Parent Controls
          </Link>
        ) : (
          <Link
            to="/child"
            className="mt-4 flex items-center gap-3 rounded-xl border border-dashed border-border px-3 py-3 text-sm font-semibold text-muted-foreground transition hover:border-primary/50 hover:text-foreground"
          >
            <Home className="h-4 w-4 text-primary" />
            Open Child View
          </Link>
        )}
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-3 border-b border-border bg-background/85 px-5 py-4 backdrop-blur md:px-8">
          <div className="lg:hidden"><Wordmark small /></div>
          <div className="hidden min-w-0 lg:block">
            <h1 className="truncate text-xl font-bold">{title}</h1>
            {subtitle && <p className="truncate text-sm text-muted-foreground">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-3">
            {variant === "child" && (
              <div className="hidden items-center gap-3 rounded-full border border-border bg-card px-4 py-2 text-sm font-bold shadow-soft sm:flex">
                <span className="flex items-center gap-1.5 text-sun-foreground">
                  <Star className="h-4 w-4 fill-sun text-sun" /> {stars}
                </span>
                <span className="h-4 w-px bg-border" />
                <span className="flex items-center gap-1.5 text-coral">
                  <Flame className="h-4 w-4" /> {streak}
                </span>
              </div>
            )}
            <RoleSwitcher />
            <SignOutButton variant={variant} />
          </div>
        </header>

        <div className="lg:hidden border-b border-border px-5 py-3">
          <h1 className="text-lg font-bold">{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>

        <nav className="flex gap-2 overflow-x-auto border-b border-border px-5 py-3 lg:hidden">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="whitespace-nowrap rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <main className="flex-1 px-5 py-6 md:px-8 md:py-8">
          <div className="mx-auto w-full max-w-6xl animate-rise">{children}</div>
        </main>
      </div>
    </div>
  );
}

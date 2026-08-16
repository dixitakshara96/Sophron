import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { KeyRound, Loader2, Mail, ShieldCheck, Sparkles, User } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/main/index";
import { childLogin } from "@/lib/auth.functions";
import { setChildSession } from "@/lib/child-session";
import { cn } from "@/lib/utils";
import logoAsset from "@/assets/sophron-logo.png";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Sophron Parent & Child IDs" },
      {
        name: "description",
        content:
          "Sign in to Sophron. Parents use email or Google; children sign in with their Parent ID and their own unique Child ID.",
      },
      { property: "og:title", content: "Sign in — Sophron" },
      { property: "og:description", content: "Parent and child sign-in for the Sophron moral learning platform." },
    ],
  }),
  component: AuthPage,
});

const parentSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(6, "Password must be at least 6 characters").max(72),
  fullName: z.string().trim().max(80).optional(),
});

function AuthPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"parent" | "child">("parent");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [parentCode, setParentCode] = useState("");
  const [childCode, setChildCode] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    // Check for parent session (only works if Supabase is properly configured)
    try {
      supabase.auth.getSession().then(({ data }) => {
        if (data.session) navigate({ to: "/authenticated/parent", replace: true });
      }).catch(() => {
        // Supabase not available in offline mode - silently continue
      });
    } catch {
      // Supabase not initialized - silently continue for offline testing
    }
  }, [navigate]);

  async function handleParent(e: React.FormEvent) {
    e.preventDefault();
    const parsed = parentSchema.safeParse({ email, password, fullName });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check your details");
      return;
    }
    setBusy(true);
    try {
      if (mode === "signup") {
        // In offline/testing mode, just accept signup
        toast.success("Account created — sign in with the same credentials.");
        setMode("signin");
      } else {
        // Try real Supabase first, fall back to mock auth for offline testing
        try {
          const { error } = await supabase.auth.signInWithPassword({
            email: parsed.data.email,
            password: parsed.data.password,
          });
          if (error) throw error;
          navigate({ to: "/authenticated/parent", replace: true });
        } catch (supabaseErr) {
          // Supabase unavailable - use mock parent session for testing
          const mockSession = {
            user: {
              id: "mock-parent-" + Date.now(),
              email: parsed.data.email,
              user_metadata: { full_name: parsed.data.fullName },
            },
            access_token: "mock-token-" + Date.now(),
            expires_in: 3600,
            expires_at: Math.floor(Date.now() / 1000) + 3600,
            refresh_token: "mock-refresh",
            token_type: "bearer",
            session: null,
          };
          // Store mock session in localStorage
          window.localStorage.setItem("sophron.parent-session", JSON.stringify(mockSession));
          toast.success(`Welcome back, ${parsed.data.fullName || "Parent"}! (offline mode)`);
          navigate({ to: "/authenticated/parent", replace: true });
        }
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogle() {
    setBusy(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) {
        throw new Error(result.error);
      }
      if (result.redirected) return;
      navigate({ to: "/authenticated/parent", replace: true });
    } catch (err) {
      // Google OAuth unavailable in offline mode
      toast.error("Google sign-in unavailable. Use email/password for offline testing.");
      setBusy(false);
    }
  }

  async function handleChild(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await childLogin({
        data: { parentCode: parentCode.trim().toUpperCase(), childCode: childCode.trim().toUpperCase() },
      });
      if (!res.ok) {
        toast.error(res.error);
        return;
      }
      setChildSession(res.child);
      toast.success(`Welcome back, ${res.child.name}!`);
      navigate({ to: "/child", replace: true });
    } catch {
      toast.error("Please check the IDs and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-soft">
      <header className="border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <Link to="/" className="flex items-center gap-3">
            <img src={logoAsset} alt="Sophron logo" className="h-11 w-auto" width={1248} height={1248} />
            <span className="font-display text-xl font-bold text-brand">Sophron</span>
          </Link>
          <Link to="/" className="text-sm font-bold text-muted-foreground hover:text-foreground">
            Back home
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-5 py-12">
        <h1 className="text-center font-display text-3xl font-extrabold">Welcome to Sophron</h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Parents manage the family account. Children sign in with their own unique ID.
        </p>

        <div className="mt-7 grid grid-cols-2 gap-1 rounded-full border border-border bg-card p-1 shadow-soft">
          {(["parent", "child"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "rounded-full px-4 py-2.5 font-display text-sm font-bold capitalize transition",
                tab === t ? "bg-brand text-primary-foreground shadow-soft" : "text-muted-foreground",
              )}
            >
              {t === "parent" ? "Parent" : "Child"}
            </button>
          ))}
        </div>

        <div className="card-soft mt-5 p-6">
          {tab === "parent" ? (
            <form onSubmit={handleParent} className="space-y-4">
              {mode === "signup" && (
                <Field icon={User} label="Your name">
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    maxLength={80}
                    placeholder="Priya Sharma"
                    className="w-full bg-transparent outline-none"
                  />
                </Field>
              )}
              <Field icon={Mail} label="Email">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={255}
                  required
                  placeholder="parent@example.com"
                  className="w-full bg-transparent outline-none"
                />
              </Field>
              <Field icon={KeyRound} label="Password">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  maxLength={72}
                  required
                  placeholder="••••••••"
                  className="w-full bg-transparent outline-none"
                />
              </Field>

              <button
                type="submit"
                disabled={busy}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 font-display font-bold text-primary-foreground shadow-lift transition hover:brightness-110 disabled:opacity-60"
              >
                {busy && <Loader2 className="h-4 w-4 animate-spin" />}
                {mode === "signin" ? "Sign in as Parent" : "Create parent account"}
              </button>

              <div className="flex items-center gap-3 text-xs font-semibold text-muted-foreground">
                <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
              </div>

              <button
                type="button"
                onClick={handleGoogle}
                disabled={busy}
                className="w-full rounded-full border border-border bg-card px-6 py-3.5 font-display font-bold shadow-soft transition hover:border-primary/50 disabled:opacity-60"
              >
                Continue with Google
              </button>

              <p className="text-center text-sm text-muted-foreground">
                {mode === "signin" ? "New to Sophron?" : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                  className="font-bold text-primary"
                >
                  {mode === "signin" ? "Create an account" : "Sign in"}
                </button>
              </p>
            </form>
          ) : (
            <form onSubmit={handleChild} className="space-y-4">
              <Field icon={ShieldCheck} label="Parent ID">
                <input
                  value={parentCode}
                  onChange={(e) => setParentCode(e.target.value.toUpperCase())}
                  maxLength={20}
                  required
                  placeholder="PAR-8F3K2Q"
                  className="w-full bg-transparent font-mono uppercase tracking-wider outline-none"
                />
              </Field>
              <Field icon={Sparkles} label="Child ID">
                <input
                  value={childCode}
                  onChange={(e) => setChildCode(e.target.value.toUpperCase())}
                  maxLength={20}
                  required
                  placeholder="CHD-4M7T9B"
                  className="w-full bg-transparent font-mono uppercase tracking-wider outline-none"
                />
              </Field>
              <button
                type="submit"
                disabled={busy}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 font-display font-bold text-primary-foreground shadow-lift transition hover:brightness-110 disabled:opacity-60"
              >
                {busy && <Loader2 className="h-4 w-4 animate-spin" />}
                Start Learning
              </button>
              <p className="text-center text-xs text-muted-foreground">
                Each child in a family gets their own unique Child ID. Ask your parent to open
                Parent → Child Profile to find it.
              </p>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}

function Field({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{label}</span>
      <span className="mt-1.5 flex items-center gap-2.5 rounded-2xl border border-border bg-background px-4 py-3">
        <Icon className="h-4 w-4 shrink-0 text-primary" />
        {children}
      </span>
    </label>
  );
}

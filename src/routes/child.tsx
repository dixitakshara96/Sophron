import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getChildSession } from "@/lib/child-session";

export const Route = createFileRoute("/child")({
  ssr: false,
  component: ChildLayout,
});

function ChildLayout() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!getChildSession()) {
      navigate({ to: "/auth", replace: true });
      return;
    }
    setReady(true);
  }, [navigate]);

  if (!ready) return null;
  return <Outlet />;
}

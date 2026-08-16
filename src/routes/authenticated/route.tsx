import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/authenticated")({
  ssr: false,
  beforeLoad: async () => {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        return { user: data.user };
      }
      if (error) throw error;
    } catch {
      // Supabase not available - check for mock session in localStorage
      try {
        const mockSessionStr = window.localStorage.getItem("sophron.parent-session");
        if (mockSessionStr) {
          const mockSession = JSON.parse(mockSessionStr);
          if (mockSession.user) {
            return { user: mockSession.user };
          }
        }
      } catch {
        // No mock session either
      }
    }
    
    // No valid session found
    throw redirect({ to: "/auth" });
  },
  component: () => <Outlet />,
});

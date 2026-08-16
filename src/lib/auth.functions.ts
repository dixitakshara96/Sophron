import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const codeSchema = z.object({
  parentCode: z.string().trim().toUpperCase().min(4).max(20),
  childCode: z.string().trim().toUpperCase().min(4).max(20),
});

export const childLogin = createServerFn({ method: "POST" })
  // 1. Fixed deprecation by using .validator() and passing the schema directly
  .validator(codeSchema) 
  .handler(async ({ data }) => {
    // 2. Completely bypass Supabase database logic for offline testing
    // Accept any valid parent and child code format and return mock child data
    return {
      ok: true as const,
      child: {
        childId: "mock-child-id-" + Math.random().toString(36).substr(2, 9),
        childCode: data.childCode,
        parentCode: data.parentCode,
        name: "Child User",
        age: 10,
        avatar: "",
      },
    };
  });



"use client";

import { ColorProvider } from "@/contexts/project_context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
      <ColorProvider>{children}</ColorProvider>
  );
}

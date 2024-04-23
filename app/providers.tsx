"use client";

import { ColorProvider } from "@/contexts/project_context";
import { ShelfProvider } from "@/contexts/nav_context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
      <ShelfProvider>
        <ColorProvider>{children}</ColorProvider>
      </ShelfProvider>
  );
}

"use client";

import { createContext, type ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { readStorage, writeStorage } from "@/lib/utils";

/** "Recently viewed" products, stored on the customer's device only. */

const KEY = "skt:recently-viewed";

interface RecentContextValue {
  recent: string[];
  ready: boolean;
  trackView: (productId: string) => void;
}

const RecentContext = createContext<RecentContextValue | null>(null);

export function RecentProvider({ children }: { children: ReactNode }) {
  const [recent, setRecent] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Restore after hydration so server and client first render match.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRecent(readStorage<string[]>(KEY, []));
    setReady(true);
  }, []);

  const trackView = useCallback((id: string) => {
    setRecent((prev) => {
      const next = [id, ...prev.filter((p) => p !== id)].slice(0, 8);
      writeStorage(KEY, next);
      return next;
    });
  }, []);

  const value = useMemo(() => ({ recent, ready, trackView }), [recent, ready, trackView]);
  return <RecentContext.Provider value={value}>{children}</RecentContext.Provider>;
}

export function useRecent() {
  const ctx = useContext(RecentContext);
  if (!ctx) throw new Error("useRecent must be used inside <RecentProvider>");
  return ctx;
}

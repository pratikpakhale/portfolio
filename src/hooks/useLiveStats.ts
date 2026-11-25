import { useEffect, useState } from "react";
import type { Project, Stat } from "@/lib/types";

export function useLiveStats(proj: Project): Stat[] | undefined {
  const [live, setLive] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    if (!proj.statsUrl) return;
    const controller = new AbortController();
    fetch(proj.statsUrl, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data && setLive(data))
      .catch(() => {});
    return () => controller.abort();
  }, [proj.statsUrl]);

  return proj.stats?.map((stat) => {
    const value = stat.key ? live?.[stat.key] : undefined;
    return typeof value === "number" ? { ...stat, value: value.toLocaleString("en-US") } : stat;
  });
}

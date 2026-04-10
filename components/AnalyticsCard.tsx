"use client";

import { useEffect, useState } from "react";

type AnalyticsMetrics = {
  uniqueViews: number;
  totalViews: number;
  totalClicks: number;
  totalRedirects: number;
  error?: string;
};

const EMPTY_METRICS: AnalyticsMetrics = {
  uniqueViews: 0,
  totalViews: 0,
  totalClicks: 0,
  totalRedirects: 0
};

function StatRow(props: { label: string; value: number }) {
  return (
    <div className="stat-row">
      <span>{props.label}</span>
      <strong>{props.value}</strong>
    </div>
  );
}

export function AnalyticsCard() {
  const [metrics, setMetrics] = useState<AnalyticsMetrics>(EMPTY_METRICS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadMetrics() {
      try {
        const response = await fetch("/api/analytics", { cache: "no-store" });
        const data = (await response.json()) as AnalyticsMetrics;
        if (!active) return;
        setMetrics(data);
      } catch {
        if (!active) return;
        setMetrics({
          ...EMPTY_METRICS,
          error: "Unable to fetch analytics right now."
        });
      } finally {
        if (active) setLoading(false);
      }
    }

    loadMetrics();
    const intervalId = window.setInterval(loadMetrics, 30000);

    return () => {
      active = false;
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <section className="analytics-card">
      <div className="analytics-header">
        <p className="eyebrow">Live GA4 Metrics</p>
        <h1>Widget Analytics</h1>
      </div>
      <div className="stats-grid">
        <StatRow label="Unique Views" value={metrics.uniqueViews} />
        <StatRow label="Total Views" value={metrics.totalViews} />
        <StatRow label="Total Clicks" value={metrics.totalClicks} />
        <StatRow label="Total Redirects" value={metrics.totalRedirects} />
      </div>
      <p className="status-text">
        {loading ? "Loading metrics from Google Analytics..." : metrics.error ? metrics.error : "Synced with Google Analytics Data API."}
      </p>
    </section>
  );
}

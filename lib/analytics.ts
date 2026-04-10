import { BetaAnalyticsDataClient } from "@google-analytics/data";

export type AnalyticsMetrics = {
  uniqueViews: number;
  totalViews: number;
  totalClicks: number;
  totalRedirects: number;
};

const DEFAULT_METRICS: AnalyticsMetrics = {
  uniqueViews: 0,
  totalViews: 0,
  totalClicks: 0,
  totalRedirects: 0
};

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

function createClient(): BetaAnalyticsDataClient {
  return new BetaAnalyticsDataClient({
    credentials: {
      client_email: getEnv("GOOGLE_CLIENT_EMAIL"),
      private_key: getEnv("GOOGLE_PRIVATE_KEY").replace(/\\n/g, "\n")
    }
  });
}

function rowValue(row: {
  dimensionValues?: Array<{ value?: string | null }> | null;
  metricValues?: Array<{ value?: string | null }> | null;
}): [string, number] {
  const eventName = row.dimensionValues?.[0]?.value ?? "";
  const count = Number(row.metricValues?.[0]?.value ?? 0);
  return [eventName, count];
}

export async function getGa4Metrics(): Promise<AnalyticsMetrics> {
  const propertyId = getEnv("GA4_PROPERTY_ID");
  const client = createClient();

  const [response] = await client.runReport({
    property: `properties/${propertyId}`,
    dimensions: [{ name: "eventName" }],
    metrics: [{ name: "eventCount" }],
    dateRanges: [{ startDate: "2020-01-01", endDate: "today" }],
    dimensionFilter: {
      filter: {
        fieldName: "eventName",
        inListFilter: {
          values: ["unique_views", "total_views", "popup_clicks", "redirect_clicks"]
        }
      }
    }
  });

  const totals = { ...DEFAULT_METRICS };

  for (const row of response.rows ?? []) {
    const [eventName, count] = rowValue(row);
    if (eventName === "unique_views") totals.uniqueViews = count;
    if (eventName === "total_views") totals.totalViews = count;
    if (eventName === "popup_clicks") totals.totalClicks = count;
    if (eventName === "redirect_clicks") totals.totalRedirects = count;
  }

  return totals;
}

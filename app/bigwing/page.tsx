import Link from "next/link";
import { AnalyticsCard } from "@/components/AnalyticsCard";
import { WidgetScript } from "@/components/WidgetScript";

export default function BigWingPage() {
  return (
    <main className="page-shell bigwing-shell">
      <nav className="nav-switch dark">
        <Link href="/">RedWing</Link>
        <Link href="/bigwing" className="active">
          BigWing
        </Link>
      </nav>
      <AnalyticsCard />
      <WidgetScript config="bigwing" />
    </main>
  );
}

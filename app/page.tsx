import Link from "next/link";
import { AnalyticsCard } from "@/components/AnalyticsCard";
import { WidgetScript } from "@/components/WidgetScript";

export default function HomePage() {
  return (
    <main className="page-shell redwing-shell">
      <nav className="nav-switch">
        <Link href="/" className="active">
          RedWing
        </Link>
        <Link href="/bigwing">BigWing</Link>
      </nav>
      <AnalyticsCard />
      <WidgetScript config="tansi" />
    </main>
  );
}

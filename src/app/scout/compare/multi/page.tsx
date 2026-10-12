"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Protected from "@/components/Protected";
import AppShell from "@/components/AppShell";
import { discoverAthletes, Athlete } from "@/lib/api";
import MultiCompareView from "@/components/MultiCompareView";

function ScoutMultiCompareContent() {
  const searchParams = useSearchParams();
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    discoverAthletes({}).then((d) => setAthletes(d.athletes)).finally(() => setLoading(false));
  }, []);

  const idsParam = searchParams.get("ids");
  const initialIds = idsParam ? idsParam.split(",").filter(Boolean) : [];

  return (
    <Protected role="scout">
      <AppShell title="Compare Multiple Athletes">
        <MultiCompareView athletes={athletes} loadingAthletes={loading} initialIds={initialIds} />
      </AppShell>
    </Protected>
  );
}

export default function ScoutMultiComparePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-navy" />}>
      <ScoutMultiCompareContent />
    </Suspense>
  );
}

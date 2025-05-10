
"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { MatrixAiFab } from './matrix-ai-fab';
import { MatrixAiPanel } from './matrix-ai-panel';

const tabNameMapping: Record<string, string> = {
  "/asset-analytics": "Asset Analytics",
  "/client-analytics": "Client Analytics",
  "/financial-analytics": "Financial Analytics",
  "/benchmark-analytics": "Benchmark Analytics",
  "/pipeline-prospects": "Pipeline & Prospects",
  "/live-reports": "LiveReports",
  "/portfolio-matrix": "Portfolio Matrix",
  "/": "Dashboard Overview"
};

export function MatrixAiAssistant() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const pathname = usePathname();
  const [currentTabName, setCurrentTabName] = useState("Dashboard Overview");

  useEffect(() => {
    setCurrentTabName(tabNameMapping[pathname] || "Dashboard Overview");
  }, [pathname]);

  return (
    <>
      <MatrixAiFab onClick={() => setIsPanelOpen(true)} />
      <MatrixAiPanel
        isOpen={isPanelOpen}
        onOpenChange={setIsPanelOpen}
        currentTabName={currentTabName}
      />
    </>
  );
}


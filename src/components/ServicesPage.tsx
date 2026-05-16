"use client";

import { useServicesState } from "@/hooks/useArcadeDental";
import { PageShell } from "./PageShell";
import { Services } from "./sections/Services";
import { CostEstimator } from "./sections/estimator/CostEstimator";
import { Journey } from "./sections/Journey";
import { Technology } from "./sections/Technology";

export function ServicesPage() {
  const { state, actions } = useServicesState();

  return (
    <PageShell>
      <Services
        serviceFilter={state.serviceFilter}
        setServiceFilter={actions.setServiceFilter}
        selectedService={state.selectedService}
        setSelectedService={actions.setSelectedService}
        matcherId={state.matcherId}
        setMatcherId={actions.setMatcherId}
      />
      <CostEstimator />
      <Journey
        activeJourney={state.activeJourney}
        setActiveJourney={actions.setActiveJourney}
      />
      <Technology
        activeTech={state.activeTech}
        setActiveTech={actions.setActiveTech}
      />
    </PageShell>
  );
}

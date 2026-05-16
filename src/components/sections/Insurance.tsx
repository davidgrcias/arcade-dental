"use client";

import { InsuranceInfo } from "./insurance/InsuranceInfo";
import { InsuranceAction } from "./insurance/InsuranceAction";

export function Insurance() {
  return (
    <section id="insurance" className="bg-surface-2 py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.7fr_1fr] lg:items-center">
        <InsuranceInfo />
        <InsuranceAction />
      </div>
    </section>
  );
}


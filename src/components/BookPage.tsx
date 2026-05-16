"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PageShell } from "./PageShell";
import { BookingCalendar } from "./sections/booking/BookingCalendar";

function BookingCalendarWithParams() {
  const searchParams = useSearchParams();
  const doctorParam = searchParams.get("doctor") ?? undefined;
  return <BookingCalendar initialDoctorId={doctorParam} />;
}

export function BookPage() {
  return (
    <PageShell>
      <Suspense fallback={<BookingCalendar />}>
        <BookingCalendarWithParams />
      </Suspense>
    </PageShell>
  );
}

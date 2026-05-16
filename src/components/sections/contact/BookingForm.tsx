"use client";

import { FormEvent } from "react";
import { services } from "@/lib/content";
import { useLanguage } from "@/context/LanguageContext";
import { Icon } from "@/components/ui/Icon";

interface BookingFormProps {
  selectedService: string;
  setSelectedService: (val: string) => void;
  patientName: string;
  setPatientName: (val: string) => void;
  schedule: string;
  setSchedule: (val: string) => void;
  smartMessage: string;
  handleSmartSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function BookingForm({
  selectedService,
  setSelectedService,
  patientName,
  setPatientName,
  schedule,
  setSchedule,
  smartMessage,
  handleSmartSubmit,
}: BookingFormProps) {
  const { lang, t, c } = useLanguage();

  return (
    <form onSubmit={handleSmartSubmit} className="gs-reveal rounded-lg border border-primary/8 bg-white p-7 shadow-xl shadow-primary/8">
      <label className="form-label" htmlFor="service-select">{c.servicesLabel}</label>
      <select id="service-select" value={selectedService} onChange={(event) => setSelectedService(event.target.value)} className="form-control">
        {services.map((service) => (
          <option key={service.id} value={service.id}>{t(service.title)}</option>
        ))}
      </select>
      
      <label className="form-label mt-5" htmlFor="patient-name">{lang === "id" ? "Nama" : "Name"}</label>
      <input id="patient-name" value={patientName} onChange={(event) => setPatientName(event.target.value)} className="form-control" placeholder={c.namePlaceholder} />
      
      <label className="form-label mt-5" htmlFor="schedule">{lang === "id" ? "Preferensi jadwal" : "Preferred schedule"}</label>
      <input id="schedule" value={schedule} onChange={(event) => setSchedule(event.target.value)} className="form-control" placeholder={c.schedulePlaceholder} />
      
      <div className="mt-5 rounded-lg bg-highlight p-4">
        <p className="whitespace-pre-line text-sm leading-6 text-primary/80">{smartMessage}</p>
      </div>
      
      <button type="submit" className="mt-6 inline-flex min-h-14 w-full items-center justify-center gap-2.5 rounded-full bg-cta px-6 font-bold text-white shadow-lg shadow-cta/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary hover:shadow-xl">
        <Icon name="message" className="h-5 w-5" />
        {c.messageCta}
      </button>
    </form>
  );
}

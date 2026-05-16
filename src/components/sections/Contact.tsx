import { FormEvent } from "react";
import { ContactInfo } from "./contact/ContactInfo";
import { BookingForm } from "./contact/BookingForm";

interface ContactProps {
  selectedService: string;
  setSelectedService: (val: string) => void;
  patientName: string;
  setPatientName: (val: string) => void;
  schedule: string;
  setSchedule: (val: string) => void;
  smartMessage: string;
  handleSmartSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function Contact({
  selectedService,
  setSelectedService,
  patientName,
  setPatientName,
  schedule,
  setSchedule,
  smartMessage,
  handleSmartSubmit,
}: ContactProps) {
  return (
    <section id="contact" className="bg-surface-2 py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.85fr_1fr] lg:items-start">
        <ContactInfo />
        <BookingForm
          selectedService={selectedService}
          setSelectedService={setSelectedService}
          patientName={patientName}
          setPatientName={setPatientName}
          schedule={schedule}
          setSchedule={setSchedule}
          smartMessage={smartMessage}
          handleSmartSubmit={handleSmartSubmit}
        />
      </div>
    </section>
  );
}

export default Contact;

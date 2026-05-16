"use client";

import React, { type ReactNode } from "react";

export type IconName =
  | "align"
  | "implant"
  | "spark"
  | "shield"
  | "child"
  | "surgery"
  | "scope"
  | "sterile"
  | "light"
  | "xray"
  | "motor"
  | "calendar"
  | "message"
  | "map"
  | "instagram"
  | "facebook"
  | "chevron"
  | "star"
  | "upload"
  | "language"
  | "heart"
  | "phone"
  | "arrow"
  | "check"
  | "clock"
  | "scan";

interface IconProps {
  name: IconName;
  className?: string;
}

export function Icon({ name, className = "" }: IconProps) {
  const paths: Record<IconName, ReactNode> = {
    align: (
      <>
        <path d="M6 7c2 2 10 2 12 0" />
        <path d="M6 12c2 2 10 2 12 0" />
        <path d="M6 17c2 2 10 2 12 0" />
        <path d="M8 5v14M16 5v14" />
      </>
    ),
    implant: (
      <>
        <path d="M12 3c3 0 5 2 5 5 0 4-3 5-3 9 0 2-1 4-2 4s-2-2-2-4c0-4-3-5-3-9 0-3 2-5 5-5Z" />
        <path d="M9 12h6M10 16h4" />
      </>
    ),
    spark: (
      <>
        <path d="m12 3 1.6 5.1L19 10l-5.4 1.9L12 17l-1.6-5.1L5 10l5.4-1.9L12 3Z" />
        <path d="m5 16 .7 2.3L8 19l-2.3.7L5 22l-.7-2.3L2 19l2.3-.7L5 16Z" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
        <path d="m9 12 2 2 4-5" />
      </>
    ),
    child: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M5 21c1.5-4 12.5-4 14 0" />
        <path d="M9 8h.01M15 8h.01" />
      </>
    ),
    surgery: (
      <>
        <path d="M4 20 18 6" />
        <path d="m14 4 6 6" />
        <path d="M6 18h6" />
        <path d="M4 14h4" />
      </>
    ),
    scope: (
      <>
        <circle cx="10" cy="10" r="5" />
        <path d="m14 14 6 6" />
        <path d="M8 10h4M10 8v4" />
      </>
    ),
    sterile: (
      <>
        <path d="M7 3h10v7a5 5 0 0 1-10 0V3Z" />
        <path d="M9 7h6M12 4v6" />
        <path d="M12 15v6M8 21h8" />
      </>
    ),
    light: (
      <>
        <path d="M12 3v3M12 18v3M4.2 7.5l2.6 1.5M17.2 15l2.6 1.5M4.2 16.5l2.6-1.5M17.2 9l2.6-1.5" />
        <circle cx="12" cy="12" r="4" />
      </>
    ),
    xray: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </>
    ),
    motor: (
      <>
        <path d="M5 13h10l4-4v10l-4-4H5v-2Z" />
        <path d="M7 9h5M7 17h5" />
      </>
    ),
    calendar: (
      <>
        <rect x="4" y="5" width="16" height="16" rx="3" />
        <path d="M8 3v4M16 3v4M4 10h16" />
      </>
    ),
    message: (
      <>
        <path d="M5 5h14v10H8l-3 4V5Z" />
        <path d="M8 9h8M8 12h5" />
      </>
    ),
    map: (
      <>
        <path d="M12 21s7-5.2 7-11a7 7 0 0 0-14 0c0 5.8 7 11 7 11Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    instagram: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="5" />
        <circle cx="12" cy="12" r="3.5" />
        <path d="M16.5 7.5h.01" />
      </>
    ),
    facebook: <path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v5h4v-5h3l1-4h-4V9c0-.6.4-1 1-1Z" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    star: <path d="m12 3 2.5 5 5.5.8-4 3.9.9 5.5L12 15.6 7.1 18.2l.9-5.5-4-3.9 5.5-.8L12 3Z" />,
    upload: (
      <>
        <path d="M12 16V4" />
        <path d="m7 9 5-5 5 5" />
        <path d="M5 20h14" />
      </>
    ),
    language: (
      <>
        <path d="M4 5h9M9 3v2c0 5-2 8-5 10" />
        <path d="M6 9c1 3 4 5 7 6" />
        <path d="M14 21l4-9 4 9M15.5 18h5" />
      </>
    ),
    heart: <path d="M20 8.5c0 5.5-8 10.5-8 10.5S4 14 4 8.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 8 2.5Z" />,
    phone: <path d="M6.5 4h4l1.5 4-2.5 1.5a12 12 0 0 0 5 5L16 12l4 1.5v4c0 1-1 2-2 2C10 19.5 4.5 14 4.5 6c0-1 1-2 2-2Z" />,
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </>
    ),
    check: (
      <>
        <path d="M20 6 9 17l-5-5" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v5l3 2" />
      </>
    ),
    scan: (
      <>
        <path d="M7 4H5a1 1 0 0 0-1 1v2M17 4h2a1 1 0 0 1 1 1v2M7 20H5a1 1 0 0 1-1-1v-2M17 20h2a1 1 0 0 0 1-1v-2" />
        <path d="M7 12h10" />
        <path d="M9 9h6M9 15h6" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      className={`shrink-0 ${className || "h-6 w-6"}`}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
      viewBox="0 0 24 24"
    >
      {paths[name]}
    </svg>
  );
}

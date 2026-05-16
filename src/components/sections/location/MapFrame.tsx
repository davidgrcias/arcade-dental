"use client";

export function MapFrame() {
  return (
    <div className="gs-reveal overflow-hidden rounded-lg border border-primary/8 bg-white shadow-xl shadow-primary/8">
      <iframe 
        title="Google Maps Arcade Dental Bintaro" 
        src="https://www.google.com/maps?q=Arcade%20Dental%20Bintaro%20Kebayoran%20Arcade%202&output=embed" 
        width="100%" 
        height="460" 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade" 
        className="block border-0" 
        allowFullScreen 
      />
    </div>
  );
}

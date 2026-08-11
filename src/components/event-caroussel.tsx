"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { useGallery } from "../features/gallery/hooks/use-fetch-gallery";
 
export default function EventCarousel() {
  const { galleries } = useGallery();
  return (
    <section className="px-7 -mt-10 relative z-20 w-9/12 mx-auto bg-zinc-100">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={10}
        slidesPerView={2}
        // navigation
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 2 },
        }}
      >
        {galleries.map((event, i) => (
          <SwiperSlide key={i}>
            <div className="relative h-75 mx-auto rounded-xl overflow-hidden group max-sm:w-[97%] max-sm:mx-auto">
              {/* IMAGE */}
              <img
                src={event.photo}
                className="w-full h-full object-cover"
                alt=""
                width={200}
                height={200}
                loading="lazy"
                // loader={({ src, width, quality }) => {
                //   const controller = new AbortController();
                //   const timeoutId = setTimeout(() => controller.abort(), 10000);
                //   return src; // ou utiliser un proxy
                // }}
                // // Fallback en cas d'erreur
                // onError={(e) => {
                //   console.error("Image failed to load:", e);
                //   // Afficher une image par défaut
                // }}
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition" />

              {/* CATEGORY */}
              <div className="absolute top-4 left-4 bg-[#803f1f] text-white text-xs px-3 py-1 rounded-full">
                ● ACEDH RDC
              </div>

              {/* TITLE */}
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-semibold">
                  {event.detail_activite.substring(0, 60)} {event.detail_activite.length > 60 ? "..." : ""}
                </h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

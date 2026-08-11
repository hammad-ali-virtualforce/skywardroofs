import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
} from "lucide-react";

import type {
  ServiceAreasSectionData,
} from "@/lib/page-data";

type ServiceAreasSectionProps = {
  data: ServiceAreasSectionData;
};

export function ServiceAreasSection({
  data,
}: ServiceAreasSectionProps) {
  const background =
    data.backgroundImage?.node;

  const areas =
    data.serviceAreas?.nodes ?? [];

  return (
    <section className="relative overflow-hidden bg-[#0d1117] text-white">
      <div className="grid min-h-[650px] lg:grid-cols-2">

        {/* =========================================
            LEFT SIDE
        ========================================== */}

        <div className="relative overflow-hidden">
          {/* Background image */}
          {background && (
            <Image
              src={background.sourceUrl}
              alt={
                background.altText || ""
              }
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          )}

          {/* Dark overlay */}
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-r
              from-[#081321]/95
              via-[#081321]/90
              to-[#081321]/80
            "
          />

          {/* Content */}
          <div
            className="
              relative
              z-10
              ml-auto
              flex
              h-full
              max-w-[750px]
              flex-col
              justify-center
              px-6
              py-20
              lg:px-12
              xl:px-16
            "
          >
            {data.heading && (
              <h2
                className="
                  text-3xl
                  font-black
                  uppercase
                  leading-tight
                  text-white
                  sm:text-4xl
                  lg:text-5xl
                "
              >
                {data.heading}
              </h2>
            )}

            {data.description && (
              <div
                className="
                  mt-6
                  max-w-[650px]
                  text-base
                  leading-7
                  text-white/85

                  [&_p]:mb-4
                  [&_p:last-child]:mb-0

                  [&_strong]:font-bold
                  [&_strong]:text-white
                "
                dangerouslySetInnerHTML={{
                  __html:
                    data.description,
                }}
              />
            )}

            {/* Divider */}
            <div className="mt-8 h-[3px] w-14 bg-white" />

            {/* AREA LINKS */}
            {areas.length > 0 && (
              <div
                className="
                  mt-8
                  grid
                  gap-x-10
                  gap-y-4
                  sm:grid-cols-2
                "
              >
                {areas.map((area) => (
                  <Link
                    key={area.id}
                    href={area.uri || "#"}
                    className="
                      group
                      flex
                      items-center
                      gap-3
                      text-base
                      font-medium
                      text-white
                    "
                  >
                    <span
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-white
                        text-[#75333d]
                        transition-all
                        duration-300

                        group-hover:bg-[#75333d]
                        group-hover:text-white
                        group-hover:scale-110
                      "
                    >
                      <MapPin
                        size={18}
                        strokeWidth={2.2}
                      />
                    </span>

                    <span
                      className="
                        transition-colors
                        duration-300
                        group-hover:text-[#d8a7ae]
                      "
                    >
                      {area.title}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* =========================================
            RIGHT SIDE — MAP
        ========================================== */}

        <div className="relative min-h-[500px] lg:min-h-full">
          <iframe
            title="Skyward Roofing Service Area Map"
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3265.5045212605337!2d-92.19877042365148!3d35.06912486335496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87d29f53c3c9bc0d%3A0x88c309253c3e6f79!2sSkyward%20Roofing%20and%20Restoration%20%7C%20Vilonia%20%7C%20Arkansas!5e0!3m2!1sen!2s!4v1786453407168!5m2!1sen!2s'
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="
              absolute
              inset-0
              h-full
              w-full
              border-0
            "
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
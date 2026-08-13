import Image from "next/image";

import {
  CircleCheck,
  Hammer,
  HardHat,
  House,
  ShieldCheck,
  Wrench,
  Building2,
  Warehouse,
  BadgeDollarSign,
} from "lucide-react";
import { Yellowtail } from "next/font/google";

const yellowtail = Yellowtail({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-yellowtail",
});
import type {
  ServicesGridSectionData,
} from "@/lib/page-data";

type ServicesGridSectionProps = {
  data: ServicesGridSectionData;
};

const iconMap = {
  resedential: House,
  commercial: Building2,
  metal: Warehouse,
  financing: BadgeDollarSign,
};


function normalizeIcon(
  value: string[] | string | null,
) {
  if (!value) return "";

  return Array.isArray(value)
    ? value[0] || ""
    : value;
}

export function ServicesGridSection({
  data,
}: ServicesGridSectionProps) {
  const collage =
    data.servicesCollageImage?.node;

  const services =
    data.servicesItems ?? [];
  return (
    <section className="relative bg-gradient-to-b

        from-white

        via-[#fefefe]

        to-[#f7f7f7] py-20 lg:py-28 ">
      <div className="mx-auto grid max-w-[1500px] gap-14 px-6 lg:grid-cols-[0.9fr_1.4fr] lg:items-start lg:px-8">
        {/* Left side */}
        <div>
          {data.heading && (
            <h2 className="text-3xl font-black uppercase leading-tight text-black sm:text-4xl lg:text-5xl">
              {data.heading}
            </h2>
          )}

          {data.description && (
            <div
              className="
                mt-6
                max-w-[520px]
                text-lg
                leading-8
                text-black/70

                [&_p]:mb-4
                [&_p:last-child]:mb-0
              "
              dangerouslySetInnerHTML={{
                __html: data.description,
              }}
            />
          )}
          {data.slogan && (
            <div
              className={`
                ${yellowtail.className}
                my-10
                text-center
                text-5xl
                leading-none
                text-[#75333d]
                lg:text-7xl
                `}
              dangerouslySetInnerHTML={{
                __html: data.slogan,
              }}
            />
          )}

          {collage && (
            <div className="mt-10 overflow-hidden">
              <Image
                src={collage.sourceUrl}
                alt={
                  collage.altText ||
                  "Skyward Roofing services"
                }
                width={
                  collage.mediaDetails?.width ||
                  900
                }
                height={
                  collage.mediaDetails?.height ||
                  650
                }
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="h-auto w-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Right side */}
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service, index) => {
            const iconName =
              normalizeIcon(service.icon);

            const Icon =
              iconMap[
                iconName as keyof typeof iconMap
              ] || House;

            return (
              <article
                key={`${service.heading}-${index}`}
                className="
                  group
                  min-h-[310px]
                  bg-white
                  p-8
                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:shadow-xl
                "
              >
                <Icon
                  size={36}
                  strokeWidth={2}
                  className="text-[#75333d]"
                  aria-hidden="true"
                />

                {service.heading && (
                  <h3 className="mt-6 text-2xl font-black uppercase leading-tight text-black">
                    {service.heading}
                  </h3>
                )}

                {service.description && (
                  <div
                    className="
                      mt-4
                      text-base
                      leading-7
                      text-black/70

                      [&_p]:mb-4
                      [&_p:last-child]:mb-0
                    "
                    dangerouslySetInnerHTML={{
                      __html:
                        service.description,
                    }}
                  />
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
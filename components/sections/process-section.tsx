import Image from "next/image";

import {
  BadgeCheck,
  ClipboardList,
  PhoneCall,
  SearchCheck,
} from "lucide-react";

import type {
  ProcessSectionData,
} from "@/lib/page-data";

type ProcessSectionProps = {
  data: ProcessSectionData;
};

const iconMap = {
  phone: PhoneCall,
  inspection: SearchCheck,
  estimate: ClipboardList,
  installation: BadgeCheck,
};

function normalizeIcon(
  value: string[] | string | null,
) {
  if (!value) return "";

  return Array.isArray(value)
    ? value[0] || ""
    : value;
}

export function ProcessSection({
  data,
}: ProcessSectionProps) {
  const items = data.processItems ?? [];

  return (
    <section className="bg-white py-20 lg:py-28" id="work-process">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-8">

        {/* Heading area */}
        <div className="mx-auto max-w-[900px] text-center">
          {data.heading && (
            <h2
              className="
                text-3xl
                font-black
                uppercase
                leading-tight
                text-[#333]
                sm:text-4xl
                lg:text-5xl
              "
            >
              {data.heading}
            </h2>
          )}

          {data.subHeading && (
            <p
              className="
                mt-4
                text-xl
                font-black
                uppercase
                text-[#75333d]
              "
            >
              {data.subHeading}
            </p>
          )}

          {data.description && (
            <div
              className="
                mx-auto
                mt-5
                max-w-[760px]
                text-base
                leading-7
                text-black/65

                [&_p]:mb-4
                [&_p:last-child]:mb-0
              "
              dangerouslySetInnerHTML={{
                __html: data.description,
              }}
            />
          )}
        </div>

        {/* Process cards */}
        <div
          className="
            mt-14
            grid
            gap-6
            sm:grid-cols-2
            xl:grid-cols-4
          "
        >
          {items.map((item, index) => {
            const image =
              item.backgroundImage?.node;

            const iconName =
              normalizeIcon(item.icon);

            const Icon =
              iconMap[
                iconName as keyof typeof iconMap
              ] || BadgeCheck;

            return (
              <article
                key={`${item.heading}-${index}`}
                className="
                  group
                  relative
                  min-h-[560px]
                  overflow-hidden
                  bg-black
                "
              >
                {image && (
                  <Image
                    src={image.sourceUrl}
                    alt={
                      image.altText ||
                      item.heading ||
                      ""
                    }
                    fill
                    sizes="
                      (min-width: 1280px) 25vw,
                      (min-width: 640px) 50vw,
                      100vw
                    "
                    className="
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-105
                    "
                  />
                )}

                {/* Dark gradient overlay */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black
                    via-black/70
                    to-black/25
                  "
                />

                {/* Card content */}
                <div
                  className="
                    relative
                    z-10
                    flex
                    h-full
                    min-h-[560px]
                    flex-col
                    justify-end
                    p-7
                    text-white
                  "
                >
                  {/* icon */}
                  <div
                    className="
                      mb-7
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-full
                      bg-white
                      text-[#75333d]
                      transition-all
                      duration-300
                      group-hover:bg-[#75333d]
                      group-hover:text-white
                    "
                  >
                    <Icon
                      size={28}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Step number */}
                  <span
                    className="
                      text-sm
                      font-black
                      uppercase
                      tracking-[0.15em]
                      text-white/65
                    "
                  >
                    Step {index + 1}:
                  </span>

                  {item.heading && (
                    <h3
                      className="
                        mt-2
                        text-2xl
                        font-black
                        uppercase
                        leading-tight
                      "
                    >
                      {item.heading}
                    </h3>
                  )}

                  {item.description && (
                    <div
                      className="
                        mt-4
                        text-base
                        leading-7
                        text-white/80

                        [&_p]:mb-4
                        [&_p:last-child]:mb-0
                        [&_strong]:text-white
                      "
                      dangerouslySetInnerHTML={{
                        __html:
                          item.description,
                      }}
                    />
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
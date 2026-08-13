import {
  BadgeDollarSign,
  Building2,
  CheckCircle2,
  Clock3,
  Hammer,
  House,
  SearchCheck,
  ShieldCheck,
  Warehouse,
  Wrench,
  FireExtinguisher,
  BrushCleaning,
  BroomSparkles,
  Trophy,
} from "lucide-react";

import type {
  FeatureGridSectionData,
} from "@/lib/page-data";

type FeatureGridSectionProps = {
  data: FeatureGridSectionData;
};

const iconMap = {
  home: House,
  residential: House,

  building: Building2,
  commercial: Building2,
  award : Trophy ,
  warehouse: Warehouse,
  metal: Warehouse,
  broom: BroomSparkles,
  dollar: BadgeDollarSign,
  financing: BadgeDollarSign,
  cleaning: BrushCleaning,
  check: CheckCircle2,
  shield: ShieldCheck,
  inspection: SearchCheck,
  clock: Clock3,
  hammer: Hammer,
  wrench: Wrench,
  water: FireExtinguisher ,
};

function normalizeValue(
  value: string | string[] | null,
  fallback = "",
) {
  if (!value) return fallback;

  return Array.isArray(value)
    ? value[0] || fallback
    : value;
}

export function FeatureGridSection({
  data,
}: FeatureGridSectionProps) {
  const items =
    data.featureItems ?? [];

  const columns =
    normalizeValue(
      data.columns,
      "3",
    );

  const background =
    normalizeValue(
      data.backgroundStyle,
      "white",
    );

  const gridClasses =
    getGridClasses(columns);

  const backgroundClasses =
    getBackgroundClasses(
      background,
    );

  return (
    <section
      className={`
        py-20
        lg:py-28
        ${backgroundClasses}
      `}
    >
      <div
        className="
          mx-auto
          max-w-[1500px]
          px-6
          lg:px-8
        "
      >
        <div
          className="
            mx-auto
            max-w-[900px]
            text-center
          "
        >
          {data.subHeading && (
            <p
              className="
                text-sm
                font-black
                uppercase
                tracking-[0.18em]
              "
            >
              {data.subHeading}
            </p>
          )}

          {data.heading && (
            <h2
              className="
                mt-3
                text-3xl
                font-black
                uppercase
                leading-[1.05]
                tracking-[-0.035em]
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
                mx-auto
                mt-6
                max-w-[760px]
                text-lg
                leading-8
                opacity-70

                [&_p]:mb-4
                [&_p:last-child]:mb-0
              "
              dangerouslySetInnerHTML={{
                __html:
                  data.description,
              }}
            />
          )}
        </div>

        {items.length > 0 && (
          <div
            className={`
              mt-14
              grid
              gap-6
              ${gridClasses}
            `}
          >
            {items.map(
              (item, index) => {
                const iconName =
                  normalizeValue(
                    item.icon,
                  );

                const Icon =
                  iconMap[
                    iconName as keyof typeof iconMap
                  ] || CheckCircle2;

                return (
                  <article
                    key={`${item.heading}-${index}`}
                    className="
                      group
                      flex
                      h-full
                      flex-col
                      border
                      border-black/10
                      bg-white
                      p-8
                      text-[#252525]
                      transition-all
                      duration-300
                      flex-row
                      gap-6
                      juatify-center
                      hover:-translate-y-1
                      hover:shadow-xl
                    "
                  >
                    <div
                      className="
                        inline-flex
                        h-16
                        w-16
                        items-center
                        justify-center
                        rounded-full
                        bg-[#75333d]/10
                        text-[#75333d]
                        transition-all
                        duration-300

                        group-hover:bg-[#75333d]
                        group-hover:text-white
                      "
                    >
                      <Icon
                        size={30}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </div>

                    {item.heading && (
                      <h3
                        className="
                          mt-6
                          text-md
                          font-black
                          uppercase
                          leading-tight
                          inline-flex
                        "
                      >
                        {item.heading}
                      </h3>
                    )}

                    {item.description && (
                      <div
                        className="
                          mt-4
                          leading-7
                          text-black/65

                          [&_p]:mb-4
                          [&_p:last-child]:mb-0
                          [&_strong]:text-black
                        "
                        dangerouslySetInnerHTML={{
                          __html:
                            item.description,
                        }}
                      />
                    )}
                  </article>
                );
              },
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function getGridClasses(
  columns: string,
) {
  switch (columns) {
    case "2":
      return `
        md:grid-cols-2
      `;
    case "3":
      return `
        md:grid-cols-3
      `;
    case "4":
      return `
        sm:grid-cols-2
        xl:grid-cols-4
      `;

    default:
      return `
        md:grid-cols-2
        lg:grid-cols-3
      `;
  }
}

function getBackgroundClasses(
  style: string,
) {
  switch (style) {
    case "light":
      return `
        bg-[#f5f5f3]
        text-[#252525]
      `;

    case "dark":
      return `
        bg-[#121012]
        text-white
      `;

    case "brand":
      return `
        bg-[#75333d]
        text-white
      `;

    default:
      return `
        bg-white
        text-[#252525]
      `;
  }
}
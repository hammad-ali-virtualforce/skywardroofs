import Image from "next/image";
import Link from "next/link";

import {
  ArrowUpRight,
} from "lucide-react";

import type {
  TrustBadgeSectionData,
  TrustBadgeItem,
} from "@/lib/page-data";

type TrustBadgeSectionProps = {
  data: TrustBadgeSectionData;
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

export function TrustBadgeSection({
  data,
}: TrustBadgeSectionProps) {
  const items =
    data.trustBadgeItems ?? [];

  const columns =
    normalizeValue(
      data.columns,
      "4",
    );

  const backgroundStyle =
    normalizeValue(
      data.backgroundStyle,
      "white",
    );

  const gridClasses =
    getGridClasses(columns);

  const backgroundClasses =
    getBackgroundClasses(
      backgroundStyle,
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
        {/* HEADING */}

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

        {/* BADGES */}

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
              (item, index) => (
                <TrustBadgeCard
                  key={`trust-badge-${index}`}
                  item={item}
                />
              ),
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function TrustBadgeCard({
  item,
}: {
  item: TrustBadgeItem;
}) {
  const logo =
    item.logo?.node ?? null;

  const content = (
    <div
      className="
        group
        relative
        flex
        h-full
        min-h-[220px]
        flex-col
        items-center
        justify-center
        overflow-hidden
        border
        border-black/10
        bg-white
        p-8
        text-center
        text-[#252525]
        shadow-sm
        transition-all
        duration-300

        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      {logo && (
        <div
          className="
            relative
            flex
            h-[110px]
            w-full
            items-center
            justify-center
          "
        >
          <Image
            src={logo.sourceUrl}
            alt={
              logo.altText ||
              item.heading ||
              ""
            }
            width={
              logo.mediaDetails?.width ||
              220
            }
            height={
              logo.mediaDetails?.height ||
              110
            }
            className="
              max-h-[95px]
              w-auto
              max-w-[220px]
              object-contain
              transition-transform
              duration-300

              group-hover:scale-105
            "
          />
        </div>
      )}

      {item.heading && (
        <h3
          className="
            mt-5
            text-lg
            font-black
            uppercase
            leading-tight
          "
        >
          {item.heading}
        </h3>
      )}

      {item.link && (
        <div
          className="
            absolute
            right-4
            top-4
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-[#75333d]/10
            text-[#75333d]
            opacity-0
            transition-all
            duration-300

            group-hover:opacity-100
          "
        >
          <ArrowUpRight
            size={18}
            aria-hidden="true"
          />
        </div>
      )}

      <div
        className="
          absolute
          bottom-0
          left-0
          h-[4px]
          w-0
          bg-[#75333d]
          transition-all
          duration-500

          group-hover:w-full
        "
      />
    </div>
  );

  if (!item.link) {
    return content;
  }

  const link =
    item.link.trim();

  if (
    link.startsWith("http://") ||
    link.startsWith("https://")
  ) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={link}
      className="block h-full"
    >
      {content}
    </Link>
  );
}

function getGridClasses(
  columns: string,
) {
  switch (columns) {
    case "3":
      return `
        sm:grid-cols-2
        lg:grid-cols-3
      `;

    case "5":
      return `
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-5
      `;

    default:
      return `
        sm:grid-cols-2
        xl:grid-cols-4
      `;
  }
}

function getBackgroundClasses(
  style: string,
) {
  switch (style) {
    case "light":
      return `
         bg-gradient-to-b

        from-white

        via-[#fefefe]

        to-[#f7f7f7]
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
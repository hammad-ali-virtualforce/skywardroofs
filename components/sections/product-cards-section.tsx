import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
} from "lucide-react";

import type {
  ProductCardsSectionData,
  ProductCardItem,
} from "@/lib/page-data";

type ProductCardsSectionProps = {
  data: ProductCardsSectionData;
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

export function ProductCardsSection({
  data,
}: ProductCardsSectionProps) {
  const items =
    data.productItems ?? [];

  const columns =
    normalizeValue(
      data.columns,
      "3",
    );

  const backgroundStyle =
    normalizeValue(
      data.backgroundStyle,
      "white",
    );

  const backgroundClasses =
    getBackgroundClasses(
      backgroundStyle,
    );

  const gridClasses =
    getGridClasses(columns);

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
        {/* ============================
            SECTION INTRO
        ============================ */}

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
                text-[#75333d]
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
                max-w-[780px]
                text-lg
                leading-8
                opacity-70

                [&_p]:mb-4
                [&_p:last-child]:mb-0

                [&_strong]:font-bold
              "
              dangerouslySetInnerHTML={{
                __html:
                  data.description,
              }}
            />
          )}
        </div>

        {/* ============================
            PRODUCTS
        ============================ */}

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
                <ProductCard
                  key={`product-${index}`}
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
function ProductCard({
  item,
}: {
  item: ProductCardItem;
}) {
  const image =
    item.image?.node;

  return (
    <article
      className="
        group
        relative
        flex
        h-full
        flex-col
        overflow-hidden
        bg-white
        text-[#252525]
        shadow-sm
        transition-all
        duration-500

        hover:-translate-y-2
        hover:shadow-2xl
      "
    >
      {/* IMAGE */}

      {image && (
        <div
          className="
            relative
            aspect-[4/3]
            overflow-hidden
            bg-black/5
          "
        >
          <Image
            src={image.sourceUrl}
            alt={
              image.altText ||
              item.heading ||
              ""
            }
            fill
            sizes="
              (min-width: 1280px) 33vw,
              (min-width: 768px) 50vw,
              100vw
            "
            className="
              object-cover
              transition-transform
              duration-700
              ease-out

              group-hover:scale-110
            "
          />

          {/* Image overlay */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/40
              via-transparent
              to-transparent
              opacity-50
              transition-opacity
              duration-500

              group-hover:opacity-80
            "
          />
        </div>
      )}

      {/* CONTENT */}

      <div
        className="
          flex
          flex-1
          flex-col
          p-7
          lg:p-8
        "
      >
        {item.subHeading && (
          <p
            className="
              text-xs
              font-black
              uppercase
              tracking-[0.16em]
              text-[#75333d]
            "
          >
            {item.subHeading}
          </p>
        )}

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
              mt-5
              flex-1
              text-base
              leading-7
              text-black/65

              [&_p]:mb-4
              [&_p:last-child]:mb-0

              [&_ul]:mt-4
              [&_ul]:space-y-2
              [&_ul]:pl-5

              [&_li]:list-disc

              [&_strong]:font-bold
              [&_strong]:text-black
            "
            dangerouslySetInnerHTML={{
              __html:
                item.description,
            }}
          />
        )}

        {item.buttonTitle &&
          item.buttonLink && (
            <div className="mt-7">
              <ProductButton
                title={
                  item.buttonTitle
                }
                href={
                  item.buttonLink
                }
              />
            </div>
          )}
      </div>

      {/* BRAND HOVER LINE */}

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
    </article>
  );
}
function ProductButton({
  title,
  href,
}: {
  title: string;
  href: string;
}) {
  const link =
    href.trim();

  const classes = `
    group/button
    inline-flex
    items-center
    gap-2
    font-black
    uppercase
    text-[#75333d]
    transition-all
    duration-300
  `;

  const content = (
    <>
      <span>{title}</span>

      <ArrowRight
        size={18}
        className="
          transition-transform
          duration-300
          group-hover/button:translate-x-1
        "
        aria-hidden="true"
      />
    </>
  );

  // Same-page anchor
  if (link.startsWith("#")) {
    return (
      <a
        href={link}
        className={classes}
      >
        {content}
      </a>
    );
  }

  // External
  if (
    link.startsWith("http://") ||
    link.startsWith("https://")
  ) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {content}
      </a>
    );
  }

  // Internal
  return (
    <Link
      href={link}
      className={classes}
    >
      {content}
    </Link>
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
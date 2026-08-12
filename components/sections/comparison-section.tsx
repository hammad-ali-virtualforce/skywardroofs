import Image from "next/image";

import type {
  ComparisonSectionData,
} from "@/lib/page-data";

type ComparisonSectionProps = {
  data: ComparisonSectionData;
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

export function ComparisonSection({
  data,
}: ComparisonSectionProps) {
  const leftImage =
    data.leftImage?.node ?? null;

  const rightImage =
    data.rightImage?.node ?? null;

  const rows =
    data.comparisonRows ?? [];

  const backgroundStyle =
    normalizeValue(
      data.backgroundStyle,
      "white",
    );

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
        {/* HEADER */}

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
                max-w-[780px]
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

        {/* TWO SIDE CARDS */}

        <div
          className="
            mt-14
            grid
            gap-6
            lg:grid-cols-2
          "
        >
          <ComparisonCard
            heading={
              data.leftHeading
            }
            image={leftImage}
            content={
              data.leftContent
            }
            side="left"
          />

          <ComparisonCard
            heading={
              data.rightHeading
            }
            image={rightImage}
            content={
              data.rightContent
            }
            side="right"
          />
        </div>

        {/* COMPARISON TABLE */}

        {rows.length > 0 && (
          <div
            className="
              mt-10
              overflow-hidden
              border
              border-black/10
              bg-white
              text-[#252525]
            "
          >
            {/* Desktop header */}
            <div
              className="
                hidden
                grid-cols-[1fr_1fr_1fr]
                bg-[#121012]
                text-white
                md:grid
              "
            >
              <div className="p-5 text-left
                  font-black
                  uppercase" >Title</div>

              <div
                className="
                  border-l
                  border-white/15
                  p-5
                  text-center
                  font-black
                  uppercase
                "
              >
                {data.leftHeading ||
                  "Option 1"}
              </div>

              <div
                className="
                  border-l
                  border-white/15
                  p-5
                  text-center
                  font-black
                  uppercase
                "
              >
                {data.rightHeading ||
                  "Option 2"}
              </div>
            </div>

            {rows.map(
              (row, index) => (
                <ComparisonTableRow
                  key={`${row.label}-${index}`}
                  row={row}
                  leftHeading={
                    data.leftHeading
                  }
                  rightHeading={
                    data.rightHeading
                  }
                  index={index}
                />
              ),
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function ComparisonCard({
  heading,
  image,
  content,
  side,
}: {
  heading: string | null;

  image:
    | {
        sourceUrl: string;
        altText: string | null;
        mediaDetails?: {
          width: number | null;
          height: number | null;
        } | null;
      }
    | null;

  content: string | null;

  side: "left" | "right";
}) {
  return (
    <article
      className="
        group
        overflow-hidden
        bg-white
        text-[#252525]
        shadow-sm
      "
    >
      {image && (
        <div
          className="
            relative
            aspect-[16/9]
            overflow-hidden
          "
        >
          <Image
            src={
              image.sourceUrl
            }
            alt={
              image.altText ||
              heading ||
              ""
            }
            fill
            sizes="
              (min-width: 1024px) 50vw,
              100vw
            "
            className="
              object-cover
              transition-transform
              duration-700

              group-hover:scale-105
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/55
              via-transparent
              to-transparent
            "
          />

          {heading && (
            <div
              className="
                absolute
                inset-x-0
                bottom-0
                p-7
                text-white
              "
            >
              <h3
                className="
                  text-2xl
                  font-black
                  uppercase
                  lg:text-3xl
                "
              >
                {heading}
              </h3>
            </div>
          )}
        </div>
      )}

      {!image &&
        heading && (
          <div className="px-8 pt-8">
            <h3
              className="
                text-2xl
                font-black
                uppercase
              "
            >
              {heading}
            </h3>
          </div>
        )}

      {content && (
        <div
          className="
            p-8
            text-base
            leading-7
            text-black/70

            [&_p]:mb-4
            [&_p:last-child]:mb-0

            [&_ul]:my-5
            [&_ul]:list-disc
            [&_ul]:pl-6

            [&_li]:mb-2

            [&_strong]:font-bold
            [&_strong]:text-black
          "
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      )}

      <div
        className={`
          h-[5px]
          w-full

          ${
            side === "left"
              ? "bg-[#75333d]"
              : "bg-[#121012]"
          }
        `}
      />
    </article>
  );
}

function ComparisonTableRow({
  row,
  leftHeading,
  rightHeading,
  index,
}: {
  row: {
    label: string | null;
    leftValue: string | null;
    rightValue: string | null;
  };

  leftHeading: string | null;
  rightHeading: string | null;

  index: number;
}) {
  return (
    <>
      {/* DESKTOP */}

      <div
        className={`
          hidden
          grid-cols-[1fr_1fr_1fr]
          md:grid

          ${
            index % 2 === 0
              ? "bg-white"
              : "bg-[#f5f5f3]"
          }
        `}
      >
        <div
          className="
            p-5
            font-black
            uppercase
          "
        >
          {row.label}
        </div>

        <div
          className="
            border-l
            border-black/10
            p-5
            text-center
          "
        >
          {row.leftValue}
        </div>

        <div
          className="
            border-l
            border-black/10
            p-5
            text-center
          "
        >
          {row.rightValue}
        </div>
      </div>

      {/* MOBILE */}

      <div
        className="
          border-b
          border-black/10
          p-6
          last:border-b-0
          md:hidden
        "
      >
        {row.label && (
          <h4
            className="
              mb-4
              font-black
              uppercase
              text-[#75333d]
            "
          >
            {row.label}
          </h4>
        )}

        <div
          className="
            grid
            grid-cols-2
            gap-5
          "
        >
          <div>
            <p
              className="
                text-xs
                font-bold
                uppercase
                text-black/45
              "
            >
              {leftHeading ||
                "Option 1"}
            </p>

            <p className="mt-1">
              {row.leftValue}
            </p>
          </div>

          <div>
            <p
              className="
                text-xs
                font-bold
                uppercase
                text-black/45
              "
            >
              {rightHeading ||
                "Option 2"}
            </p>

            <p className="mt-1">
              {row.rightValue}
            </p>
          </div>
        </div>
      </div>
    </>
  );
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
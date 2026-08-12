"use client";

import Image from "next/image";
import Link from "next/link";

import {
  usePathname,
} from "next/navigation";

import {
  ChevronRight,
} from "lucide-react";

import type {
  InnerHeroSectionData,
} from "@/lib/page-data";

type InnerHeroSectionProps = {
  data: InnerHeroSectionData;
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

export function InnerHeroSection({
  data,
}: InnerHeroSectionProps) {
  const pathname = usePathname();

  const background =
    data.backgroundImage?.node ?? null;

  const backgroundPosition =
    normalizeValue(
      data.backgroundPosition,
      "center",
    );

  const overlayOpacity =
    normalizeValue(
      data.overlayOpacity,
      "medium",
    );

  const textAlignment =
    normalizeValue(
      data.textAllignment,
      "left",
    );

  const positionClass =
    getBackgroundPosition(
      backgroundPosition,
    );

  const overlayClass =
    getOverlayClass(
      overlayOpacity,
    );

  const alignmentClass =
    textAlignment === "center"
      ? "items-center text-center"
      : "items-start text-left";

  return (
    <section
      className="
        relative
        isolate
        flex
        min-h-[300px]
        overflow-hidden
        bg-gradient-to-br
        from-[#121012]
        via-[#35171c]
        to-[#75333d]
        text-white
        aftershaperotated
        sm:min-h-[330px]
        lg:min-h-[400px]
      "
    >
      {/* BACKGROUND IMAGE */}

      {background && (
        <Image
          src={background.sourceUrl}
          alt=""
          fill
          priority
          sizes="100vw"
          className={`
            -z-20
            object-cover
            ${positionClass}
          `}
        />
      )}

      {/* OVERLAY */}

      {background && (
        <div
          className={`
            absolute
            inset-0
            -z-10
            ${overlayClass}
          `}
        />
      )}

      {/* subtle brand overlay */}

      {background && (
        <div
          className="
            absolute
            inset-0
            -z-10
            bg-gradient-to-r
            from-[#35171c]/40
            via-transparent
            to-black/20
          "
        />
      )}

      {/* CONTENT */}

      <div
        className="
          mx-auto
          flex
          w-full
          max-w-[1500px]
          items-center
          px-6
          py-16
          lg:px-8
          lg:py-20
        "
      >
        <div
          className={`
            flex
            w-full
            flex-col
            ${alignmentClass}
          `}
        >
          {/* BREADCRUMBS */}

          {data.showBreadcrumbs && (
            <Breadcrumbs
              pathname={
                pathname
              }
              centered={
                textAlignment ===
                "center"
              }
            />
          )}

          {/* SUBHEADING */}

          {data.subHeading && (
            <p
              className="
                mt-6
                text-sm
                font-black
                uppercase
                tracking-[0.2em]
                text-white/75
              "
            >
              {data.subHeading}
            </p>
          )}

          {/* HEADING */}

          {data.heading && (
            <h1
              className="
                mt-3
                max-w-[1000px]
                text-4xl
                font-black
                uppercase
                leading-[0.98]
                tracking-[-0.045em]

                sm:text-5xl
                lg:text-6xl
              "
            >
              {data.heading}
            </h1>
          )}

          {/* BRAND LINE */}

          <div
            className="
              mt-7
              h-[4px]
              w-16
              bg-[#75333d]
            "
          />
        </div>
      </div>
    </section>
  );
}
function Breadcrumbs({
  pathname,
  centered,
}: {
  pathname: string;
  centered: boolean;
}) {
  const segments =
    pathname
      .split("/")
      .filter(Boolean);

  const crumbs =
    segments.map(
      (segment, index) => {
        const href =
          "/" +
          segments
            .slice(
              0,
              index + 1,
            )
            .join("/");

        return {
          label:
            formatBreadcrumb(
              segment,
            ),
          href,
          current:
            index ===
            segments.length - 1,
        };
      },
    );

  return (
    <nav
      aria-label="Breadcrumb"
      className={`
        flex
        flex-wrap
        items-center
        gap-2
        text-sm
        font-bold
        uppercase
        tracking-[0.08em]
        text-white/70

        ${
          centered
            ? "justify-center"
            : "justify-start"
        }
      `}
    >
      <Link
        href="/"
        className="
          transition-colors
          hover:text-white
        "
      >
        Home
      </Link>

      {crumbs.map(
        (crumb) => (
          <div
            key={crumb.href}
            className="
              flex
              items-center
              gap-2
            "
          >
            <ChevronRight
              size={14}
              aria-hidden="true"
              className="opacity-50"
            />

            {crumb.current ? (
              <span
                className="
                  text-white
                "
                aria-current="page"
              >
                {crumb.label}
              </span>
            ) : (
              <Link
                href={
                  crumb.href
                }
                className="
                  transition-colors
                  hover:text-white
                "
              >
                {crumb.label}
              </Link>
            )}
          </div>
        ),
      )}
    </nav>
  );
}

function formatBreadcrumb(
  value: string,
) {
  return decodeURIComponent(
    value,
  )
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase(),
    );
}
function getBackgroundPosition(
  position: string,
) {
  switch (position) {
    case "top":
      return "object-top";

    case "bottom":
      return "object-bottom";

    default:
      return "object-center";
  }
}

function getOverlayClass(
  opacity: string,
) {
  switch (opacity) {
    case "light":
      return "bg-black/30";

    case "dark":
      return "bg-black/70";

    default:
      return "bg-black/50";
  }
}
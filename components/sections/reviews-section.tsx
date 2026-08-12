"use client";

import Image from "next/image";
import Link from "next/link";

import {
  useRef,
} from "react";

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
} from "lucide-react";

import type {
  ReviewsSectionData,
  TestimonialItem,
} from "@/lib/page-data";

type ReviewsSectionProps = {
  data: ReviewsSectionData;
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

export function ReviewsSection({
  data,
}: ReviewsSectionProps) {
  const testimonials =
    data.testimonials?.nodes ?? [];

  const layoutStyle =
    normalizeValue(
      data.layoutStyle,
      "slider",
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
        </div>

        {/* REVIEWS */}

        {testimonials.length > 0 && (
          <>
            {layoutStyle === "grid" ? (
              <ReviewsGrid
                testimonials={
                  testimonials
                }
              />
            ) : (
              <ReviewsSlider
                testimonials={
                  testimonials
                }
              />
            )}
          </>
        )}

        {/* CTA */}

        {data.buttonTitle &&
          data.buttonLink && (
            <div className="mt-12 text-center">
              <ReviewButton
                title={
                  data.buttonTitle
                }
                href={
                  data.buttonLink
                }
              />
            </div>
          )}
      </div>
    </section>
  );
}
function ReviewsGrid({
  testimonials,
}: {
  testimonials: TestimonialItem[];
}) {
  return (
    <div
      className="
        mt-14
        grid
        gap-6
        md:grid-cols-2
        xl:grid-cols-3
      "
    >
      {testimonials.map(
        (testimonial) => (
          <ReviewCard
            key={testimonial.id}
            testimonial={
              testimonial
            }
          />
        ),
      )}
    </div>
  );
}
function ReviewsSlider({
  testimonials,
}: {
  testimonials: TestimonialItem[];
}) {
  const sliderRef =
    useRef<HTMLDivElement>(null);

  function scroll(
    direction:
      | "left"
      | "right",
  ) {
    const slider =
      sliderRef.current;

    if (!slider) return;

    const amount =
      slider.clientWidth *
      0.8;

    slider.scrollBy({
      left:
        direction === "right"
          ? amount
          : -amount,

      behavior: "smooth",
    });
  }

  return (
    <div className="relative mt-14">
      {/* ARROWS */}

      <div
        className="
          mb-6
          flex
          justify-end
          gap-3
        "
      >
        <button
          type="button"
          onClick={() =>
            scroll("left")
          }
          aria-label="Previous reviews"
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            border
            border-[#75333d]
            text-[#75333d]
            transition-all

            hover:bg-[#75333d]
            hover:text-white
          "
        >
          <ChevronLeft
            size={22}
          />
        </button>

        <button
          type="button"
          onClick={() =>
            scroll("right")
          }
          aria-label="Next reviews"
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            border
            border-[#75333d]
            text-[#75333d]
            transition-all

            hover:bg-[#75333d]
            hover:text-white
          "
        >
          <ChevronRight
            size={22}
          />
        </button>
      </div>

      {/* SLIDER */}

      <div
        ref={sliderRef}
        className="
          flex
          snap-x
          snap-mandatory
          gap-6
          overflow-x-auto
          scroll-smooth
          pb-5

          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {testimonials.map(
          (testimonial) => (
            <div
              key={
                testimonial.id
              }
              className="
                w-[88%]
                shrink-0
                snap-start

                sm:w-[48%]

                lg:w-[32%]
              "
            >
              <ReviewCard
                testimonial={
                  testimonial
                }
              />
            </div>
          ),
        )}
      </div>
    </div>
  );
}
function ReviewCard({
  testimonial,
}: {
  testimonial: TestimonialItem;
}) {
  const details =
    testimonial.testimonialDetails;

  const image =
    details?.customerImage
      ?.node;

  const rating =
    Math.max(
      0,
      Math.min(
        5,
        Math.round(
          details?.rating ?? 5,
        ),
      ),
    );

  return (
    <article
      className="
        group
        flex
        h-full
        min-h-[390px]
        flex-col
        border
        border-black/10
        bg-white
        p-8
        text-[#252525]
        shadow-sm
        transition-all
        duration-300

        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      {/* TOP */}

      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >
        {/* STARS */}

        <div
          className="
            flex
            gap-1
            text-[#75333d]
          "
        >
          {Array.from({
            length: 5,
          }).map((_, index) => (
            <Star
              key={index}
              size={19}
              strokeWidth={1.8}
              fill={
                index <
                rating
                  ? "currentColor"
                  : "none"
              }
            />
          ))}
        </div>

        <Quote
          size={38}
          strokeWidth={1.4}
          className="text-[#75333d]/20"
        />
      </div>

      {/* REVIEW */}

      {details?.review && (
        <div
          className="
            mt-7
            flex-1
            text-lg
            leading-8
            text-black/70

            [&_p]:mb-4
            [&_p:last-child]:mb-0
          "
          dangerouslySetInnerHTML={{
            __html:
              details.review,
          }}
        />
      )}

      {/* CUSTOMER */}

      <div
        className="
          mt-8
          flex
          items-center
          gap-4
          border-t
          border-black/10
          pt-6
        "
      >
        {image ? (
          <div
            className="
              relative
              h-14
              w-14
              shrink-0
              overflow-hidden
              rounded-full
            "
          >
            <Image
              src={image.sourceUrl}
              alt={
                image.altText ||
                testimonial.title ||
                ""
              }
              fill
              sizes="56px"
              className="object-cover"
            />
          </div>
        ) : (
          <div
            className="
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[#75333d]
              text-lg
              font-black
              text-white
            "
          >
            {testimonial.title
              ?.charAt(0)
              .toUpperCase() ||
              "S"}
          </div>
        )}

        <div>
          {testimonial.title && (
            <h3
              className="
                font-black
                uppercase
                leading-tight
              "
            >
              {testimonial.title}
            </h3>
          )}

          {details?.location && (
            <p
              className="
                mt-1
                text-sm
                text-black/55
              "
            >
              {details.location}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
function ReviewButton({
  title,
  href,
}: {
  title: string;
  href: string;
}) {
  const link =
    href.trim();

  const classes = `
    inline-flex
    min-h-14
    items-center
    justify-center
    gap-3
    bg-[#75333d]
    px-8
    py-3
    font-bold
    uppercase
    text-white
    transition-all
    duration-300

    hover:-translate-y-1
    hover:bg-black
  `;

  const content = (
    <>
      {title}

      <ArrowRight
        size={18}
        aria-hidden="true"
      />
    </>
  );

  if (
    link.startsWith("#")
  ) {
    return (
      <a
        href={link}
        className={classes}
      >
        {content}
      </a>
    );
  }

  if (
    link.startsWith(
      "http://",
    ) ||
    link.startsWith(
      "https://",
    )
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

  return (
    <Link
      href={link}
      className={classes}
    >
      {content}
    </Link>
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
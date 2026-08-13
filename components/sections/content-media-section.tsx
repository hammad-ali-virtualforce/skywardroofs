"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import { ArrowRight } from "lucide-react";

import type {
  ContentMediaSectionData,
} from "@/lib/page-data";

type ContentMediaSectionProps = {
  data: ContentMediaSectionData;
};

function normalizeValue(
  value: string | string[] | null,
  fallback = "",
) {
  if (!value) return fallback;

  if (Array.isArray(value)) {
    return value[0] || fallback;
  }

  return value;
}

export function ContentMediaSection({
  data,
}: ContentMediaSectionProps) {
  const sectionRef =
    useRef<HTMLElement>(null);

  const image =
    data.image?.node ?? null;

  const imagePosition =
    normalizeValue(
      data.imagePosition,
      "right",
    );

  const backgroundStyle =
    normalizeValue(
      data.backgroundStyle,
      "white",
    );

  const contentWidth =
    normalizeValue(
      data.contentWidth,
      "normal",
    );

  const imageAnimation =
    normalizeValue(
      data.imageAnimation,
      "none",
    );

  const { scrollYProgress } =
    useScroll({
      target: sectionRef,
      offset: [
        "start end",
        "end start",
      ],
    });

  /* ---------------------------
     IMAGE MOTION
  ---------------------------- */

  const slideLeftX =
    useTransform(
      scrollYProgress,
      [0, 1],
      [220, -120],
    );

  const slideRightX =
    useTransform(
      scrollYProgress,
      [0, 1],
      [-220, 120],
    );

  const growScale =
    useTransform(
      scrollYProgress,
      [0, 1],
      [0.82, 1.08],
    );

  const shrinkScale =
    useTransform(
      scrollYProgress,
      [0, 1],
      [1.15, 0.88],
    );

  let motionX:
    | typeof slideLeftX
    | number = 0;

  let motionScale:
    | typeof growScale
    | number = 1;

  switch (imageAnimation) {
    case "slide_left":
      motionX = slideLeftX;
      break;

    case "slide_right":
      motionX = slideRightX;
      break;

    case "grow":
      motionScale = growScale;
      break;

    case "shrink":
      motionScale = shrinkScale;
      break;

    default:
      break;
  }

  const imageRight =
    imagePosition === "right";

  const backgroundClasses =
    getBackgroundClasses(
      backgroundStyle,
    );

  const contentMaxWidth =
    contentWidth === "wide"
      ? "max-w-[760px]"
      : "max-w-[620px]";

  return (
    <section
      ref={sectionRef}
      className={`
        relative
        overflow-hidden
        py-20
        lg:py-28
        ${backgroundClasses}
      `}
    >
      <div
        className="
          mx-auto
          grid
          max-w-[1500px]
          items-center
          gap-14
          px-6
          lg:grid-cols-2
          lg:gap-20
          lg:px-8
        "
      >
        {/* IMAGE */}
        <div
          className={
            imageRight
              ? "lg:order-2"
              : "lg:order-1"
          }
        >
          {image && (
            <motion.div
              style={{
                x: motionX,
                scale:
                  motionScale,
              }}
              className="
                relative
                mx-auto
                w-full
              "
            >
              <Image
                src={image.sourceUrl}
                alt={
                  image.altText ||
                  data.heading ||
                  ""
                }
                width={
                  image.mediaDetails
                    ?.width || 800
                }
                height={
                  image.mediaDetails
                    ?.height || 700
                }
                sizes="
                  (min-width: 1024px)
                  50vw,
                  100vw
                "
                className="
                  h-auto
                  max-h-[600]
                  w-full
                  object-contain
                "
              />
            </motion.div>
          )}
        </div>

        {/* CONTENT */}
        <div
          className={
            imageRight
              ? "lg:order-1"
              : "lg:order-2"
          }
        >
          <div
            className={
              contentMaxWidth
            }
          >
            {data.eyebrow && (
              <p
                className="
                  text-sm
                  font-black
                  uppercase
                  tracking-[0.16em]
                "
              >
                {data.eyebrow}
              </p>
            )}

            {data.heading && (
              <h2
                className="
                  mt-3
                  whitespace-pre-line
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

            {data.subHeading && (
              <p
                className="
                  mt-5
                  text-xl
                  font-bold
                "
              >
                {data.subHeading}
              </p>
            )}

            {data.content && (
              <div
                className="
                  mt-6
                  text-lg
                  leading-8

                  [&_p]:mb-5
                  [&_p:last-child]:mb-0

                  [&_strong]:font-bold

                  [&_ul]:my-5
                  [&_ul]:list-disc
                  [&_ul]:pl-6

                  [&_ol]:my-5
                  [&_ol]:list-decimal
                  [&_ol]:pl-6

                  [&_li]:mb-2

                  [&_a]:font-semibold
                  [&_a]:text-[#75333d]
                  [&_a]:underline
                "
                dangerouslySetInnerHTML={{
                  __html:
                    data.content,
                }}
              />
            )}

            {data.buttonTitle &&
              data.buttonLink && (
                <div className="mt-8">
                  <ContentButton
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
        </div>
      </div>
    </section>
  );
}

function getBackgroundClasses(
  background: string,
) {
  switch (background) {
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

function ContentButton({
  title,
  href,
}: {
  title: string;
  href: string;
}) {
  const link = href.trim();

  const classes = `
    inline-flex
    min-h-14
    items-center
    justify-center
    gap-3
    bg-black
    
    px-8
    py-3
    font-bold
    uppercase
    text-white
    transition-all
    duration-300

    hover:-translate-y-1
    hover:bg-[#75333d]
    hover:border-black
    hover:border
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

  return (
    <Link
      href={link}
      className={classes}
    >
      {content}
    </Link>
  );
}
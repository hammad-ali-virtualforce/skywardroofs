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
  MediaCtaSectionData,
} from "@/lib/page-data";

type MediaCtaSectionProps = {
  data: MediaCtaSectionData;
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

export function MediaCtaSection({
  data,
}: MediaCtaSectionProps) {
  const sectionRef =
    useRef<HTMLElement>(null);

  const background =
    data.backgroundImage?.node ?? null;

  const image =
    data.mainImage?.node ?? null;

  const columns = normalizeValue(
    data.numberOfColumns,
    "2",
  );
  const hasImage = Boolean(image);
  const imagePosition =
    normalizeValue(
      data.imagePosition,
      "right",
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

  /*
   * IMAGE ANIMATION
   *
   * These values deliberately travel quite far
   * so you get the Gravity-style scroll feeling.
   */

  const xLeft = useTransform(
    scrollYProgress,
    [0, 1],
    [300, -180],
  );

  const xRight = useTransform(
    scrollYProgress,
    [0, 1],
    [-300, 180],
  );

  const yTop = useTransform(
    scrollYProgress,
    [0, 1],
    [300, -200],
  );

  const yBottom = useTransform(
    scrollYProgress,
    [0, 1],
    [-300, 200],
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.8, 1, 1.08],
  );

  let motionX:
    | typeof xLeft
    | number = 0;

  let motionY:
    | typeof yTop
    | number = 0;

  let motionScale:
    | typeof scale
    | number = 1;

  switch (imageAnimation) {
    case "left":
      motionX = xLeft;
      break;

    case "right":
      motionX = xRight;
      break;

    case "top":
      motionY = yTop;
      break;

    case "bottom":
      motionY = yBottom;
      break;

    case "scale":
      motionScale = scale;
      break;

    default:
      break;
  }

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden text-white bg-no-repeat bg-cover aftershaperotated"
       style={{
    backgroundImage:
      background
        ? `url("${background.sourceUrl}")`
        : undefined,
       
    backgroundColor:
      background
        ? undefined
        : "#121012",
        backgroundAttachment:"fixed",
  }}
    >
      {/* --------------------------------
          FIXED BACKGROUND
      -------------------------------- */}

      {/* Overlay */}
      {background && (
        <div
          className="
            absolute
            inset-0
            -z-10
            bg-black/55
          "
        />
      )}

      <div
        className="
          relative
          mx-auto
          max-w-[1500px]
          px-6
          pt-20
          lg:px-8
          lg:py-28
        "
      >
        {!hasImage ? (
        <NoImageLayout data={data} />
      ) : columns === "3" ? (
        <ThreeColumnLayout
          data={data}
          image={image}
          imagePosition={imagePosition}
          x={motionX}
          y={motionY}
          scale={motionScale}
        />
      ) : (
        <TwoColumnLayout
          data={data}
          image={image}
          imagePosition={imagePosition}
          x={motionX}
          y={motionY}
          scale={motionScale}
        />
      )}
      </div>
    </section>
  );
}

/* ==================================================
   TWO COLUMN
================================================== */
function NoImageLayout({
  data,
}: {
  data: MediaCtaSectionData;
}) {
  return (
    <div
      className="
        grid
        items-center
        gap-10
        lg:grid-cols-[1fr_1fr]
        lg:gap-16
      "
    >
      {/* LEFT: TEXT */}
      <div className="text-left">
        {data.heading && (
          <h2
            className="
              whitespace-pre-line
              text-2xl
              font-black
              uppercase
              leading-[1.05]
              tracking-[-0.035em]
              sm:text-3xl
              lg:text-4xl
            "
          >
            {data.heading}
          </h2>
        )}

        {data.description && (
          <div
            className="
              mt-6
              max-w-[800px]
              text-lg
              leading-8
              text-white/80

              [&_p]:mb-4
              [&_p:last-child]:mb-0

              [&_strong]:font-bold
              [&_strong]:text-white

              [&_a]:underline
            "
            dangerouslySetInnerHTML={{
              __html: data.description,
            }}
          />
        )}
      </div>

      {/* RIGHT: BUTTON */}
      <div
        className="
          flex
          justify-center
          lg:justify-center
        "
      >
        <CtaButton
          title={data.buttonTitle}
          href={data.buttonLink}
        />
      </div>
    </div>
  );
}
function TwoColumnLayout({
  data,
  image,
  imagePosition,
  x,
  y,
  scale,
}: {
  data: MediaCtaSectionData;

  image:
    | NonNullable<
        MediaCtaSectionData[
          "mainImage"
        ]
      >["node"]
    | null;

  imagePosition: string;

  x: any;
  y: any;
  scale: any;
}) {
  const imageRight =
    imagePosition === "right";

  return (
    <div
      className="
        grid
        items-center
        gap-14
        lg:grid-cols-2
        lg:gap-20
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
              x,
              y,
              scale,
            }}
            className="
              relative
              mx-auto
              flex
              justify-center
            "
          >
            <Image
              src={image.sourceUrl}
              alt={
                image.altText || ""
              }
              width={
                image.mediaDetails
                  ?.width || 750
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
                max-h-[700px]
                w-auto
                max-w-full
                object-contain
                absolute
                top-[-140]
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
        <Content
          data={data}
          includeButton
        />
      </div>
    </div>
  );
}

/* ==================================================
   THREE COLUMN
================================================== */

function ThreeColumnLayout({
  data,
  image,
  imagePosition,
  x,
  y,
  scale,
}: {
  data: MediaCtaSectionData;

  image:
    | NonNullable<
        MediaCtaSectionData[
          "mainImage"
        ]
      >["node"]
    | null;

  imagePosition: string;

  x: any;
  y: any;
  scale: any;
}) {
  const imageRight =
    imagePosition === "right";

  const imageColumn = (
    <div>
      {image && (
        <motion.div
          style={{
            x,
            y,
            scale,
          }}
          className="
            relative
            flex
            justify-center
          "
        >
          <Image
            src={image.sourceUrl}
            alt={
              image.altText || ""
            }
            width={
              image.mediaDetails
                ?.width || 600
            }
            height={
              image.mediaDetails
                ?.height || 650
            }
            sizes="
              (min-width: 1024px)
              33vw,
              100vw
            "
            className="
              h-auto
              max-h-[650px]
              w-auto
              max-w-full
              object-contain
                absolute
                top-[-140]
            "
          />
        </motion.div>
      )}
    </div>
  );

  const textColumn = (
    <Content
      data={data}
      includeButton={false}
    />
  );

  const buttonColumn = (
    <div
      className="
        flex
        items-center
        justify-center
      "
    >
      <CtaButton
        title={
          data.buttonTitle
        }
        href={
          data.buttonLink
        }
      />
    </div>
  );

  return (
    <div
      className="
        grid
        items-center
        gap-12
        lg:grid-cols-[1fr_1fr_1fr]
        lg:gap-14
      "
    >
      {imageRight ? (
        <>
          {textColumn}

          {buttonColumn}

          {imageColumn}
        </>
      ) : (
        <>
          {imageColumn}

          {buttonColumn}

          {textColumn}
        </>
      )}
    </div>
  );
}

/* ==================================================
   CONTENT
================================================== */

function Content({
  data,
  includeButton,
}: {
  data: MediaCtaSectionData;
  includeButton: boolean;
}) {
  return (
    <div className="text-center">
      {data.heading && (
        <h2
          className="
            whitespace-pre-line
            text-2xl
            font-black
            uppercase
            leading-[1.05]
            tracking-[-0.035em]
            sm:text-2xl
            lg:text-2xl
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
            text-lg
            leading-8
            text-white/80

            [&_p]:mb-4
            [&_p:last-child]:mb-0

            [&_strong]:font-bold
            [&_strong]:text-white

            [&_a]:underline
          "
          dangerouslySetInnerHTML={{
            __html:
              data.description,
          }}
        />
      )}

      {includeButton && (
        <div className="mt-8">
          <CtaButton
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
  );
}

/* ==================================================
   BUTTON
================================================== */

function CtaButton({
  title,
  href,
}: {
  title: string | null;
  href: string | null;
}) {
  if (!title?.trim() || !href?.trim()) {
    return null;
  }

  const link = href.trim();

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
    hover:bg-white
    hover:text-[#75333d]
  `;

  // Same-page anchor
  if (link.startsWith("#")) {
    return (
      <a
        href={link}
        className={classes}
      >
        {title}
        <ArrowRight size={18} aria-hidden="true" />
      </a>
    );
  }

  // External URL
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
        {title}
        <ArrowRight size={18} aria-hidden="true" />
      </a>
    );
  }

  // Internal Next.js route
  return (
    <Link
      href={link}
      className={classes}
    >
      {title}
      <ArrowRight size={18} aria-hidden="true" />
    </Link>
  );
}
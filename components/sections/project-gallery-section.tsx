"use client";

import Image from "next/image";
import Link from "next/link";
import { useState,useRef } from "react";

import {
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import type {
  ProjectGallerySectionData,
} from "@/lib/page-data";

type ProjectGallerySectionProps = {
  data: ProjectGallerySectionData;
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

export function ProjectGallerySection({
  data,
}: ProjectGallerySectionProps) {
  const items =
    data.galleryItems ?? [];

  const layoutStyle =
    normalizeValue(
      data.layoutStyle,
      "grid",
    );

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

  const [activeIndex, setActiveIndex] =
    useState<number | null>(null);

  const validItems = items.filter(
    (item) => item.image?.node,
  );

  const backgroundClasses =
    getBackgroundClasses(
      backgroundStyle,
    );

  const gridClasses =
    getGridClasses(columns);

  function previousImage() {
    if (activeIndex === null) return;

    setActiveIndex(
      activeIndex === 0
        ? validItems.length - 1
        : activeIndex - 1,
    );
  }

  function nextImage() {
    if (activeIndex === null) return;

    setActiveIndex(
      activeIndex ===
        validItems.length - 1
        ? 0
        : activeIndex + 1,
    );
  }

  return (
    <>
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
          {/* Heading */}
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

          {/* Gallery */}
          {validItems.length > 0 && (
            <>
              {layoutStyle ===
              "slider" ? (
                <SliderGallery
                  items={validItems}
                  showLightbox={
                    data.showLightbox
                  }
                  onOpen={
                    setActiveIndex
                  }
                />
              ) : (
                <div
                  className={`
                    mt-14
                    grid
                    gap-5
                    ${gridClasses}
                  `}
                >
                  {validItems.map(
                    (
                      item,
                      index,
                    ) => (
                      <GalleryCard
                        key={`${item.image?.node?.id}-${index}`}
                        item={item}
                        index={index}
                        layoutStyle={
                          layoutStyle
                        }
                        showLightbox={
                          data.showLightbox
                        }
                        onOpen={
                          setActiveIndex
                        }
                      />
                    ),
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {data.showLightbox &&
        activeIndex !== null &&
        validItems[
          activeIndex
        ] && (
          <Lightbox
            item={
              validItems[
                activeIndex
              ]
            }
            onClose={() =>
              setActiveIndex(
                null,
              )
            }
            onPrevious={
              previousImage
            }
            onNext={
              nextImage
            }
          />
        )}
    </>
  );
}

function GalleryCard({
  item,
  index,
  layoutStyle,
  showLightbox,
  onOpen,
}: {
  item: ProjectGallerySectionData["galleryItems"] extends
    | (infer T)[]
    | null
    ? T
    : never;

  index: number;
  layoutStyle: string;
  showLightbox: boolean | null;

  onOpen: (
    index: number,
  ) => void;
}) {
  const image =
    item.image?.node;

  if (!image) return null;

  const imageContent = (
    <div
      className={`
        group
        relative
        overflow-hidden
        bg-black

        ${
          layoutStyle ===
          "masonry"
            ? index % 3 === 0
              ? "aspect-[4/5]"
              : index % 3 === 1
                ? "aspect-[5/4]"
                : "aspect-square"
            : "aspect-[4/3]"
        }
      `}
    >
      <Image
        src={image.sourceUrl}
        alt={
          image.altText ||
          item.caption ||
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
          group-hover:scale-105
        "
      />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/75
          via-black/10
          to-transparent
          opacity-70
          transition-opacity
          duration-300
          group-hover:opacity-90
        "
      />

      {item.caption && (
        <div
          className="
            absolute
            inset-x-0
            bottom-0
            p-6
            text-white
          "
        >
          <h3
            className="
              text-xl
              font-black
              uppercase
            "
          >
            {item.caption}
          </h3>

          {item.projectLink && (
            <span
              className="
                mt-3
                inline-flex
                items-center
                gap-2
                text-sm
                font-bold
                uppercase
              "
            >
              View Project
              <ArrowRight
                size={16}
              />
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (showLightbox) {
    return (
      <button
        type="button"
        onClick={() =>
          onOpen(index)
        }
        className="
          block
          w-full
          text-left
        "
        aria-label={`Open ${
          item.caption ||
          "project"
        }`}
      >
        {imageContent}
      </button>
    );
  }

  if (item.projectLink) {
    const link =
      item.projectLink.trim();

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
          className="block"
        >
          {imageContent}
        </a>
      );
    }

    return (
      <Link
        href={link}
        className="block"
      >
        {imageContent}
      </Link>
    );
  }

  return imageContent;
}

function SliderGallery({
  items,
  showLightbox,
  onOpen,
}: {
  items: NonNullable<
    ProjectGallerySectionData["galleryItems"]
  >;

  showLightbox: boolean | null;

  onOpen: (index: number) => void;
}) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (
    direction: "left" | "right",
  ) => {
    const slider = sliderRef.current;

    if (!slider) return;

    const amount =
      slider.clientWidth * 0.8;

    slider.scrollBy({
      left:
        direction === "right"
          ? amount
          : -amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative mt-14 slider">
      {/* Navigation */}
      <div className="mb-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={() =>
            scrollSlider("left")
          }
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
          aria-label="Previous projects"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          type="button"
          onClick={() =>
            scrollSlider("right")
          }
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
          aria-label="Next projects"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Slider */}
      <div
        ref={sliderRef}
        className="
          flex
          snap-x
          snap-mandatory
          gap-5
          overflow-x-auto
          scroll-smooth
          pb-4

          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {items.map(
          (item, index) => (
            <div
              key={`${item.image?.node?.id}-${index}`}
              className="
                w-[88%]
                shrink-0
                snap-start

                sm:w-[48%]

                lg:w-[calc(33.333%-14px)]
              "
            >
              <GalleryCard
                item={item}
                index={index}
                layoutStyle="grid"
                showLightbox={
                  showLightbox
                }
                onOpen={onOpen}
              />
            </div>
          ),
        )}
      </div>
    </div>
  );
}

function Lightbox({
  item,
  onClose,
  onPrevious,
  onNext,
}: {
  item:
    NonNullable<
      ProjectGallerySectionData[
        "galleryItems"
      ]
    >[number];

  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const image =
    item.image?.node;

  if (!image) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        bg-black/95
        p-5
      "
    >
      <button
        type="button"
        onClick={onClose}
        className="
          absolute
          right-6
          top-6
          z-20
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          bg-white
          text-black
        "
        aria-label="Close gallery"
      >
        <X size={24} />
      </button>

      <button
        type="button"
        onClick={
          onPrevious
        }
        className="
          absolute
          left-4
          top-1/2
          z-20
          flex
          h-12
          w-12
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          bg-white
          text-black
          md:left-8
        "
        aria-label="Previous project"
      >
        <ChevronLeft
          size={26}
        />
      </button>

      <button
        type="button"
        onClick={onNext}
        className="
          absolute
          right-4
          top-1/2
          z-20
          flex
          h-12
          w-12
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          bg-white
          text-black
          md:right-8
        "
        aria-label="Next project"
      >
        <ChevronRight
          size={26}
        />
      </button>

      <div
        className="
          relative
          h-[85vh]
          w-full
          max-w-[1400px]
        "
      >
        <Image
          src={
            image.sourceUrl
          }
          alt={
            image.altText ||
            item.caption ||
            ""
          }
          fill
          sizes="95vw"
          className="
            object-contain
          "
          priority
        />
      </div>

      {item.caption && (
        <div
          className="
            absolute
            bottom-7
            left-1/2
            max-w-[800px]
            -translate-x-1/2
            px-6
            text-center
            text-white
          "
        >
          <p className="font-bold">
            {item.caption}
          </p>
        </div>
      )}
    </div>
  );
}

function getGridClasses(
  columns: string,
) {
  switch (columns) {
    case "2":
      return "md:grid-cols-2";

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
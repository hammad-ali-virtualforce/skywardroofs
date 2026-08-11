"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Play,
} from "lucide-react";

import type {
  VideoShowcaseSectionData,
} from "@/lib/page-data";

type VideoShowcaseSectionProps = {
  data: VideoShowcaseSectionData;
};

/* ------------------------------------------------ */
/*               YOUTUBE ID HELPER                  */
/* ------------------------------------------------ */

function getYouTubeId(
  url: string | null,
): string | null {
  if (!url) return null;

  try {
    const parsed = new URL(url);

    // youtu.be/abc123
    if (
      parsed.hostname === "youtu.be" ||
      parsed.hostname === "www.youtu.be"
    ) {
      return parsed.pathname
        .replace("/", "")
        .split("?")[0];
    }

    // youtube.com/watch?v=abc123
    if (
      parsed.hostname.includes(
        "youtube.com",
      )
    ) {
      const videoId =
        parsed.searchParams.get("v");

      if (videoId) return videoId;

      // youtube.com/embed/abc123
      if (
        parsed.pathname.startsWith(
          "/embed/",
        )
      ) {
        return parsed.pathname
          .replace("/embed/", "")
          .split("/")[0];
      }

      // youtube.com/shorts/abc123
      if (
        parsed.pathname.startsWith(
          "/shorts/",
        )
      ) {
        return parsed.pathname
          .replace("/shorts/", "")
          .split("/")[0];
      }
    }

    return null;
  } catch {
    return null;
  }
}

/* ------------------------------------------------ */
/*                   MAIN VIDEO                     */
/* ------------------------------------------------ */

function MainVideo({
  thumbnail,
  youtubeUrl,
}: {
  thumbnail:
    | VideoShowcaseSectionData["mainVideoThumbnail"]
    | null;

  youtubeUrl: string | null;
}) {
  const [playing, setPlaying] =
    useState(false);

  const videoId =
    getYouTubeId(youtubeUrl);

  const image = thumbnail?.node;

  if (!videoId) {
    return null;
  }

  return (
    <div
      className="
        relative
        aspect-video
        w-full
        overflow-hidden
        bg-black
      "
    >
      {!playing ? (
        <button
          type="button"
          onClick={() =>
            setPlaying(true)
          }
          aria-label="Play video"
          className="
            group
            relative
            block
            h-full
            w-full
            cursor-pointer
          "
        >
          {image ? (
            <Image
              src={image.sourceUrl}
              alt={
                image.altText ||
                "Video thumbnail"
              }
              fill
              sizes="
                (min-width: 1500px) 1400px,
                100vw
              "
              className="
                object-cover
                transition-transform
                duration-700
                group-hover:scale-105
              "
            />
          ) : (
            <Image
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt="Video thumbnail"
              fill
              sizes="100vw"
              className="object-cover"
            />
          )}

          {/* overlay */}
          <div
            className="
              absolute
              inset-0
              bg-black/25
              transition-colors
              duration-300
              group-hover:bg-black/15
            "
          />

          {/* play button */}
          <span
            className="
              absolute
              left-1/2
              top-1/2
              flex
              h-20
              w-20
              -translate-x-1/2
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              bg-[#75333d]
              text-white
              shadow-xl
              transition-all
              duration-300
              group-hover:scale-110
              sm:h-24
              sm:w-24
            "
          >
            <Play
              size={38}
              fill="currentColor"
              className="ml-1"
            />
          </span>
        </button>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title="Skyward Roofs video"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="
            absolute
            inset-0
            h-full
            w-full
          "
        />
      )}
    </div>
  );
}

/* ------------------------------------------------ */
/*                 GALLERY SLIDER                   */
/* ------------------------------------------------ */

function VideoGallery({
  items,
}: {
  items:
    VideoShowcaseSectionData["galleryItem"];
}) {
  const sliderRef =
    useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] =
    useState(false);

  const [
    canScrollRight,
    setCanScrollRight,
  ] = useState(false);

  const updateButtons =
    useCallback(() => {
      const slider =
        sliderRef.current;

      if (!slider) return;

      setCanScrollLeft(
        slider.scrollLeft > 5,
      );

      setCanScrollRight(
        slider.scrollLeft +
          slider.clientWidth <
          slider.scrollWidth - 5,
      );
    }, []);

  useEffect(() => {
    updateButtons();

    const slider =
      sliderRef.current;

    if (!slider) return;

    slider.addEventListener(
      "scroll",
      updateButtons,
    );

    window.addEventListener(
      "resize",
      updateButtons,
    );

    return () => {
      slider.removeEventListener(
        "scroll",
        updateButtons,
      );

      window.removeEventListener(
        "resize",
        updateButtons,
      );
    };
  }, [updateButtons]);

  if (!items?.length) return null;

  function scroll(direction: number) {
    const slider =
      sliderRef.current;

    if (!slider) return;

    slider.scrollBy({
      left:
        slider.clientWidth *
        0.7 *
        direction,
      behavior: "smooth",
    });
  }

  return (
    <div className="relative mt-8">
      {/* Navigation */}
      {items.length > 3 && (
        <div
          className="
            mb-5
            flex
            justify-end
            gap-3
          "
        >
          <button
            type="button"
            onClick={() =>
              scroll(-1)
            }
            disabled={
              !canScrollLeft
            }
            aria-label="Previous videos"
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
              transition-colors
              hover:bg-[#75333d]
              hover:text-white
              disabled:cursor-not-allowed
              disabled:opacity-30
              absolute top-[75px] left-[-40px] bg-white z-[999]
              cursor-pointer
            "
          >
            <ChevronLeft
              size={22}
            />
          </button>

          <button
            type="button"
            onClick={() =>
              scroll(1)
            }
            disabled={
              !canScrollRight
            }
            aria-label="Next videos"
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
              transition-colors
              hover:bg-[#75333d]
              hover:text-white
              disabled:cursor-not-allowed
              disabled:opacity-30
              absolute top-[75px] right-[-40px] bg-white z-[999]
              cursor-pointer
            "
          >
            <ChevronRight
              size={22}
            />
          </button>
        </div>
      )}

      <div
        ref={sliderRef}
        className="
          flex
          snap-x
          snap-mandatory
          gap-5
          overflow-x-auto
          scroll-smooth
          pb-3
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {items.map(
          (item, index) => {
            const image =
              item.thumbnail?.node;

            if (
              !image ||
              !item.youtubeUrl
            ) {
              return null;
            }

            return (
              <a
                key={`${item.youtubeUrl}-${index}`}
                href={
                  item.youtubeUrl
                }
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  block
                  w-[82%]
                  flex-none
                  snap-start
                  sm:w-[48%]
                  lg:w-[20.5%]
                "
              >
                <div
                  className="
                    relative
                    aspect-[16/10]
                    overflow-hidden
                    bg-black
                  "
                >
                  <Image
                    src={
                      image.sourceUrl
                    }
                    alt={
                      image.altText ||
                      item.title ||
                      "YouTube video"
                    }
                    fill
                    sizes="
                      (min-width: 1024px) 33vw,
                      (min-width: 640px) 50vw,
                      82vw
                    "
                    className="
                      object-cover
                      transition-transform
                      duration-500
                      group-hover:scale-105
                    "
                  />

                  <div
                    className="
                      absolute
                      inset-0
                      bg-black/20
                      transition-colors
                      group-hover:bg-black/10
                    "
                  />

                  <span
                    className="
                      absolute
                      left-1/2
                      top-1/2
                      flex
                      h-14
                      w-14
                      -translate-x-1/2
                      -translate-y-1/2
                      items-center
                      justify-center
                      rounded-full
                      bg-white
                      text-[#75333d]
                      transition-transform
                      duration-300
                      group-hover:scale-110
                    "
                  >
                    <Play
                      size={23}
                      fill="currentColor"
                      className="ml-[2px]"
                    />
                  </span>

                  <ExternalLink
                    size={18}
                    className="
                      absolute
                      right-4
                      top-4
                      text-white
                      opacity-0
                      transition-opacity
                      group-hover:opacity-100
                    "
                  />
                </div>

                {item.title && (
                  <h3
                    className="
                      mt-4
                      text-lg
                      font-bold
                      uppercase
                      leading-tight
                      text-[#171717]
                      transition-colors
                      group-hover:text-[#75333d]
                    "
                  >
                    {item.title}
                  </h3>
                )}
              </a>
            );
          },
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------ */
/*                    SECTION                       */
/* ------------------------------------------------ */

export function VideoShowcaseSection({
  data,
}: VideoShowcaseSectionProps) {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-white
        py-20
        lg:py-28
      "
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
            max-w-[950px]
            text-center
          "
        >
          {data.heading && (
            <h2
              className="
                text-3xl
                font-black
                uppercase
                leading-[1.05]
                tracking-[-0.035em]
                text-[#171717]
                sm:text-4xl
                lg:text-5xl
              "
            >
              {data.heading}
            </h2>
          )}

          {data.description && (
            <p
              className="
                mx-auto
                mt-5
                max-w-[760px]
                text-lg
                leading-8
                text-black/65
              "
            >
              {data.description}
            </p>
          )}
        </div>

        {/* Main Video */}
        {data.mainVideoUrl && (
          <div
            className="
              mx-auto
              mt-14
              max-w-[1200px]
            "
          >
            <MainVideo
              thumbnail={
                data.mainVideoThumbnail
              }
              youtubeUrl={
                data.mainVideoUrl
              }
            />
          </div>
        )}

        {/* Gallery */}
        <div className="mx-auto max-w-[1200px]">
          <VideoGallery
            items={
              data.galleryItem
            }
          />
        </div>
      </div>
    </section>
  );
}
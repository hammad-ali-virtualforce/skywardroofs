"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

import type {
  WorkingWithUsSectionData,
} from "@/lib/page-data";

type WorkingWithUsSectionProps = {
  data: WorkingWithUsSectionData;
};

export function WorkingWithUsSection({
  data,
}: WorkingWithUsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const image = data.movingImage?.node;
    console.log("image", image)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Small vertical movement of whole hammer
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [100, -100],
  );

  return (
    <section
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        bg-gradient-to-b
        from-black
        via-[#35171c]
        to-[#75333d]
        py-12
        text-white
        lg:py-12
      "
    >
      <div className="mx-auto max-w-[1650px] px-6 lg:px-8">

        {/* ------------------------------
            MOVING HAMMER
        ------------------------------ */}
        {image && (
          <div className="relative flex justify-center">
            <motion.div
              style={{ y }}
              className="relative flex h-[500px] w-[600px] items-center justify-center"
            >
              {/* subtle glow */}
              <div
                className="
                  absolute
                  h-[220px]
                  w-[220px]
                  rounded-full
                  bg-white/5
                  blur-3xl
                "
              />

              {/* continuously spinning hammer */}
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="relative z-10 w-[600px]"
              >
                <Image
                  src={image.sourceUrl}
                  alt={image.altText || ""}
                  width={
                    image.mediaDetails?.width ||
                    300
                  }
                  height={
                    image.mediaDetails?.height ||
                    300
                  }
                  priority={false}
                  className="
                    h-auto
                    w-full
                    object-contain
                  "
                />
              </motion.div>
            </motion.div>
          </div>
        )}

        {/* ------------------------------
            HEADING
        ------------------------------ */}
        {data.heading && (
          <div className="mx-auto mt-4 max-w-[950px] text-center">
            <h2
              className="
                text-2xl
                font-extrabold
                uppercase
                leading-[1.05]
                tracking-[-0.035em]
                sm:text-4xl
                lg:text-4xl
              "
            >
              {data.heading}
            </h2>
          </div>
        )}

        {/* ------------------------------
            3 ITEMS
        ------------------------------ */}
        <div
          className="
            mt-20
            flex
            lg:mt-24
          "
        >
          <FeatureItem
            number="01"
            heading={data.firstItemHeading}
            subHeading={
              data.firstItemSubHeading
            }
            content={data.firstItemContent}
          />

          <FeatureItem
            number="02"
            heading={data.secondItemHeading}
            subHeading={
              data.secondItemSubHeading
            }
            content={data.secondItemContent}
          />

          <FeatureItem
            number="03"
            heading={data.thirdItemHeading}
            subHeading={
              data.thirdItemSubHeading
            }
            content={data.thirdItemContent}
          />
        </div>
        {data.buttonText && data.buttonLink && (
        <div className="mt-16 flex justify-center">
            <Link
            href={data.buttonLink}
            className="
                inline-flex
                min-h-14
                items-center
                justify-center
                gap-3
                bg-white
                px-8
                font-bold
                uppercase
                text-[#75333d]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-white
                hover:text-[#75333d]
            "
            >
            {data.buttonText}

            <ArrowRight
                size={18}
                aria-hidden="true"
            />
            </Link>
        </div>
        )}
      </div>
    </section>
  );
}

type FeatureItemProps = {
  number: string;
  heading: string | null;
  subHeading: string | null;
  content: string | null;
};

function FeatureItem({
  number,
  heading,
  subHeading,
  content,
}: FeatureItemProps) {
  return (
    <div className="relative border-r border-white text-center last:border-r-0 p-8">
   

      {heading && (
        <h3
          className="
            mt-6
            text-2xl
            font-black
            uppercase
            leading-tight
            lg:text-2xl
          "
        >
          {heading}
        </h3>
      )}

      {subHeading && (
        <p
          className="
            mt-4
            text-lg
            font-semibold
            text-white
          "
        >
          {subHeading}
        </p>
      )}
        <span className="my-4 block h-2 w-full bg-[#75333d]"></span>
      {content && (
        <div
            className="
            prose
            prose-invert
            mt-5
            max-w-none
            text-base
            leading-8
            text-white
            [&_p]:mb-4
            [&_p:last-child]:mb-0
            "
            dangerouslySetInnerHTML={{
            __html: content,
            }}
        />
      )}
    </div>
  );
}
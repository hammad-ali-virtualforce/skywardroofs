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

  const movingimage = data.movingImage?.node;
 
  const stillImage = data.stillImage?.node;
   // Small vertical movement of whole hammer
 const { scrollYProgress } = useScroll({
  target: sectionRef,
  offset: [
    "start 85%",
    "end 25%",
  ],
});
   const hammerY = useTransform(
  scrollYProgress,
  [0, 0.15, 0.28, 0.38, 0.48, 1],
  [-110, -70, 10, 75, 25, 25],
);

const hammerX = useTransform(
  scrollYProgress,
  [0, 0.28, 0.38, 0.48, 1],
  [-55, -20, 8, 0, 0],
);

const hammerRotate = useTransform(
  scrollYProgress,
  [0, 0.15, 0.28, 0.38, 0.48, 1],
  [-30, -22, -5, 24, 7, 7],
);

const hammerScale = useTransform(
  scrollYProgress,
  [0, 0.32, 0.38, 0.43, 1],
  [1, 1, 1.07, 1, 1],
);

const nailY = useTransform(
  scrollYProgress,
  [0, 0.36, 0.42, 0.52, 1],
  [0, 0, 22, 42, 42],
);

const nailScaleY = useTransform(
  scrollYProgress,
  [0, 0.36, 0.5, 1],
  [1, 1, 0.88, 0.88],
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
        lg:py-24
        aftershape
      "
      id="working-with-us"
    >
      <div className="mx-auto max-w-[1650px] px-6 lg:px-8">

        {/* ------------------------------
            MOVING HAMMER
        ------------------------------ */}
       {movingimage && (
        <div
          className="
            relative
            mx-auto
            flex
            h-[560px]
            max-w-[900px]
            items-center
            justify-center
          "
        >
          {/* subtle glow */}
          <div
            className="
              absolute
              left-1/2
              top-1/2
              h-[320px]
              w-[320px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-white/5
              blur-3xl
            "
          />

          {/* ------------------------------
              NAIL
          ------------------------------ */}

          {stillImage && (
            <motion.div
              style={{
                y: nailY,
                scaleY: nailScaleY,
                transformOrigin: "bottom center",
              }}
              className="
                absolute
                bottom-[5px]
                left-[84%]
                z-10
                w-full
              "
            >
              <Image
                src={stillImage.sourceUrl}
                alt={
                  stillImage.altText ||
                  "Roofing nail"
                }
                width={
                  stillImage.mediaDetails?.width ||
                  100
                }
                height={
                  stillImage.mediaDetails?.height ||
                  300
                }
                className="
                  h-auto
                  w-[30px]
                  object-contain
                "
              />
            </motion.div>
          )}

          {/* ------------------------------
              HAMMER
          ------------------------------ */}

          <motion.div
            style={{
              x: hammerX,
              y: hammerY,
              rotate: hammerRotate,
              scale: hammerScale,
              transformOrigin: "62% 182%",
            }}
            className="
              absolute
              left-1/2
              top-[130px]
              z-20
              w-[360px]
              -translate-x-[62%]
              sm:w-[440px]
              lg:w-[540px]
            "
          >
            <Image
              src={movingimage.sourceUrl}
              alt={
                movingimage.altText ||
                "Roofing hammer"
              }
              width={
                movingimage.mediaDetails?.width ||
                600
              }
              height={
                movingimage.mediaDetails?.height ||
                600
              }
              className="
                h-auto
                w-full
                object-contain
              "
            />
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
            items-stretch
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
    <div className="relative flex-1 border-r border-white text-center last:border-r-0 p-8">
   

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
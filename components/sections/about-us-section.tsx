import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AboutBackground } from "@/components/sections/about-background";
import type {
  AboutUsSectionData,
} from "@/lib/page-data";

type AboutUsSectionProps = {
  data: AboutUsSectionData;
};

function normalizeImagePosition(
  value: string[] | string | null,
) {
  if (!value) return "left";

  if (Array.isArray(value)) {
    return value[0] || "left";
  }

  return value;
}

export function AboutUsSection({
  data,
}: AboutUsSectionProps) {
  const aboutImage = data.aboutUsImage?.node;
  const background = data.backgroundImage?.node;

  const imagePosition =
    normalizeImagePosition(data.imagePosition);

  const imageRight =
    imagePosition === "right";

  return (
    <section className="relative isolate min-h-[680px] py-20 overflow-hidden bg-transparent text-white">
      {/* Background decorative image */}
      {background && (
        <AboutBackground  image={background.sourceUrl}/>
        // <Image
        //   src={background.sourceUrl}
        //   alt=""
        //   fill
        //   sizes="100vw"
        //   className="pointer-events-none object-cover opacity-[0.08]"
        // />
      )}
    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/65 to-black/55" />
      <div className="relative mx-auto grid max-w-[1500px] items-center gap-12 px-6 py-8 lg:grid-cols-2 lg:gap-20 lg:px-8">
        {/* Image */}
        <div
          className={
            imageRight
              ? "lg:order-2"
              : ""
          }
        >
          <div className="relative mx-auto max-w-[650px]">
            
            {aboutImage && (
              <div className="relative z-10 flex justify-center">
                
                <Image
                  src={aboutImage.sourceUrl}
                  alt={
                    aboutImage.altText ||
                    data.ownerName ||
                    "Skyward Roofs"
                  }
                  width={
                    500
                  }
                  height={
                    600
                  }
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-contain object-bottom"
                />
              </div>
            )}
            {data.ownerName && (
            <p className="mb-4 text-3xl font-bold uppercase flex justify-center mt-4 tracking-[0.14em] text-white">
              {data.ownerName} | Owner
            </p>
          )}
          </div>
        </div>

        {/* Content */}
        <div
          className={
            imageRight
              ? "lg:order-1"
              : ""
          }
        >
          

          {data.aboutUsHeading && (
            <h2 className="max-w-[700px] whitespace-pre-line text-4xl font-bold leading-tight tracking-[-0.025em] text-white md:text-5xl">
              {data.aboutUsHeading}
            </h2>
          )}

          {data.aboutUsContent && (
            <div
              className="
                mt-7
                max-w-[760px]
                text-base
                leading-8
                text-white
                [&_p]:mb-5
                [&_strong]:font-bold
                [&_strong]:text-gray-900
                [&_a]:font-semibold
                [&_a]:text-[var(--color-primary,#783640)]
                [&_ul]:my-5
                [&_ul]:list-disc
                [&_ul]:pl-6
              "
              dangerouslySetInnerHTML={{
                __html: data.aboutUsContent,
              }}
            />
          )}

          {data.buttonTitle &&
            data.buttonLink && (
              <div className="mt-8">
                <Link
                  href={data.buttonLink}
                  className="
                    inline-flex
                    min-h-14
                    items-center
                    gap-3
                    rounded-full
                    bg-[var(--color-primary,#783640)]
                    px-7
                    font-bold
                    text-white
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-[var(--color-primary-hover,#5f2932)]
                  "
                >
                  {data.buttonTitle}

                  <ArrowRight
                    size={19}
                    aria-hidden="true"
                  />
                </Link>
              </div>
            )}
        </div>
      </div>
    </section>
  );
}
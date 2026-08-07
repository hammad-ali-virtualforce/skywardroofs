import Image from "next/image";

import {
  CheckCircle2,
} from "lucide-react";

import { HeroTypewriter } from "@/components/sections/hero-typewriter";
import { HeroBackground } from "@/components/sections/hero-background";

import type {
  HeroSectionData,
} from "@/lib/page-data";

type HeroSectionProps = {
  data: HeroSectionData;
};

export function HeroSection({
  data,
}: HeroSectionProps) {
  const background =
    data.heroBackgroundImage?.node;

  const heroImage =
    data.heroImage?.node;

  return (
    <section className="relative isolate min-h-[680px] overflow-hidden bg-[#17121f] text-white">
      {background && (
        <HeroBackground  image={background.sourceUrl}/>
      )}
      <div className="overlay-div absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/65 to-black/55" />

      <div className="mx-auto grid min-h-[680px] max-w-[1500px] items-center gap-12 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="relative z-10 max-w-[760px]">
          {data.heroEyebrow &&
            data.heroEyebrow.length > 0 && (
              <div className="mb-5 min-h-7 text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-secondary,#F4B400)] sm:text-base">
                <HeroTypewriter
                  items={data.heroEyebrow}
                />
              </div>
            )}

          {data.heroHeading && (
            <h1 className="whitespace-pre-line text-5xl font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-7xl">
              {data.heroHeading}
            </h1>
          )}

          {data.heroDescription && (
            <p className="mt-7 max-w-[650px] whitespace-pre-line text-lg leading-8 text-white/80 lg:text-xl">
              {data.heroDescription}
            </p>
          )}

          {data.showTrustItems && (
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/85">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2
                  size={18}
                  className="text-[var(--color-secondary,#F4B400)]"
                />
                Trusted
              </span>

              <span className="inline-flex items-center gap-2">
                <CheckCircle2
                  size={18}
                  className="text-[var(--color-secondary,#F4B400)]"
                />
                Licensed
              </span>

              <span className="inline-flex items-center gap-2">
                <CheckCircle2
                  size={18}
                  className="text-[var(--color-secondary,#F4B400)]"
                />
                Insured
              </span>
            </div>
          )}
        </div>

        <div className="relative hidden min-h-[540px] lg:block">
          {heroImage && (
            <Image
              src={heroImage.sourceUrl}
              alt={heroImage.altText || ""}
              fill
              priority
              sizes="50vw"
              className="object-contain object-bottom"
            />
          )}
        </div>
      </div>
    </section>
  );
}
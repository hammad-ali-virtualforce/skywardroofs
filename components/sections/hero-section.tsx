import Image from "next/image";


import { HeroTypewriter } from "@/components/sections/hero-typewriter";
import { HeroBackground } from "@/components/sections/hero-background";
import {  HeroInspectionForm,} from "@/components/forms/hero-inspection-form";
import {
  BadgeCheck,
  CheckCircle2,
  ShieldCheck,
  Star,
  Wrench,
  Award,
  DollarSign,
} from "lucide-react";

import type {
  HeroSectionData,
} from "@/lib/page-data";

type HeroSectionProps = {
  data: HeroSectionData;
};
const trustIcons = {
  check: CheckCircle2,
  shield: ShieldCheck,
  badge: BadgeCheck,
  star: Star,
  wrench: Wrench,
  award: Award,
  dollar: DollarSign,

};
function getTrustIcon(
  value: string | string[] | null,
) {
  if (!value) return CheckCircle2;

  const iconName = Array.isArray(value)
    ? value[0]
    : value;

  return (
    trustIcons[
      iconName.toLowerCase() as keyof typeof trustIcons
    ] || CheckCircle2
  );
}
export function HeroSection({
  data,
}: HeroSectionProps) {
  const background =
    data.heroBackgroundImage?.node;

  const heroImage =
    data.heroImage?.node;

  return (
    <section className="relative isolate min-h-[680px] overflow-hidden bg-[#17121f] text-white ">
      {background && (
        <HeroBackground  image={background.sourceUrl}/>
      )}
      <div className="overlay-div absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/65 to-black/55" />

      <div className="mx-auto grid min-h-[680px] max-w-[1500px] items-center gap-12 px-6 py-20 lg:grid-cols-[2fr_.5fr_1.5fr] lg:px-8">
        <div className="relative z-10 max-w-[760px]">
          {data.heroEyebrow &&
            data.heroEyebrow.length > 0 && (
              <div className="mb-5 min-h-7 text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-secondary,#fff)] text-[24px] capitalize">
                <HeroTypewriter
                  items={data.heroEyebrow}
                />
              </div>
            )}

          {data.heroHeading && (
            <h1 className=" text-3xl whitespace-pre-line font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-4xl lg:text-5xl">
              {data.heroHeading}
            </h1>
          )}

          {data.heroDescription && (
            <p className="mt-7 max-w-[650px] whitespace-pre-line text-lg leading-8 text-white/80 lg:text-xl font-bold">
              {data.heroDescription}
            </p>
          )}
          {data.showTrustItems &&
            data.trustItems &&
            data.trustItems.length > 0 && (
                <div className="mt-8 flex flex-col gap-x-8 gap-y-4">
                {data.trustItems.map((item, index) => {
                    if (!item.trustItemsText) return null;

                    const Icon = getTrustIcon(item.trustIcon);

                    return (
                    <div
                        key={index}
                        className="flex items-center gap-2"
                    >
                        <Icon
                        size={44}
                        className="text-[var(--color-secondary,#CBCBCB)]"
                        />

                        <span className="font-medium text-[var(--color-secondary,#CBCBCB)] text-[22px]">
                        {item.trustItemsText}
                        </span>
                    </div>
                    );
                })}
                </div>
            )}
            {data.heroGoogleRatingBlockHeading && (
            <>
            <h2 className="whitespace-pre-line text-3xl font-extrabold mt-4 tracking-[-0.03em]">
              {data.heroGoogleRatingBlockHeading}
            </h2>
            <img src="https://skywardroofs.yourvirtualforce.com/wp-content/uploads/2026/08/greview.png"className="max-w-[420px] mt-4 object-contain object-bottom"/>
            </>
          )}
        </div>

        <div className="relative hidden min-h-[540px] lg:block">
          {heroImage && (
            <Image
              src={heroImage.sourceUrl}
              alt={heroImage.altText || ""}
               priority
              width={350}
              height={500}
              className="object-contain object-bottom max-w-max bottom-[-130px] absolute left-[-200px]"
            />
          )}
        </div>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_560px]">
        <div>
          {/* hero heading/content */}
        </div>
          
        {data.showForm && (
          <HeroInspectionForm />
        )}
      </div>
      </div>
    </section>
  );
}
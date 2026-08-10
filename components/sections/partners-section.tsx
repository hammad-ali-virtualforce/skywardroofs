import Image from "next/image";
import Link from "next/link";

import type {
  PartnersSectionData,
} from "@/lib/page-data";

type PartnersSectionProps = {
  data: PartnersSectionData;
};

export function PartnersSection({
  data,
}: PartnersSectionProps) {
  const partners =
    data.partnersImageSection?.filter(
      (partner) => partner.partnerImage?.node,
    ) ?? [];

  if (!partners.length) {
    return null;
  }

  return (
    <section className="bg-[#181818] py-10 lg:py-12">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-8">
        <div className="grid grid-cols-2 items-center gap-x-8 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {partners.map((partner, index) => {
            const image =
              partner.partnerImage?.node;

            if (!image) return null;

            const logo = (
              <Image
                src={image.sourceUrl}
                alt={
                  image.altText ||
                  "Skyward Roofs partner"
                }
                width={
                  image.mediaDetails?.width ||
                  180
                }
                height={
                  image.mediaDetails?.height ||
                 211
                }
                sizes="(min-width: 1024px) 14vw, (min-width: 768px) 25vw, 50vw"
                className="max-h-[250px] w-auto max-w-full object-contain transition-transform duration-300"
              />
            );

            return (
              <div
                key={
                  image.id ||
                  `partner-${index}`
                }
                className="flex min-h-[250px] items-center justify-center"
              >
                {partner.partnerImageLink ? (
                  <Link
                    href={
                      partner.partnerImageLink
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={
                      image.altText
                        ? `Visit ${image.altText}`
                        : "Visit partner website"
                    }
                    className="flex items-center justify-center transition-transform duration-300 hover:scale-105"
                  >
                    {logo}
                  </Link>
                ) : (
                  logo
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
import Image from "next/image";

import type {
  TeamSectionData,
} from "@/lib/page-data";

type TeamSectionProps = {
  data: TeamSectionData;
};

export function TeamSection({
  data,
}: TeamSectionProps) {
  const members =
    data.teamMembers?.nodes ?? [];
console.log("members", members)
  return (
    <section className="bg-white py-20 lg:py-28" id="team">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-8">

        {/* Heading */}
        <div className="mx-auto max-w-[900px] text-center">
          {data.heading && (
            <h2
              className="
                text-3xl
                font-black
                uppercase
                leading-tight
                text-[#2a2a2a]
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
                mt-5
                max-w-[760px]
                text-lg
                font-semibold
                uppercase
                leading-8
                text-[#75333d]

                [&_p]:mb-4
                [&_p:last-child]:mb-0
              "
              dangerouslySetInnerHTML={{
                __html: data.description,
              }}
            />
          )}
        </div>

        {/* Team grid */}
        {members.length > 0 && (
            <div
                className="
                mt-14
                grid
                grid-cols-1
                gap-5
                sm:grid-cols-2
                lg:grid-cols-12
                "
            >
                {members.map((member, index) => {
                const image =
                    member.featuredImage?.node;

                const position =
                    member.position?.position;

                const isFeatured =
                    index < 2;

                return (
                    <article
                    key={member.id}
                    className={`
                        group
                        relative
                        overflow-hidden
                        bg-[#111]

                        ${
                        isFeatured
                            ? "lg:col-span-6"
                            : "lg:col-span-3"
                        }
                    `}
                    >
                    <div
                        className={`
                        relative
                        overflow-hidden
                        border-4
                        border-[#75333d]

                        ${
                            isFeatured
                            ? "aspect-[16/10]"
                            : "aspect-[4/5]"
                        }
                        `}
                    >
                        {image && (
                        <Image
                            src={image.sourceUrl}
                            alt={
                            image.altText ||
                            member.title ||
                            ""
                            }
                            fill
                            sizes={
                            isFeatured
                                ? "(min-width: 1024px) 50vw, 100vw"
                                : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                            }
                            className="
                            object-cover
                            transition-transform
                            duration-700
                            group-hover:scale-105
                            "
                        />
                        )}

                        {/* Gradient */}
                        <div
                        className="
                            absolute
                            inset-0
                            bg-gradient-to-t
                            from-black/90
                            via-black/15
                            to-transparent
                        "
                        />

                        {/* Name + position */}
                        <div
                        className="
                            absolute
                            inset-x-0
                            bottom-0
                            z-10
                            p-6
                            text-center
                            text-white
                        "
                        >
                        {member.title && (
                            <h3
                            className={`
                                font-black
                                uppercase
                                leading-tight

                                ${
                                isFeatured
                                    ? "text-2xl lg:text-3xl"
                                    : "text-xl"
                                }
                            `}
                            >
                            {member.title}
                            </h3>
                        )}

                        {position && (
                            <p
                            className="
                                mt-2
                                text-sm
                                font-semibold
                                uppercase
                                tracking-wide
                                text-white/75
                            "
                            >
                            {position}
                            </p>
                        )}
                        </div>
                    </div>
                    </article>
                );
                })}
            </div>
            )}
      </div>
    </section>
  );
}
"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ChevronDown,
} from "lucide-react";

import type {
  FaqSectionData,
} from "@/lib/page-data";

type FaqSectionProps = {
  data: FaqSectionData;
};

export function FaqSection({
  data,
}: FaqSectionProps) {
  const faqs =
    data.faqs?.nodes ?? [];

  const image =
    data.faqImage?.node;

  const [activeIndex, setActiveIndex] =
    useState<number | null>(0);

  function toggleFaq(index: number) {
    setActiveIndex((current) =>
      current === index
        ? null
        : index,
    );
  }

  return (
    <section
      className="relative bg-gradient-to-b from-white via-[#fefefe] to-[#f7f7f7] py-4 lg:py-4"
      id="faq"
    >
      <div
        className="
          mx-auto
          grid
          max-w-[1500px]
          items-center
          gap-14
          px-6
          lg:grid-cols-[1.05fr_0.95fr]
          lg:gap-20
          lg:px-8
        "
      >
        {/* ==========================
            LEFT — FAQ CONTENT
        ========================== */}

        <div>
          {data.heading && (
            <h2
              className="
                text-3xl
                font-black
                uppercase
                leading-[1.05]
                tracking-[-0.035em]
                text-[#75333d]
                sm:text-4xl
                lg:text-5xl
                 mb-10
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
                text-black/65
               
              "
              dangerouslySetInnerHTML={{
                __html:
                  data.description,
              }}
            />
          )}

          {/* FAQ ACCORDION */}

          {faqs.length > 0 && (
            <div className="mt-2">
              {faqs.map(
                (faq, index) => {
                  const isOpen =
                    activeIndex === index;

                  const answer =
                    faq.faqDetails
                      ?.answer;

                  return (
                    <div
                      key={faq.id}
                      className="
                        border-b
                        border-black/20
                      "
                    >
                      <button
                        type="button"
                        onClick={() =>
                          toggleFaq(index)
                        }
                        aria-expanded={
                          isOpen
                        }
                        className="
                          flex
                          w-full
                          items-center
                          justify-between
                          gap-6
                          py-2
                          text-left
                        "
                      >
                        {faq.title && (
                          <span
                            className="
                              text-xl
                              font-bold
                              
                              text-[#292929]
                              transition-colors
                              duration-300
                              hover:text-[#75333d]
                              lg:text-xl
                              cursor-pointer
                            "
                          >
                            {faq.title}
                          </span>
                        )}

                        <span
                          className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-[#75333d]
                            text-white
                          "
                        >
                          <ChevronDown
                            size={20}
                            className={`
                              transition-transform
                              duration-300

                              ${
                                isOpen
                                  ? "rotate-180"
                                  : ""
                              }
                            `}
                          />
                        </span>
                      </button>

                      {/* ANSWER */}

                      <div
                        className={`
                          grid
                          transition-all
                          duration-300
                          ease-in-out

                          ${
                            isOpen
                              ? "grid-rows-[1fr] opacity-100"
                              : "grid-rows-[0fr] opacity-0"
                          }
                        `}
                      >
                        <div className="overflow-hidden">
                          {answer && (
                            <div
                              className="
                                max-w-[650px]
                                pb-7
                                pr-12
                                leading-7
                                text-black
                                font-medium
                                text-md
                              "
                              dangerouslySetInnerHTML={{
                                __html:
                                  answer,
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          )}
        </div>

        {/* ==========================
            RIGHT — IMAGE
        ========================== */}

        {image && (
          <div
            className="
              relative
              mx-auto
              w-full
              max-w-full
            "
          >
            <div
              className="
                relative
                aspect-[4/5]
                overflow-hidden
              "
            >
              <Image
                src={image.sourceUrl}
                alt={
                  image.altText ||
                  data.heading ||
                  ""
                }
                fill
                sizes="
                  (min-width: 1024px)
                  45vw,
                  100vw
                "
                className="
                  object-contain
                  transition-transform
                  duration-700
                  hover:scale-105
                "
              />
            </div>

          </div>
        )}
      </div>
    </section>
  );
}
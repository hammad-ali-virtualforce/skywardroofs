import { HeroSection } from "@/components/sections/hero-section";

import type {
  PageSection,
} from "@/lib/page-data";

type SectionRendererProps = {
  sections:
    | PageSection[]
    | null
    | undefined;
};

export function SectionRenderer({
  sections,
}: SectionRendererProps) {
  if (!sections?.length) return null;

  return (
    <>
      {sections.map((section, index) => {
        switch (section.__typename) {
          case "PageBuilderFieldsPageSectionsHeroLayout":
            return (
              <HeroSection
                key={`hero-${index}`}
                data={section}
              />
            );

          default:
            return null;
        }
      })}
    </>
  );
}
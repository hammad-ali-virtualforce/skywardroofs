import { HeroSection } from "@/components/sections/hero-section";
import { PartnersSection } from "@/components/sections/partners-section";
import { AboutUsSection } from "@/components/sections/about-us-section";
import { WorkingWithUsSection } from "@/components/sections/working-with-us-section";
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
            case "PageBuilderFieldsPageSectionsPartnersLayout":
            return (
              <PartnersSection
                key={`partners-${index}`}
                data={section}
              />
            );
            case "PageBuilderFieldsPageSectionsAboutUsLayout":
            return (
              <AboutUsSection
                key={`about-us-${index}`}
                data={section}
              />
            );
            case "PageBuilderFieldsPageSectionsWorkingWithUsLayout":
            return (
              <WorkingWithUsSection
                key={`working-with-us-${index}`}
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
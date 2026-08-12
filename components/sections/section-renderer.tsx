import { HeroSection } from "@/components/sections/hero-section";
import { PartnersSection } from "@/components/sections/partners-section";
import { AboutUsSection } from "@/components/sections/about-us-section";
import { WorkingWithUsSection } from "@/components/sections/working-with-us-section";
import { MediaCtaSection } from "@/components/sections/media-cta-section";
import {  ServicesGridSection,} from "@/components/sections/services-grid-section";
import {  ProcessSection,} from "@/components/sections/process-section";
import {  TeamSection,} from "@/components/sections/team-section";
import {  BlogSection,} from "@/components/sections/blog-section";
import {  FaqSection,} from "@/components/sections/faq-section";
import {  ServiceAreasSection,} from "@/components/sections/service-areas-section";
import {  ContentMediaSection,} from "@/components/sections/content-media-section";
import {  FeatureGridSection,} from "@/components/sections/feature-grid-section";
import {  ProjectGallerySection,} from "@/components/sections/project-gallery-section";
import {  ReviewsSection,} from "@/components/sections/reviews-section";
import {  ProductCardsSection,} from "@/components/sections/product-cards-section";
import {  ComparisonSection,} from "@/components/sections/comparison-section";
import {  TrustBadgeSection,} from "@/components/sections/trust-badge-section";
import {  InnerHeroSection,} from "@/components/sections/inner-hero-section";
import {
  VideoShowcaseSection,
} from "@/components/sections/video-showcase-section";
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
            case "PageBuilderFieldsPageSectionsVideoShowcaseLayout":
            return (
              <VideoShowcaseSection
                key={`video-showcase-${index}`}
                data={section}
              />
            );
            case "PageBuilderFieldsPageSectionsMediaCtaLayout":
            return (
              <MediaCtaSection 
              key={`media-cta-${index}`}
                data={section}
              />
            );
            case "PageBuilderFieldsPageSectionsServicesGridLayout":
            return (
              <ServicesGridSection
                key={`services-grid-${index}`}
                data={section}
              />
            );
            case "PageBuilderFieldsPageSectionsProcessSectionLayout":
            return (
              <ProcessSection
                key={`process-${index}`}
                data={section}
              />
            );
            case "PageBuilderFieldsPageSectionsTeamSectionLayout":
            return (
              <TeamSection
                key={`team-${index}`}
                data={section}
              />
            );
            case "PageBuilderFieldsPageSectionsBlogSectionLayout":
            return (
              <BlogSection
                key={`blog-${index}`}
                data={section}
              />
            );
            case "PageBuilderFieldsPageSectionsFaqSectionLayout":
            return (
              <FaqSection
                key={`faq-${index}`}
                data={section}
              />
            );
            case "PageBuilderFieldsPageSectionsServiceAreasLayout":
            return (
              <ServiceAreasSection
                key={`service-areas-${index}`}
                data={section}
              />
            );
            case "PageBuilderFieldsPageSectionsContentMediaLayout":
            return (
              <ContentMediaSection
                key={`content-media-${index}`}
                data={section}
              />
            );
            case "PageBuilderFieldsPageSectionsFeatureGridLayout":
            return (
              <FeatureGridSection
                key={`feature-grid-${index}`}
                data={section}
              />
            );
            case "PageBuilderFieldsPageSectionsProjectGalleryLayout":
            return (
              <ProjectGallerySection
                key={`project-gallery-${index}`}
                data={section}
              />
            );
            case "PageBuilderFieldsPageSectionsReviewsLayout":
            return (
              <ReviewsSection
                key={`reviews-${index}`}
                data={section}
              />
            );
            case "PageBuilderFieldsPageSectionsProductCardsLayout":
            return (
              <ProductCardsSection
                key={`product-cards-${index}`}
                data={section}
              />
            );
            case "PageBuilderFieldsPageSectionsComparisonLayout":
            return (
              <ComparisonSection
                key={`comparison-${index}`}
                data={section}
              />
            );
            case "PageBuilderFieldsPageSectionsTrustBadgesLayout":
            return (
              <TrustBadgeSection
                key={`trust-badge-${index}`}
                data={section}
              />
            );
            case "PageBuilderFieldsPageSectionsInnerHeroLayout":
            return (
              <InnerHeroSection
                key={`inner-hero-${index}`}
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
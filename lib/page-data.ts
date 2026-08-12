import { fetchGraphQL } from "@/lib/graphql";

export type PageMedia = {
  node: {
    id?: string;
    sourceUrl: string;
    altText: string | null;
    mediaDetails?: {
      width: number | null;
      height: number | null;
    } | null;
  } | null;
};

export type HeroEyebrowItem = {
  heroEyebrowText: string | null;
};
export type HeroTrustItem = {
  trustIcon: string[] | string | null;
  trustItemsText: string | null;
};
export type HeroSectionData = {
  __typename: "PageBuilderFieldsPageSectionsHeroLayout";
  heroEyebrow: HeroEyebrowItem[] | null;
  heroHeading: string | null;
  heroDescription: string | null;
  heroGoogleRatingBlockHeading: string | null;
  showForm: boolean | null;
  showTrustItems: boolean | null;
  trustItems: HeroTrustItem[] | null;
  heroBackgroundImage: PageMedia | null;
  heroImage: PageMedia | null;
};



export type PageData = {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  uri: string;
  pageBuilderFields: {
    pageSections: PageSection[] | null;
  } | null;
};
export type PartnerItem = {
  partnerImage: PageMedia | null;
  partnerImageLink: string | null;
};

export type PartnersSectionData = {
  __typename:
    "PageBuilderFieldsPageSectionsPartnersLayout";

  partnersImageSection: PartnerItem[] | null;
};

export type AboutUsSectionData = {
  __typename:
    "PageBuilderFieldsPageSectionsAboutUsLayout";

  aboutUsContent: string | null;
  aboutUsHeading: string | null;

  aboutUsImage: PageMedia | null;

  backgroundImage: PageMedia | null;

  buttonLink: string | null;
  buttonTitle: string | null;

  imagePosition: string[] | string | null;

  ownerName: string | null;
}; 

export type WorkingWithUsSectionData = {
  __typename:
    "PageBuilderFieldsPageSectionsWorkingWithUsLayout";

  heading: string | null;

  movingImage: PageMedia | null;
  stillImage: PageMedia | null;

  firstItemHeading: string | null;
  firstItemSubHeading: string | null;
  firstItemContent: string | null;

  secondItemHeading: string | null;
  secondItemSubHeading: string | null;
  secondItemContent: string | null;

  thirdItemHeading: string | null;
  thirdItemSubHeading: string | null;
  thirdItemContent: string | null;
  buttonText: string | null;
  buttonLink: string | null;
};

export type VideoGalleryItem = {
  thumbnail: PageMedia | null;
  youtubeUrl: string | null;
};

export type VideoShowcaseSectionData = {
  __typename:
    "PageBuilderFieldsPageSectionsVideoShowcaseLayout";

  heading: string | null;
  description: string | null;

  mainVideoThumbnail: PageMedia | null;
  mainVideoUrl: string | null;

  galleryItem: VideoGalleryItem[] | null;
};

export type MediaCtaSectionData = {
  __typename:
    "PageBuilderFieldsPageSectionsMediaCtaLayout";

  heading: string | null;
  description: string | null;

  buttonTitle: string | null;
  buttonLink: string | null;

  backgroundImage: PageMedia | null;
  mainImage: PageMedia | null;

  numberOfColumns: string[] | string | null;
  imagePosition: string[] | string | null;
  imageAnimation: string[] | string | null;
};

export type ServicesGridItem = {
  icon: string[] | string | null;
  heading: string | null;
  description: string | null;
};

export type ServicesGridSectionData = {
  __typename:
    "PageBuilderFieldsPageSectionsServicesGridLayout";

  heading: string | null;
  description: string | null;
  slogan: string | null;
  servicesCollageImage: PageMedia | null;

  servicesItems: ServicesGridItem[] | null;
};
export type ProcessItem = {
  backgroundImage: PageMedia | null;
  heading: string | null;
  description: string | null;
  icon: string[] | string | null;
};

export type ProcessSectionData = {
  __typename:
    "PageBuilderFieldsPageSectionsProcessSectionLayout";

  heading: string | null;
  subHeading: string | null;
  description: string | null;

  processItems: ProcessItem[] | null;
};

export type TeamMemberItem = {
  id: string;
  title: string | null;

  featuredImage: {
    node: {
      id: string;
      sourceUrl: string;
      altText: string | null;
      mediaDetails: {
        width: number | null;
        height: number | null;
      } | null;
    } | null;
  } | null;

  position: {
    position: string | null;
  } | null;
};

export type TeamSectionData = {
  __typename:
    "PageBuilderFieldsPageSectionsTeamSectionLayout";

  heading: string | null;
  description: string | null;

  teamMembers: {
    nodes: TeamMemberItem[];
  } | null;
};

export type BlogPostItem = {
  id: string;
  databaseId: number;
  title: string | null;
  uri: string | null;
  date: string | null;
  excerpt: string | null;

  featuredImage: {
    node: {
      id: string;
      sourceUrl: string;
      altText: string | null;

      mediaDetails: {
        width: number | null;
        height: number | null;
      } | null;
    } | null;
  } | null;
};

export type BlogSectionData = {
  __typename:
    "PageBuilderFieldsPageSectionsBlogSectionLayout";

  heading: string | null;
  description: string | null;

  buttonTitle: string | null;
  buttonLink: string | null;

  noOfPosts: number | null;

  posts: {
    nodes: BlogPostItem[];
  } | null;
};
export type FaqItem = {
  id: string;
  title: string | null;

  faqDetails: {
    answer: string | null;
  } | null;
};

export type FaqSectionData = {
  __typename:
    "PageBuilderFieldsPageSectionsFaqSectionLayout";

  heading: string | null;
  description: string | null;

  faqImage: PageMedia | null;

  faqs: {
    nodes: FaqItem[];
  } | null;
};
export type ServiceAreaItem = {
  id: string;
  title: string | null;
  uri: string | null;
};

export type ServiceAreasSectionData = {
  __typename:
    "PageBuilderFieldsPageSectionsServiceAreasLayout";

  heading: string | null;
  description: string | null;

  backgroundImage: PageMedia | null;

  serviceAreas: {
    nodes: ServiceAreaItem[];
  } | null;
};

export type ContentMediaSectionData = {
  __typename:
    "PageBuilderFieldsPageSectionsContentMediaLayout";

  eyebrow: string | null;
  heading: string | null;
  subHeading: string | null;
  content: string | null;

  buttonTitle: string | null;
  buttonLink: string | null;

  backgroundStyle:
    | string[]
    | string
    | null;

  contentWidth:
    | string[]
    | string
    | null;

  imageAnimation:
    | string[]
    | string
    | null;

  imagePosition:
    | string[]
    | string
    | null;

  image: PageMedia | null;
};

export type FeatureGridItem = {
  icon: string[] | string | null;
  heading: string | null;
  description: string | null;
};

export type FeatureGridSectionData = {
  __typename:
    "PageBuilderFieldsPageSectionsFeatureGridLayout";

  heading: string | null;
  subHeading: string | null;
  description: string | null;

  columns:
    | string[]
    | string
    | null;

  backgroundStyle:
    | string[]
    | string
    | null;

  featureItems:
    | FeatureGridItem[]
    | null;
};

export type ProjectGalleryItem = {
  caption: string | null;
  projectLink: string | null;
  image: PageMedia | null;
};

export type ProjectGallerySectionData = {
  __typename:
    "PageBuilderFieldsPageSectionsProjectGalleryLayout";

  heading: string | null;
  subHeading: string | null;
  description: string | null;

  layoutStyle: string[] | string | null;
  columns: string[] | string | null;
  backgroundStyle: string[] | string | null;

  showLightbox: boolean | null;

  galleryItems: ProjectGalleryItem[] | null;
};
export type TestimonialItem = {
  id: string;
  title: string | null;

  testimonialDetails: {
    customerImage: PageMedia | null;
    location: string | null;
    rating: number | null;
    review: string | null;
  } | null;
};

export type ReviewsSectionData = {
  __typename:
    "PageBuilderFieldsPageSectionsReviewsLayout";

  heading: string | null;
  subHeading: string | null;

  layoutStyle: string[] | string | null;
  backgroundStyle: string[] | string | null;

  buttonTitle: string | null;
  buttonLink: string | null;

  testimonials: {
    nodes: TestimonialItem[];
  } | null;
};

export type ProductCardItem = {
  heading: string | null;
  subHeading: string | null;
  description: string | null;
  buttonTitle: string | null;
  buttonLink: string | null;
  image: PageMedia | null;
};

export type ProductCardsSectionData = {
  __typename:
    "PageBuilderFieldsPageSectionsProductCardsLayout";

  heading: string | null;
  subHeading: string | null;
  description: string | null;

  columns: string[] | string | null;
  backgroundStyle: string[] | string | null;

  productItems: ProductCardItem[] | null;
};

export type ComparisonRow = {
  label: string | null;
  leftValue: string | null;
  rightValue: string | null;
};

export type ComparisonSectionData = {
  __typename:
    "PageBuilderFieldsPageSectionsComparisonLayout";

  heading: string | null;
  subHeading: string | null;
  description: string | null;

  leftHeading: string | null;
  leftImage: PageMedia | null;
  leftContent: string | null;

  rightHeading: string | null;
  rightImage: PageMedia | null;
  rightContent: string | null;

  backgroundStyle:
    | string[]
    | string
    | null;

  comparisonRows:
    | ComparisonRow[]
    | null;
};

export type TrustBadgeItem = {
  heading: string | null;
  link: string | null;
  logo: PageMedia | null;
};

export type TrustBadgeSectionData = {
  __typename:
    "PageBuilderFieldsPageSectionsTrustBadgesLayout";

  heading: string | null;
  subHeading: string | null;
  description: string | null;

  columns:
    | string[]
    | string
    | null;

  backgroundStyle:
    | string[]
    | string
    | null;

  trustBadgeItems:
    | TrustBadgeItem[]
    | null;
};

export type InnerHeroSectionData = {
  __typename:
    "PageBuilderFieldsPageSectionsInnerHeroLayout";

  heading: string | null;
  subHeading: string | null;

  backgroundImage: PageMedia | null;

  backgroundPosition:
    | string[]
    | string
    | null;

  overlayOpacity:
    | string[]
    | string
    | null;

  textAllignment:
    | string[]
    | string
    | null;

  showBreadcrumbs: boolean | null;
};

type GetPageResponse = {
  page: PageData | null;
};
export type PageSection =
  | HeroSectionData
  | PartnersSectionData
  | AboutUsSectionData
  | WorkingWithUsSectionData
  | VideoShowcaseSectionData
  | MediaCtaSectionData
  | ServicesGridSectionData
  | ProcessSectionData
  | TeamSectionData
  | BlogSectionData
  | FaqSectionData
  | ServiceAreasSectionData
  | ContentMediaSectionData
  | FeatureGridSectionData
  | ProjectGallerySectionData
  | ReviewsSectionData
  | ProductCardsSectionData
  | ComparisonSectionData
  | TrustBadgeSectionData
  | InnerHeroSectionData;

const GET_PAGE_QUERY = `
  query GetPage($uri: ID!) {
    page(id: $uri, idType: URI) {
      id
      databaseId
      title
      slug
      uri

      pageBuilderFields {
        pageSections {
          __typename

          ... on PageBuilderFieldsPageSectionsHeroLayout {
            heroEyebrow {
              heroEyebrowText
            }

            heroHeading
            heroDescription
            heroGoogleRatingBlockHeading
            showForm
            showTrustItems
            trustItems {
                trustIcon
                trustItemsText
            }

            heroBackgroundImage {
              node {
                id
                sourceUrl
                altText
                mediaDetails {
                  width
                  height
                }
              }
            }

            heroImage {
              node {
                id
                sourceUrl
                altText
                mediaDetails {
                  width
                  height
                }
              }
            }
          }
          ... on PageBuilderFieldsPageSectionsPartnersLayout {
            partnersImageSection {
              partnerImage {
                node {
                  id
                  sourceUrl
                  altText
                  mediaDetails {
                    width
                    height
                  }
                }
              }

              partnerImageLink
            }
          }
          ... on PageBuilderFieldsPageSectionsAboutUsLayout {
            aboutUsContent
            aboutUsHeading
            buttonLink
            buttonTitle
            imagePosition
            ownerName

            aboutUsImage {
              node {
                id
                sourceUrl
                altText
                mediaDetails {
                  width
                  height
                }
              }
            }

            backgroundImage {
              node {
                id
                sourceUrl
                altText
                mediaDetails {
                  width
                  height
                }
              }
            }
          }
          ... on PageBuilderFieldsPageSectionsWorkingWithUsLayout {
            heading

            movingImage {
              node {
                id
                sourceUrl
                altText
                mediaDetails {
                  width
                  height
                }
              }
            }
            stillImage{
              node {
                id
                sourceUrl
                altText
                mediaDetails {
                  width
                  height
                }
              }
            }

            firstItemHeading
            firstItemSubHeading
            firstItemContent

            secondItemHeading
            secondItemSubHeading
            secondItemContent

            thirdItemHeading
            thirdItemSubHeading
            thirdItemContent
            buttonText
            buttonLink
          }
          ... on PageBuilderFieldsPageSectionsVideoShowcaseLayout {
            heading
            description
            mainVideoUrl

            mainVideoThumbnail {
              node {
                id
                sourceUrl
                altText
                mediaDetails {
                  width
                  height
                }
              }
            }

            galleryItem {
             
              youtubeUrl

              thumbnail {
                node {
                  id
                  sourceUrl
                  altText
                  mediaDetails {
                    width
                    height
                  }
                }
              }
            }
          }
          ... on PageBuilderFieldsPageSectionsMediaCtaLayout {
            heading
            description
            buttonTitle
            buttonLink
            numberOfColumns
            imagePosition
            imageAnimation

            backgroundImage {
              node {
                id
                sourceUrl
                altText
                mediaDetails {
                  width
                  height
                }
              }
            }

            mainImage {
              node {
                id
                sourceUrl
                altText
                mediaDetails {
                  width
                  height
                }
              }
            }
          }
          ... on PageBuilderFieldsPageSectionsServicesGridLayout {
            heading
            description
            slogan

            servicesCollageImage {
              node {
                id
                sourceUrl
                altText
                mediaDetails {
                  width
                  height
                }
              }
            }

            servicesItems {
              icon
              heading
              description
            }
          }
          ... on PageBuilderFieldsPageSectionsProcessSectionLayout {
            heading
            subHeading
            description

            processItems {
              heading
              description
              icon

              backgroundImage {
                node {
                  id
                  sourceUrl
                  altText
                  mediaDetails {
                    width
                    height
                  }
                }
              }
            }
          }
          ... on PageBuilderFieldsPageSectionsTeamSectionLayout {
            heading
            description

            teamMembers(first: 50) {
              nodes {
                __typename

                ... on TeamMember {
                  id
                  title

                  featuredImage {
                    node {
                      id
                      sourceUrl
                      altText
                      mediaDetails {
                        width
                        height
                      }
                    }
                  }

                  position {
                    position
                  }
                }
              }
            }
          }
          ... on PageBuilderFieldsPageSectionsBlogSectionLayout {
            heading
            description
            buttonTitle
            buttonLink
            noOfPosts

            posts {
              nodes {
                __typename

                ... on Post {
                  id
                  databaseId
                  title
                  uri
                  date
                  excerpt

                  featuredImage {
                    node {
                      id
                      sourceUrl
                      altText

                      mediaDetails {
                        width
                        height
                      }
                    }
                  }
                }
              }
            }
          }
          ... on PageBuilderFieldsPageSectionsFaqSectionLayout {
            heading
            description

            faqImage {
              node {
                id
                sourceUrl
                altText
                mediaDetails {
                  width
                  height
                }
              }
            }

            faqs {
              nodes {
                __typename

                ... on Faq {
                  id
                  title

                  faqDetails {
                    answer
                  }
                }
              }
            }
          }
          ... on PageBuilderFieldsPageSectionsServiceAreasLayout {
            heading
            description

            backgroundImage {
              node {
                id
                sourceUrl
                altText
                mediaDetails {
                  width
                  height
                }
              }
            }

            serviceAreas {
              nodes {
                __typename

                ... on ServiceArea {
                  id
                  title
                  uri
                }
              }
            }
          }
          ... on PageBuilderFieldsPageSectionsContentMediaLayout {
            eyebrow
            heading
            subHeading
            content

            buttonTitle
            buttonLink

            backgroundStyle
            contentWidth
            imageAnimation
            imagePosition

            image {
              node {
                id
                sourceUrl
                altText

                mediaDetails {
                  width
                  height
                }
              }
            }
          }
          ... on PageBuilderFieldsPageSectionsFeatureGridLayout {
            heading
            subHeading
            description
            columns
            backgroundStyle

            featureItems {
              icon
              heading
              description
            }
          }
          ... on PageBuilderFieldsPageSectionsProjectGalleryLayout {
            heading
            subHeading
            description
            layoutStyle
            columns
            backgroundStyle
            showLightbox

            galleryItems {
              caption
              projectLink

              image {
                node {
                  id
                  sourceUrl
                  altText

                  mediaDetails {
                    width
                    height
                  }
                }
              }
            }
          }
          ... on PageBuilderFieldsPageSectionsReviewsLayout {
            heading
            subHeading
            layoutStyle
            backgroundStyle
            buttonTitle
            buttonLink

            testimonials {
              nodes {
                __typename

                ... on Testimonial {
                  id
                  title

                  testimonialDetails {
                    review
                    rating
                    location

                    customerImage {
                      node {
                        id
                        sourceUrl
                        altText

                        mediaDetails {
                          width
                          height
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          ... on PageBuilderFieldsPageSectionsProductCardsLayout {
            heading
            subHeading
            description
            columns
            backgroundStyle

            productItems {
              heading
              subHeading
              description
              buttonTitle
              buttonLink

              image {
                node {
                  id
                  sourceUrl
                  altText

                  mediaDetails {
                    width
                    height
                  }
                }
              }
            }
          }
          ... on PageBuilderFieldsPageSectionsComparisonLayout {
            heading
            subHeading
            description
            backgroundStyle

            leftHeading
            leftContent

            leftImage {
              node {
                id
                sourceUrl
                altText
                mediaDetails {
                  width
                  height
                }
              }
            }

            rightHeading
            rightContent

            rightImage {
              node {
                id
                sourceUrl
                altText
                mediaDetails {
                  width
                  height
                }
              }
            }

            comparisonRows {
              label
              leftValue
              rightValue
            }
          }
          ... on PageBuilderFieldsPageSectionsTrustBadgesLayout {
            heading
            subHeading
            description
            columns
            backgroundStyle

            trustBadgeItems {
              heading
              link

              logo {
                node {
                  id
                  sourceUrl
                  altText

                  mediaDetails {
                    width
                    height
                  }
                }
              }
            }
          }
          ... on PageBuilderFieldsPageSectionsInnerHeroLayout {
            heading
            subHeading
            backgroundPosition
            overlayOpacity
            showBreadcrumbs
            textAllignment

            backgroundImage {
              node {
                id
                sourceUrl
                altText

                mediaDetails {
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  }
`;

export async function getPage(
  uri: string,
): Promise<PageData | null> {
  const data = await fetchGraphQL<GetPageResponse>(
    GET_PAGE_QUERY,
    { uri },
  ); 
  return data.page;
}
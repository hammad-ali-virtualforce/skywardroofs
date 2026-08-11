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
  | ServiceAreasSectionData;

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

            teamMembers {
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
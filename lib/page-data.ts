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
};

type GetPageResponse = {
  page: PageData | null;
};
export type PageSection =
  | HeroSectionData
  | PartnersSectionData
  | AboutUsSectionData
  | WorkingWithUsSectionData;
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
console.log("page-data",data);
  return data.page;
}
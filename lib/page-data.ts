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

export type HeroSectionData = {
  __typename: "PageBuilderFieldsPageSectionsHeroLayout";
  heroEyebrow: HeroEyebrowItem[] | null;
  heroHeading: string | null;
  heroDescription: string | null;
  showForm: boolean | null;
  showTrustItems: boolean | null;
  heroBackgroundImage: PageMedia | null;
  heroImage: PageMedia | null;
};

export type PageSection = HeroSectionData;

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

type GetPageResponse = {
  page: PageData | null;
};

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
            showForm
            showTrustItems

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
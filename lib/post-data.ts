import { fetchGraphQL } from "@/lib/graphql";

export type BlogPost = {
  id: string;
  databaseId: number;
  title: string | null;
  slug: string | null;
  uri: string | null;
  date: string | null;
  content: string | null;
  excerpt: string | null;

  author: {
    node: {
      name: string | null;
    } | null;
  } | null;

  categories: {
    nodes: {
      id: string;
      name: string | null;
      slug: string | null;
    }[];
  } | null;

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

const POST_QUERY = `
  query GetPost($slug: ID!) {
    post(
      id: $slug
      idType: SLUG
    ) {
      id
      databaseId
      title
      slug
      uri
      date
      content
      excerpt

      author {
        node {
          name
        }
      }

      categories {
        nodes {
          id
          name
          slug
        }
      }

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
`;

export async function getPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  const data = await fetchGraphQL(
    POST_QUERY,
    {
      slug,
    },
  );

  return data?.post ?? null;
}
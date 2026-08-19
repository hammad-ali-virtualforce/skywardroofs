import { fetchGraphQL } from "@/lib/graphql";

/* =========================================================
   TYPES
========================================================= */

export type BlogPost = {
  id: string;
  databaseId: number;

  title: string | null;
  slug: string | null;
  uri: string | null;

  date: string | null;
  modified: string | null;

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

export type RelatedPost = {
  id: string;
  databaseId: number;

  title: string | null;
  slug: string | null;
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

type GetPostResponse = {
  post: BlogPost | null;
};

type RelatedPostsResponse = {
  posts: {
    nodes: RelatedPost[];
  } | null;
};

/* =========================================================
   SINGLE POST QUERY
========================================================= */

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
      modified

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

/* =========================================================
   RELATED POSTS QUERY
========================================================= */

const RELATED_POSTS_QUERY = `
  query GetRelatedPosts(
    $categoryName: String!
    $exclude: [ID]
  ) {
    posts(
      first: 4
      where: {
        categoryName: $categoryName
        notIn: $exclude
      }
    ) {
      nodes {
        id
        databaseId

        title
        slug
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
`;

/* =========================================================
   GET SINGLE POST
========================================================= */

export async function getPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  const data =
    await fetchGraphQL<GetPostResponse>(
      POST_QUERY,
      {
        slug,
      },
    );

  return data?.post ?? null;
}

/* =========================================================
   GET RELATED POSTS
========================================================= */

export async function getRelatedPosts(
  categoryName: string,
  currentDatabaseId: number,
): Promise<RelatedPost[]> {
  const data =
    await fetchGraphQL<RelatedPostsResponse>(
      RELATED_POSTS_QUERY,
      {
        categoryName,
        exclude: [
          currentDatabaseId,
        ],
      },
    );

  return (
    data?.posts?.nodes ?? []
  );
}
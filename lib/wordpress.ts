import { fetchGraphQL } from "@/lib/graphql";

export type WordPressPage = {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  uri: string;
};

type GetPagesResponse = {
  pages: {
    nodes: WordPressPage[];
  };
};

export async function getPages(): Promise<WordPressPage[]> {
  const data = await fetchGraphQL<GetPagesResponse>(`
    query GetPages {
      pages(first: 100) {
        nodes {
          id
          databaseId
          title
          slug
          uri
        }
      }
    }
  `);

  return data.pages.nodes;
}
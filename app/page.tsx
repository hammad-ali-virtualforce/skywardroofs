import { SectionRenderer } from "@/components/sections/section-renderer";
import { getPage } from "@/lib/page-data";
import type { Metadata } from "next";

import { getRankMathMetadata } from "@/lib/seo";


export async function generateMetadata(): Promise<Metadata> {
  return getRankMathMetadata("/");
}

export default async function HomePage() {
  const page = await getPage("/");

  if (!page) {
    return null;
  }

  const sections =
    page.pageBuilderFields?.pageSections ?? [];

  return (
    <main>
      <SectionRenderer sections={sections} />
    </main>
  );
}

import { notFound } from "next/navigation";

import { getServiceAreaBySlug } from "@/lib/page-data";
import { SectionRenderer } from "@/components/sections/section-renderer";
import { getRankMathMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props) {
  const { slug } = await params;

  return getRankMathMetadata(
    `/service-areas/${slug}/`,
  );
}

export default async function ServiceAreaPage({
  params,
}: Props) {
  const { slug } = await params;

  const area =
    await getServiceAreaBySlug(slug);

  if (!area) {
    notFound();
  }

  const sections =
    area.pageBuilderFields?.pageSections ?? [];

  return (
    <main>
      <SectionRenderer
        sections={sections}
      />
    </main>
  );
}
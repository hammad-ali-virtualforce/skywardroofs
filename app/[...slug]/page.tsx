import { notFound } from "next/navigation";

import { getPage } from "@/lib/page-data";
import { SectionRenderer } from "@/components/sections/section-renderer";
import type {
  Metadata,
} from "next";

import {
  getRankMathMetadata,
} from "@/lib/seo";

type Props = {
  params: Promise<{
    slug: string[];
  }>;
};

export async function generateMetadata({
  params,
}: Props) {
  const { slug } = await params;

  const uri =
    `/${slug.join("/")}/`;

  const page =
    await getPage(uri);

  if (!page) {
    return {};
  }

  const rankMath =
    await getRankMathMetadata(uri);

  return {
    ...rankMath,

    title:
      `${page.title}`,
  };
}


type PageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

export default async function DynamicPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const uri = `/${slug.join("/")}/`;

  console.log("Dynamic page URI:", uri);

  const page = await getPage(uri);

  if (!page) {
    notFound();
  }

  const sections =
    page.pageBuilderFields?.pageSections ?? [];

  return (
    <main>
      <SectionRenderer sections={sections} />
    </main>
  );
}
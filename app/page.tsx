import { SectionRenderer } from "@/components/sections/section-renderer";
import { getPage } from "@/lib/page-data";

export default async function HomePage() {
  const page = await getPage("/");

  if (!page) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-20">
        <h1>Home page not found.</h1>
      </main>
    );
  }

  return (
    <SectionRenderer
      sections={
        page.pageBuilderFields
          ?.pageSections
      }
    />
  );
}
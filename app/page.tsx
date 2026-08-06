import { getPages } from "@/lib/wordpress";

export default async function HomePage() {
  const pages = await getPages();

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-16">
      <h1 className="text-4xl font-bold">
        Next.js is connected to WordPress
      </h1>

      <p className="mt-4 text-gray-600">
        These pages are loaded from your hosted WordPress installation.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">
        Published WordPress pages
      </h2>

      {pages.length > 0 ? (
        <ul className="mt-5 space-y-3">
          {pages.map((page) => (
            <li
              key={page.id}
              className="rounded-lg border border-gray-200 px-4 py-3"
            >
              <strong>{page.title}</strong>

              <div className="mt-1 text-sm text-gray-500">
                {page.uri}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-5">
          No published WordPress pages were found.
        </p>
      )}
    </main>
  );
}
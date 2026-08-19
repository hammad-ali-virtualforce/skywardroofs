import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  FolderOpen,
  User,
} from "lucide-react";

import {
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/post-data";

import {
  getRankMathMetadata,
} from "@/lib/seo";

/* =========================================================
   PROPS
========================================================= */

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

/* =========================================================
   SEO
========================================================= */

export async function generateMetadata({
  params,
}: Props) {
  const { slug } = await params;

  return getRankMathMetadata(
    `/blog/${slug}/`,
  );
}

/* =========================================================
   PAGE
========================================================= */

export default async function BlogPostPage({
  params,
}: Props) {
  const { slug } = await params;

  const post =
    await getPostBySlug(slug);

  if (!post) {
    notFound();
  }
  


  const image =
    post.featuredImage?.node ??
    null;

  const categories =
    post.categories?.nodes ??
    [];

  const primaryCategory =
    categories[0] ?? null;

  const readingTime =
    post.content
      ? calculateReadingTime(
          post.content,
        )
      : null;

  const relatedPosts =
    primaryCategory?.name
      ? await getRelatedPosts(
          primaryCategory.name,
          post.databaseId,
        )
      : [];

  /* =======================================================
     BLOG POST SCHEMA
  ======================================================= */

 const blogSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",

  headline:
    post.title ?? undefined,

  datePublished:
    post.date ?? undefined,

  dateModified:
    post.modified ??
    post.date ??
    undefined,

  author: {
    "@type": "Person",
    name:
      post.author?.node?.name ||
      "Skyward Roofing",
  },

  publisher: {
    "@type": "Organization",
    name:
      "Skyward Roofing & Restoration",
  },

  image:
    image?.sourceUrl
      ? [image.sourceUrl]
      : undefined,

  mainEntityOfPage: {
    "@type": "WebPage",
    "@id":
      `https://www.skywardroofs.com/blog/${slug}/`,
  },
};

  return (
    <main>
      {/* =========================================
          BLOG POST SCHEMA
      ========================================= */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              blogSchema,
            ),
        }}
      />

      {/* =========================================
          HERO
      ========================================= */}

      <section className="relative overflow-hidden bg-gradient-to-br from-[#121012] via-[#35171c] to-[#75333d] px-6 pb-24 pt-20 text-white lg:px-8 lg:pb-32 lg:pt-28">
        <div className="mx-auto max-w-[1100px] text-center">

          {/* BREADCRUMBS */}

          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center justify-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-white/65"
          >
            <Link
              href="/"
              className="transition-colors hover:text-white"
            >
              Home
            </Link>

            <span>/</span>

            <Link
              href="/blog/"
              className="transition-colors hover:text-white"
            >
              Blog
            </Link>

            {post.title && (
              <>
                <span>/</span>

                <span
                  className="max-w-[300px] truncate text-white"
                  aria-current="page"
                >
                  {post.title}
                </span>
              </>
            )}
          </nav>

          {/* CATEGORIES */}

          {categories.length >
            0 && (
            <div className="mb-5 flex flex-wrap justify-center gap-2">
              {categories.map(
                (
                  category,
                ) => (
                  <span
                    key={
                      category.id
                    }
                    className="bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em]"
                  >
                    {
                      category.name
                    }
                  </span>
                ),
              )}
            </div>
          )}

          {/* TITLE */}

          {post.title && (
            <h1 className="text-4xl font-black uppercase leading-[1] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              {post.title}
            </h1>
          )}

          {/* EXCERPT */}

          {post.excerpt && (
            <div
              className="mx-auto mt-6 max-w-[800px] text-lg leading-8 text-white/75 [&_p]:m-0"
              dangerouslySetInnerHTML={{
                __html:
                  post.excerpt,
              }}
            />
          )}

          {/* META */}

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm text-white/70">

            {/* DATE */}

            {post.date && (
              <span className="inline-flex items-center gap-2">
                <CalendarDays
                  size={16}
                />

                <time
                  dateTime={
                    post.date
                  }
                >
                  {formatPostDate(
                    post.date,
                  )}
                </time>
              </span>
            )}

            {/* AUTHOR */}

            {post.author?.node
              ?.name && (
              <span className="inline-flex items-center gap-2">
                <User
                  size={16}
                />

                {
                  post.author
                    .node.name
                }
              </span>
            )}

            {/* CATEGORY */}

            {primaryCategory?.name && (
              <span className="inline-flex items-center gap-2">
                <FolderOpen
                  size={16}
                />

                {
                  primaryCategory.name
                }
              </span>
            )}

            {/* READING TIME */}

            {readingTime && (
              <span className="inline-flex items-center gap-2">
                <Clock3
                  size={16}
                />

                {readingTime} min
                read
              </span>
            )}
          </div>
        </div>
      </section>

      {/* =========================================
          FEATURED IMAGE
      ========================================= */}

      {image && (
        <section className="relative z-10 mx-auto -mt-14 max-w-[1300px] px-6 lg:-mt-20 lg:px-8">
          <div className="relative aspect-[16/8] overflow-hidden bg-[#eee] shadow-xl">
            <Image
              src={
                image.sourceUrl
              }
              alt={
                image.altText ||
                post.title ||
                ""
              }
              fill
              priority
              sizes="(min-width: 1400px) 1300px, 100vw"
              className="object-cover"
            />
          </div>
        </section>
      )}

      {/* =========================================
          ARTICLE + SIDEBAR
      ========================================= */}

      <section className="bg-white px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-[1300px] gap-14 lg:grid-cols-[minmax(0,850px)_300px]">

          {/* =====================================
              MAIN ARTICLE
          ===================================== */}

          <article>
            {post.content && (
              <div
                className="
                  text-[18px]
                  leading-[1.85]
                  text-black/75

                  [&>p]:mb-7

                  [&_h2]:mb-5
                  [&_h2]:mt-14
                  [&_h2]:text-3xl
                  [&_h2]:font-black
                  [&_h2]:uppercase
                  [&_h2]:leading-tight
                  [&_h2]:tracking-[-0.025em]
                  [&_h2]:text-[#252525]

                  [&_h3]:mb-4
                  [&_h3]:mt-10
                  [&_h3]:text-2xl
                  [&_h3]:font-black
                  [&_h3]:leading-tight
                  [&_h3]:text-[#252525]

                  [&_h4]:mb-3
                  [&_h4]:mt-8
                  [&_h4]:text-xl
                  [&_h4]:font-bold
                  [&_h4]:text-[#252525]

                  [&_a]:font-semibold
                  [&_a]:text-[#75333d]
                  [&_a]:underline
                  [&_a]:underline-offset-4

                  [&_strong]:font-bold
                  [&_strong]:text-[#252525]

                  [&_ul]:my-7
                  [&_ul]:list-disc
                  [&_ul]:space-y-3
                  [&_ul]:pl-7

                  [&_ol]:my-7
                  [&_ol]:list-decimal
                  [&_ol]:space-y-3
                  [&_ol]:pl-7

                  [&_blockquote]:my-10
                  [&_blockquote]:border-l-4
                  [&_blockquote]:border-[#75333d]
                  [&_blockquote]:bg-[#f7f7f7]
                  [&_blockquote]:px-7
                  [&_blockquote]:py-6
                  [&_blockquote]:text-xl
                  [&_blockquote]:font-semibold
                  [&_blockquote]:italic
                  [&_blockquote]:text-[#252525]

                  [&_img]:my-10
                  [&_img]:h-auto
                  [&_img]:w-full

                  [&_figure]:my-10

                  [&_figcaption]:mt-3
                  [&_figcaption]:text-center
                  [&_figcaption]:text-sm
                  [&_figcaption]:text-black/50

                  [&_table]:my-10
                  [&_table]:w-full
                  [&_table]:border-collapse

                  [&_th]:border
                  [&_th]:border-black/10
                  [&_th]:bg-[#75333d]
                  [&_th]:p-4
                  [&_th]:text-left
                  [&_th]:text-white

                  [&_td]:border
                  [&_td]:border-black/10
                  [&_td]:p-4
                "
                dangerouslySetInnerHTML={{
                  __html:
                    post.content,
                }}
              />
            )}

            {/* BACK TO BLOG */}

            <div className="mt-16 border-t border-black/10 pt-8">
              <Link
                href="/blog/"
                className="inline-flex items-center gap-2 font-bold uppercase text-[#75333d] transition-all hover:gap-3"
              >
                <ArrowLeft
                  size={18}
                />

                Back to Blog
              </Link>
            </div>
          </article>

          {/* =====================================
              SIDEBAR
          ===================================== */}

          <aside>
            <div className="sticky top-[120px] space-y-7">

              {/* CTA CARD */}

              <div className="bg-[#75333d] p-8 text-white">
                <p className="text-sm font-bold uppercase tracking-[0.12em] text-white/70">
                  Need Roofing
                  Help?
                </p>

                <h2 className="mt-3 text-2xl font-black uppercase leading-tight">
                  Call On The Sky
                  Guys
                </h2>

                <p className="mt-4 leading-7 text-white/80">
                  Have questions
                  about your roof?
                  Schedule a free
                  inspection with
                  Skyward Roofing.
                </p>

                <Link
                  href="/contact/"
                  className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 bg-white px-5 font-bold uppercase text-[#75333d] transition-transform hover:-translate-y-1"
                >
                  Free Inspection

                  <ArrowRight
                    size={17}
                  />
                </Link>
              </div>

              
              {/* AUTHOR CARD */}

              {post.author?.node
                ?.name && (
                <div className="border border-black/10 p-7">
                  <p className="text-sm font-bold uppercase tracking-[0.1em] text-black/45">
                    Written By
                  </p>

                  <p className="mt-2 text-lg font-black text-[#252525]">
                    {
                      post.author
                        .node.name
                    }
                  </p>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>

      {/* =========================================
          MAIN CTA
      ========================================= */}

      <section className="bg-[#121012] px-6 py-20 text-white lg:px-8">
        <div className="mx-auto max-w-[900px] text-center">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#c98992]">
            NEED HELP WITH YOUR
            ROOF?
          </p>

          <h2 className="mt-3 text-3xl font-black uppercase leading-tight sm:text-4xl lg:text-5xl">
            PUT THE SKY GUYS TO
            WORK
          </h2>

          <p className="mx-auto mt-5 max-w-[650px] text-lg leading-8 text-white/70">
            Have questions about
            your roof or think it
            may be time for an
            inspection? Our team
            is ready to help.
          </p>

          <Link
            href="/contact/"
            className="mt-8 inline-flex min-h-14 items-center justify-center gap-3 bg-[#75333d] px-8 font-black uppercase text-white transition-all hover:-translate-y-1 hover:bg-white hover:text-[#75333d]"
          >
            Request A Free
            Inspection

            <ArrowRight
              size={18}
            />
          </Link>
        </div>
      </section>

      {/* =========================================
          RELATED POSTS
      ========================================= */}

      {relatedPosts.length > 0 && (
      <section className="bg-[#f7f7f7] px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-[1500px]">
          <div className="mx-auto max-w-[800px] text-center">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#75333d]">
              KEEP READING
            </p>

            <h2 className="mt-3 text-3xl font-black uppercase leading-tight text-[#252525] sm:text-4xl lg:text-5xl">
              RELATED ROOFING ARTICLES
            </h2>
          </div>

          <div className="mt-14 grid gap-7 md:grid-cols-2 xl:grid-cols-4">
            {relatedPosts.map((related) => {
              const relatedImage =
                related.featuredImage?.node ?? null;

              const relatedUrl =
                related.slug
                  ? `/blog/${related.slug}/`
                  : "#";

              return (
                <article
                  key={related.id}
                  className="group flex h-full flex-col overflow-hidden bg-white"
                >
                  {relatedImage && (
                    <Link
                      href={relatedUrl}
                      className="relative block aspect-[16/10] overflow-hidden"
                    >
                      <Image
                        src={relatedImage.sourceUrl}
                        alt={
                          relatedImage.altText ||
                          related.title ||
                          ""
                        }
                        fill
                        sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </Link>
                  )}

                  <div className="flex flex-1 flex-col p-7">
                    {related.date && (
                      <time
                        dateTime={related.date}
                        className="text-sm font-bold uppercase tracking-[0.08em] text-[#75333d]"
                      >
                        {formatPostDate(related.date)}
                      </time>
                    )}

                    {related.title && (
                      <h3 className="mt-3 text-xl font-black leading-tight text-[#252525]">
                        <Link
                          href={relatedUrl}
                          className="transition-colors hover:text-[#75333d]"
                        >
                          {related.title}
                        </Link>
                      </h3>
                    )}

                    {related.excerpt && (
                      <div
                        className="mt-4 line-clamp-3 leading-7 text-black/65 [&_p]:m-0"
                        dangerouslySetInnerHTML={{
                          __html: related.excerpt,
                        }}
                      />
                    )}

                    {related.slug && (
                      <div className="mt-auto pt-7">
                        <Link
                          href={relatedUrl}
                          className="inline-flex items-center gap-2 font-bold uppercase text-[#75333d] transition-all duration-300 group-hover:gap-3"
                        >
                          Read More

                          <ArrowRight size={17} />
                        </Link>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/blog/"
              className="inline-flex min-h-14 items-center justify-center gap-3 bg-[#75333d] px-8 py-3 font-bold uppercase text-white transition-all duration-300 hover:-translate-y-1 hover:bg-black"
            >
              View All Articles

              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    )}
    </main>
  );
}

/* =========================================================
   DATE
========================================================= */

function formatPostDate(
  date: string,
) {
  return new Intl.DateTimeFormat(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    },
  ).format(
    new Date(date),
  );
}

/* =========================================================
   READING TIME
========================================================= */

function calculateReadingTime(
  html: string,
) {
  const text = html
    .replace(
      /<[^>]*>/g,
      " ",
    )
    .replace(
      /\s+/g,
      " ",
    )
    .trim();

  const words =
    text.length > 0
      ? text.split(" ")
          .length
      : 0;

  return Math.max(
    1,
    Math.ceil(
      words / 220,
    ),
  );
}
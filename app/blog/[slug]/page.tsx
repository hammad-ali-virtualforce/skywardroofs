import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  CalendarDays,
  User,
  FolderOpen,
} from "lucide-react";

import {
  getPostBySlug,
} from "@/lib/post-data";

import {
  getRankMathMetadata,
} from "@/lib/seo";

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
    `/blog/${slug}/`,
  );
}

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
    post.featuredImage?.node ?? null;

  const categories =
    post.categories?.nodes ?? [];

  return (
    <main>
      {/* HERO */}

      <section
        className="
          relative
          overflow-hidden
          bg-gradient-to-br
          from-[#121012]
          via-[#35171c]
          to-[#75333d]
          py-20
          text-white
          lg:py-28
        "
      >
        <div
          className="
            mx-auto
            max-w-[1100px]
            px-6
            text-center
            lg:px-8
          "
        >
          {/* Breadcrumb */}

          <nav
            className="
              mb-6
              flex
              flex-wrap
              items-center
              justify-center
              gap-2
              text-sm
              font-semibold
              uppercase
              tracking-[0.08em]
              text-white/65
            "
          >
            <Link
              href="/"
              className="hover:text-white"
            >
              Home
            </Link>

            <span>/</span>

            <Link
              href="/blog/"
              className="hover:text-white"
            >
              Blog
            </Link>
          </nav>

          {/* Categories */}

          {categories.length > 0 && (
            <div
              className="
                mb-5
                flex
                flex-wrap
                justify-center
                gap-2
              "
            >
              {categories.map(
                (category) => (
                  <span
                    key={category.id}
                    className="
                      bg-white/10
                      px-3
                      py-1
                      text-xs
                      font-bold
                      uppercase
                      tracking-[0.12em]
                    "
                  >
                    {category.name}
                  </span>
                ),
              )}
            </div>
          )}

          {post.title && (
            <h1
              className="
                text-4xl
                font-black
                uppercase
                leading-[1]
                tracking-[-0.04em]
                sm:text-5xl
                lg:text-6xl
              "
            >
              {post.title}
            </h1>
          )}

          {/* Meta */}

          <div
            className="
              mt-7
              flex
              flex-wrap
              items-center
              justify-center
              gap-5
              text-sm
              text-white/70
            "
          >
            {post.date && (
              <span
                className="
                  inline-flex
                  items-center
                  gap-2
                "
              >
                <CalendarDays
                  size={16}
                />

                {formatPostDate(
                  post.date,
                )}
              </span>
            )}

            {post.author?.node
              ?.name && (
              <span
                className="
                  inline-flex
                  items-center
                  gap-2
                "
              >
                <User size={16} />

                {
                  post.author.node
                    .name
                }
              </span>
            )}

            {categories[0]
              ?.name && (
              <span
                className="
                  inline-flex
                  items-center
                  gap-2
                "
              >
                <FolderOpen
                  size={16}
                />

                {
                  categories[0]
                    .name
                }
              </span>
            )}
          </div>
        </div>
      </section>

      {/* FEATURED IMAGE */}

      {image && (
        <div
          className="
            mx-auto
            -mt-8
            max-w-[1250px]
            px-6
            lg:px-8
          "
        >
          <div
            className="
              relative
              aspect-[16/8]
              overflow-hidden
              shadow-xl
            "
          >
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
              sizes="
                (min-width: 1280px)
                1200px,
                100vw
              "
              className="
                object-cover
              "
            />
          </div>
        </div>
      )}

      {/* ARTICLE */}

      <article
        className="
          mx-auto
          max-w-[900px]
          px-6
          py-16
          lg:py-20
        "
      >
        {post.content && (
          <div
            className="
              prose
              prose-lg
              max-w-none
              prose-headings:font-black
              prose-headings:uppercase
              prose-headings:text-[#252525]

              prose-h2:mt-14
              prose-h2:text-3xl

              prose-h3:text-2xl

              prose-p:leading-8
              prose-p:text-black/75

              prose-a:font-semibold
              prose-a:text-[#75333d]

              prose-strong:text-[#252525]

              prose-li:text-black/75

              prose-img:my-10
              prose-img:w-full
            "
            dangerouslySetInnerHTML={{
              __html:
                post.content,
            }}
          />
        )}
      </article>

      {/* CTA */}

      <section
        className="
          bg-[#121012]
          py-16
          text-white
        "
      >
        <div
          className="
            mx-auto
            max-w-[900px]
            px-6
            text-center
          "
        >
          <p
            className="
              text-sm
              font-black
              uppercase
              tracking-[0.18em]
              text-[#c98992]
            "
          >
            NEED HELP WITH YOUR ROOF?
          </p>

          <h2
            className="
              mt-3
              text-3xl
              font-black
              uppercase
              sm:text-4xl
            "
          >
            PUT THE SKY GUYS TO WORK
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-[650px]
              leading-7
              text-white/70
            "
          >
            Have questions about
            your roof or think it
            may be time for an
            inspection? Our team
            is ready to help.
          </p>

          <Link
            href="/contact/"
            className="
              mt-8
              inline-flex
              min-h-14
              items-center
              justify-center
              bg-[#75333d]
              px-8
              font-black
              uppercase
              text-white
              transition-all
              hover:-translate-y-1
              hover:bg-white
              hover:text-[#75333d]
            "
          >
            Request A Free Inspection
          </Link>
        </div>
      </section>
    </main>
  );
}

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
  ).format(new Date(date));
}
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type {
  BlogSectionData,
} from "@/lib/page-data";

type BlogSectionProps = {
  data: BlogSectionData;
};

export function BlogSection({
  data,
}: BlogSectionProps) {
  const limit = data.noOfPosts
    ? Math.max(1, Math.floor(data.noOfPosts))
    : 3;

  const posts = (
    data.posts?.nodes ?? []
  ).slice(0, limit);

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-8">

        {/* =========================
            SECTION HEADER
        ========================== */}

        <div className="mx-auto max-w-[850px] text-center">
          {data.heading && (
            <h2
              className="
                text-3xl
                font-black
                uppercase
                leading-[1.05]
                tracking-[-0.035em]
                text-[#252525]
                sm:text-4xl
                lg:text-5xl
              "
            >
              {data.heading}
            </h2>
          )}

          {data.description && (
            <div
              className="
                mx-auto
                mt-6
                max-w-[720px]
                text-lg
                leading-8
                text-black/65

                [&_p]:mb-4
                [&_p:last-child]:mb-0
              "
              dangerouslySetInnerHTML={{
                __html: data.description,
              }}
            />
          )}
        </div>

        {/* =========================
            BLOG GRID
        ========================== */}

        {posts.length > 0 && (
          <div
            className="
              mt-14
              grid
              gap-7
              md:grid-cols-2
              lg:grid-cols-3
            "
          >
            {posts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
              />
            ))}
          </div>
        )}

        {/* =========================
            VIEW ALL BUTTON
        ========================== */}

        {data.buttonTitle &&
          data.buttonLink && (
            <div className="mt-12 text-center">
              <Link
                href={data.buttonLink}
                className="
                  inline-flex
                  min-h-14
                  items-center
                  justify-center
                  gap-3
                  bg-[#75333d]
                  px-8
                  py-3
                  font-bold
                  uppercase
                  text-white
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-black
                "
              >
                {data.buttonTitle}

                <ArrowRight
                  size={18}
                  aria-hidden="true"
                />
              </Link>
            </div>
          )}
      </div>
    </section>
  );
}

function BlogCard({
  post,
}: {
  post: NonNullable<
    BlogSectionData["posts"]
  >["nodes"][number];
}) {
  const image =
    post.featuredImage?.node;

  return (
    <article
      className="
        group
        flex
        h-full
        flex-col
        overflow-hidden
        bg-[#f5f5f5]
      "
    >
      {/* IMAGE */}

      {image && (
        <Link
          href={post.uri || "#"}
          className="
            relative
            block
            aspect-[16/10]
            overflow-hidden
          "
        >
          <Image
            src={image.sourceUrl}
            alt={
              image.altText ||
              post.title ||
              ""
            }
            fill
            sizes="
              (min-width: 1024px) 33vw,
              (min-width: 768px) 50vw,
              100vw
            "
            className="
              object-cover
              transition-transform
              duration-700
              group-hover:scale-105
            "
          />
        </Link>
      )}

      {/* CONTENT */}

      <div
        className="
          flex
          flex-1
          flex-col
          p-7
          lg:p-8
        "
      >
        {post.date && (
          <time
            dateTime={post.date}
            className="
              text-sm
              font-bold
              uppercase
              tracking-[0.08em]
              text-[#75333d]
            "
          >
            {formatPostDate(post.date)}
          </time>
        )}

        {post.title && (
          <h3
            className="
              mt-3
              text-2xl
              font-black
              leading-tight
              text-[#252525]
            "
          >
            <Link
              href={post.uri || "#"}
              className="
                transition-colors
                hover:text-[#75333d]
              "
            >
              {post.title}
            </Link>
          </h3>
        )}

        {post.excerpt && (
          <div
            className="
              mt-4
              line-clamp-3
              leading-7
              text-black/65

              [&_p]:m-0
            "
            dangerouslySetInnerHTML={{
              __html: post.excerpt,
            }}
          />
        )}

        {post.uri && (
          <div className="mt-auto pt-7">
            <Link
              href={post.uri}
              className="
                inline-flex
                items-center
                gap-2
                font-bold
                uppercase
                text-[#75333d]
                transition-all
                duration-300

                group-hover:gap-3
              "
            >
              Read More

              <ArrowRight
                size={17}
                aria-hidden="true"
              />
            </Link>
          </div>
        )}
      </div>
    </article>
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
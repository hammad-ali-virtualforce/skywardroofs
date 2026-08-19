import type { Metadata } from "next";

const WP_URL =
  process.env.WORDPRESS_URL!;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL!;

const SITE_NAME =
  "Skyward Roofing & Restoration";

const DEFAULT_DESCRIPTION =
  "Professional roofing services from Skyward Roofing & Restoration.";

type RankMathResponse = {
  success?: boolean;
  head?: string;
};

function extractMeta(
  html: string,
  property: string,
) {
  const regex = new RegExp(
    `<meta[^>]+(?:name|property)=["']${property}["'][^>]+content=["']([^"']*)["'][^>]*>`,
    "i",
  );

  const reverseRegex = new RegExp(
    `<meta[^>]+content=["']([^"']*)["'][^>]+(?:name|property)=["']${property}["'][^>]*>`,
    "i",
  );

  return (
    html.match(regex)?.[1] ||
    html.match(reverseRegex)?.[1] ||
    null
  );
}

function extractTitle(
  html: string,
) {
  return (
    html.match(
      /<title[^>]*>(.*?)<\/title>/i,
    )?.[1] || null
  );
}

function extractCanonical(
  html: string,
) {
  return (
    html.match(
      /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i,
    )?.[1] ||
    html.match(
      /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i,
    )?.[1] ||
    null
  );
}

/* =========================================
   TITLE CLEANUP
========================================= */

function buildSiteTitle(
  title: string | null,
) {
  const cleanTitle =
    title?.trim();

  if (!cleanTitle) {
    return SITE_NAME;
  }

  /*
   * If Rank Math already contains
   * Skyward Roofing, don't add it again.
   */
  if (
    cleanTitle
      .toLowerCase()
      .includes(
        "skyward roofing",
      )
  ) {
    return cleanTitle;
  }

  return `${cleanTitle} | Skyward Roofing`;
}

/* =========================================
   SEO
========================================= */

export async function getRankMathMetadata(
  path: string,
): Promise<Metadata> {
  const normalizedPath =
    path.startsWith("/")
      ? path
      : `/${path}`;

  const wordpressPageUrl =
    `${WP_URL}${normalizedPath}`;

  const endpoint =
    `${WP_URL}/wp-json/rankmath/v1/getHead` +
    `?url=${encodeURIComponent(
      wordpressPageUrl,
    )}`;

  try {
    const response =
      await fetch(
        endpoint,
        {
          next: {
            revalidate: 300,
          },
        },
      );

    if (!response.ok) {
      return {
        title: SITE_NAME,
        description:
          DEFAULT_DESCRIPTION,
      };
    }

    const data: RankMathResponse =
      await response.json();

    const head =
      data.head || "";

    if (!head) {
      return {
        title: SITE_NAME,
        description:
          DEFAULT_DESCRIPTION,
      };
    }

    const rankMathTitle =
      extractTitle(head);

    const finalTitle =
      buildSiteTitle(
        rankMathTitle,
      );

    const description =
      extractMeta(
        head,
        "description",
      );

    const canonical =
      extractCanonical(head);

    const ogTitle =
      extractMeta(
        head,
        "og:title",
      );

    const ogDescription =
      extractMeta(
        head,
        "og:description",
      );

    const ogImage =
      extractMeta(
        head,
        "og:image",
      );

    const twitterCard =
      extractMeta(
        head,
        "twitter:card",
      );

    const twitterTitle =
      extractMeta(
        head,
        "twitter:title",
      );

    const twitterDescription =
      extractMeta(
        head,
        "twitter:description",
      );

    const twitterImage =
      extractMeta(
        head,
        "twitter:image",
      );

    /*
     * Replace WordPress domain
     * with frontend domain.
     */
    const frontendCanonical =
      canonical
        ? canonical.replace(
            WP_URL,
            SITE_URL,
          )
        : `${SITE_URL}${normalizedPath}`;

    return {
      title:
        finalTitle,

      description:
        description ||
        DEFAULT_DESCRIPTION,

      alternates: {
        canonical:
          frontendCanonical,
      },

      openGraph: {
        title:
          buildSiteTitle(
            ogTitle ||
            rankMathTitle,
          ),

        description:
          ogDescription ||
          description ||
          DEFAULT_DESCRIPTION,

        url:
          frontendCanonical,

        siteName:
          SITE_NAME,

        images:
          ogImage
            ? [
                {
                  url: ogImage,
                },
              ]
            : undefined,
      },

      twitter: {
        card:
          twitterCard ===
          "summary"
            ? "summary"
            : "summary_large_image",

        title:
          buildSiteTitle(
            twitterTitle ||
            ogTitle ||
            rankMathTitle,
          ),

        description:
          twitterDescription ||
          ogDescription ||
          description ||
          DEFAULT_DESCRIPTION,

        images:
          twitterImage ||
          ogImage
            ? [
                twitterImage ||
                  ogImage!,
              ]
            : undefined,
      },
    };
  } catch (error) {
    console.error(
      "Rank Math SEO error:",
      error,
    );

    return {
      title:
        SITE_NAME,

      description:
        DEFAULT_DESCRIPTION,
    };
  }
}
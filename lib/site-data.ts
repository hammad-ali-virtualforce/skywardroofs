import { fetchGraphQL } from "@/lib/graphql";

/* -------------------------------------------------------------------------- */
/*                                  MENU TYPES                                */
/* -------------------------------------------------------------------------- */

export type MenuItem = {
  id: string;
  parentId: string | null;
  databaseId: number;
  label: string;
  path: string | null;
  uri: string | null;
  url: string | null;
  target: string | null;
  cssClasses: string[] | null;
};

export type MenuItemTree = MenuItem & {
  children: MenuItemTree[];
};

/* -------------------------------------------------------------------------- */
/*                                  MEDIA TYPE                                */
/* -------------------------------------------------------------------------- */

export type MediaItem = {
  node: {
    id: string;
    sourceUrl: string;
    altText: string | null;
    mediaDetails: {
      width: number | null;
      height: number | null;
    } | null;
  } | null;
};

/* -------------------------------------------------------------------------- */
/*                                SOCIAL TYPE                                 */
/* -------------------------------------------------------------------------- */

export type SocialLink = {
  platform:
    | string
    | string[]
    | {
        value?: string;
        label?: string;
      }
    | null;

  url: string | null;
  accessibleLabel: string | null;
  openInNewTab: boolean | null;
};

/* -------------------------------------------------------------------------- */
/*                              BRANDING SETTINGS                             */
/* -------------------------------------------------------------------------- */

export type BrandingSettings = {
  headerLogo: MediaItem | null;
  footerLogo: MediaItem | null;
};

/* -------------------------------------------------------------------------- */
/*                               TOP BAR SETTINGS                             */
/* -------------------------------------------------------------------------- */

export type TopBarSettings = {
  showTopBar: boolean | null;
  licenseNumber: string | null;
  topBarMessage: string | null;
  topBarMessageLink: string | null;
  topBarBackgroundColor: string | null;
  topBarBackgroundImage: MediaItem | null;
  topBarTextColor: string | null;
  topBarSocialLinks: SocialLink[] | null;
};

/* -------------------------------------------------------------------------- */
/*                               HEADER SETTINGS                              */
/* -------------------------------------------------------------------------- */

export type HeaderSettings = {
  showCallButton: boolean | null;

  // Your ACF field is call_button_small_text
  callButtonSmallText: string | null;

  phoneNumber: string | null;
  phoneLink: string | null;
  callButtonBackground: string | null;
  callButtonTextColor: string | null;

  stickyHeader: boolean | null;
  mainHeaderBackground: string | null;
  menuTextColor: string | null;
  menuHoverColor: string | null;
};

/* -------------------------------------------------------------------------- */
/*                               FOOTER SETTINGS                              */
/* -------------------------------------------------------------------------- */

export type FooterSettings = {
  footerDescription: string | null;

  footerColumnTwoHeading: string | null;
  footerColumnThreeHeading: string | null;
  footerContactHeading: string | null;

  footerBackgroundColor: string | null;
  footerTextColor: string | null;

  footerEmailAddress: string | null;
  footerBusinessAddress: string | null;
  footerPhoneNumber: string | null;

  showFooterCta: boolean | null;

  footerCtaSocialHeading: string | null;
  footerSocialMedia: SocialLink[] | null;

  footerCtaHeading: string | null;
  footerCtaButtonText: string | null;
  footerCtaButtonUrl: string | null;

  footerCtaBackgroundImage: MediaItem | null;
  footerCtaBackgroundColor: string | null;
  footerCtaTextColor: string | null;

  copyrightText: string | null;
  copyrightLicenseNumber: string | null;
};

/* -------------------------------------------------------------------------- */
/*                              GRAPHQL RESPONSE                              */
/* -------------------------------------------------------------------------- */

type SiteDataResponse = {
  headerLeftMenu: {
    nodes: MenuItem[];
  };

  headerRightMenu: {
    nodes: MenuItem[];
  };

  footerMenuOne: {
    nodes: MenuItem[];
  };

  footerMenuTwo: {
    nodes: MenuItem[];
  };

  siteSettings: {
    brandingSettings: BrandingSettings;
    topBarTab: TopBarSettings;
    headerSettings: HeaderSettings;
    footerSettings: FooterSettings;
  };
};

/* -------------------------------------------------------------------------- */
/*                                GRAPHQL QUERY                               */
/* -------------------------------------------------------------------------- */

const SITE_DATA_QUERY = `
  query GetGlobalSiteData {
    headerLeftMenu: menuItems(
      first: 100
      where: { location: HEADER_LEFT_MENU }
    ) {
      nodes {
        id
        parentId
        databaseId
        label
        path
        uri
        url
        target
        cssClasses
      }
    }

    headerRightMenu: menuItems(
      first: 100
      where: { location: HEADER_RIGHT_MENU }
    ) {
      nodes {
        id
        parentId
        databaseId
        label
        path
        uri
        url
        target
        cssClasses
      }
    }

    footerMenuOne: menuItems(
      first: 100
      where: { location: FOOTER_MENU_ONE }
    ) {
      nodes {
        id
        parentId
        databaseId
        label
        path
        uri
        url
        target
        cssClasses
      }
    }

    footerMenuTwo: menuItems(
      first: 100
      where: { location: FOOTER_MENU_TWO }
    ) {
      nodes {
        id
        parentId
        databaseId
        label
        path
        uri
        url
        target
        cssClasses
      }
    }

    siteSettings {
      brandingSettings {
        headerLogo {
          node {
            id
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }

        footerLogo {
          node {
            id
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
      }

      topBarTab {
        showTopBar
        licenseNumber
        topBarMessage
        topBarMessageLink
        topBarBackgroundColor
        topBarBackgroundImage{
          node {
            id
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
        topBarTextColor

        topBarSocialLinks {
          platform
          url
          accessibleLabel
          openInNewTab
        }
      }

      headerSettings {
        showCallButton
        callButtonSmallText
        phoneNumber
        phoneLink
        callButtonBackground
        callButtonTextColor
        stickyHeader
        mainHeaderBackground
        menuTextColor
        menuHoverColor
      }

      footerSettings {
        footerDescription
        footerColumnTwoHeading
        footerColumnThreeHeading
        footerContactHeading
        footerBackgroundColor
        footerTextColor

        footerEmailAddress
        footerBusinessAddress
        footerPhoneNumber

        showFooterCta
        footerCtaSocialHeading

        footerSocialMedia {
          platform
          url
          accessibleLabel
          openInNewTab
        }

        footerCtaHeading
        footerCtaButtonText
        footerCtaButtonUrl

        footerCtaBackgroundImage {
          node {
            id
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }

        footerCtaBackgroundColor
        footerCtaTextColor

        copyrightText
        copyrightLicenseNumber
      }
    }
  }
`;

/* -------------------------------------------------------------------------- */
/*                               GET SITE DATA                                */
/* -------------------------------------------------------------------------- */

export async function getSiteData() {
  const data = await fetchGraphQL<SiteDataResponse>(
    SITE_DATA_QUERY,
  );

  return {
    headerLeftMenu: buildMenuTree(
      data.headerLeftMenu.nodes,
    ),

    headerRightMenu: buildMenuTree(
      data.headerRightMenu.nodes,
    ),

    footerMenuOne: buildMenuTree(
      data.footerMenuOne.nodes,
    ),

    footerMenuTwo: buildMenuTree(
      data.footerMenuTwo.nodes,
    ),

    branding: data.siteSettings.brandingSettings,

    topBar: data.siteSettings.topBarTab,

    header: data.siteSettings.headerSettings,

    footer: data.siteSettings.footerSettings,
  };
}

/* -------------------------------------------------------------------------- */
/*                              BUILD MENU TREE                               */
/* -------------------------------------------------------------------------- */

export function buildMenuTree(
  items: MenuItem[],
): MenuItemTree[] {
  const itemMap = new Map<string, MenuItemTree>();

  for (const item of items) {
    itemMap.set(item.id, {
      ...item,
      children: [],
    });
  }

  const roots: MenuItemTree[] = [];

  for (const item of itemMap.values()) {
    if (
      item.parentId &&
      itemMap.has(item.parentId)
    ) {
      itemMap
        .get(item.parentId)
        ?.children.push(item);
    } else {
      roots.push(item);
    }
  }

  return roots;
}
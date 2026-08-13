import Image from "next/image";
import Link from "next/link";
import { ChevronDown, PhoneCall, } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa6";

import type {
  BrandingSettings,
  HeaderSettings,
  MenuItemTree,
  TopBarSettings,
} from "@/lib/site-data";
import { MobileHeader, } from "@/components/layout/mobile-header";
type SiteHeaderProps = {
  leftMenu: MenuItemTree[];
  rightMenu: MenuItemTree[];
  branding: BrandingSettings;
  topBar: TopBarSettings;
  settings: HeaderSettings;
};
const socialIcons = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  youtube: FaTiktok,
  tiktok: FaYoutube,
};

function getMenuHref(item: MenuItemTree) {
  return item.path || item.uri || item.url || "#";
}

function MenuItems({
  items,
  textColor,
}: {
  items: MenuItemTree[];
  textColor: string;
}) {
  return (
    <>
      {items.map((item) => (
        <div key={item.id} className="group relative">
          <Link
            href={getMenuHref(item)}
            target={item.target || undefined}
            className="inline-flex items-center gap-2 py-4 text-[16px] font-medium transition-opacity hover:opacity-70"
            style={{ color: textColor }}
          >
            {item.label}

            {item.children.length > 0 && (
              <ChevronDown
                size={16}
                aria-hidden="true"
              />
            )}
          </Link>

          {item.children.length > 0 && (
            <div className="invisible absolute left-0 top-full z-50 min-w-[220px] translate-y-2 rounded-xl border border-gray-100 bg-white p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              {item.children.map((child) => (
                <Link
                  key={child.id}
                  href={getMenuHref(child)}
                  className="block rounded-lg px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
}
function SocialLinks({
  links,
}: {
  links: TopBarSettings["topBarSocialLinks"];
}) {
  if (!links?.length) return null;

  return (
    <div className="flex items-center gap-3">
      {links.map((social, index) => {
        if (!social.platform || !social.url) return null;

        const rawPlatform = social.platform;

        const platform = Array.isArray(rawPlatform)
          ? String(rawPlatform[0] ?? "")
          : typeof rawPlatform === "string"
            ? rawPlatform
            : rawPlatform &&
                typeof rawPlatform === "object" &&
                "value" in rawPlatform
              ? String(rawPlatform.value ?? "")
              : "";

        const Icon =
          socialIcons[
            platform.toLowerCase() as keyof typeof socialIcons
          ];

        if (!Icon) return null;

        return (
          <Link
            key={`${platform}-${index}`}
            href={social.url}
            target={social.openInNewTab ? "_blank" : undefined}
            rel={
              social.openInNewTab
                ? "noopener noreferrer"
                : undefined
            }
            aria-label={
              social.accessibleLabel || platform
            }
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:bg-white hover:text-purple-700"
          >
            <Icon size={20} strokeWidth={2.2} />
          </Link>
        );
      })}
    </div>
  );
}
const settingsFallback = {
  menuTextColor: "#666666",
};

export function SiteHeader({
  leftMenu,
  rightMenu,
  branding,
  topBar,
  settings,
}: SiteHeaderProps) {
  const logo = branding.headerLogo?.node;
  console.log("logo",logo);
  return (
   <>
      {topBar.showTopBar && (
       
        <div
          className="hidden lg:block"
          style={{
            backgroundColor:
              topBar.topBarBackgroundColor ||
              "#6520D7",
            color:
              topBar.topBarTextColor ||
              "#ffffff",
          }}
        >
          <div className="absolute w-full h-[70px]">
           {topBar.topBarBackgroundImage?.node && (
              <Image
                src={
                  topBar.topBarBackgroundImage.node
                    .sourceUrl
                }
                alt={
                  topBar.topBarBackgroundImage.node
                    .altText || ""
                }
                fill
                className="object-cover opacity-20"
              />
            )}
          </div>
          <div className="mx-auto flex min-h-[70px] max-w-[1500px] items-center justify-between px-6 lg:px-8 relative z-[9]">
            <div className="flex items-center gap-6">
              <SocialLinks
                links={topBar.topBarSocialLinks}
              />

              {topBar.licenseNumber && (
                <span className="font-medium">
                  {topBar.licenseNumber}
                </span>
              )}
          </div>

            {topBar.topBarMessage && (
              <div>
                {topBar.topBarMessageLink ? (
                  <Link
                    href={
                      topBar.topBarMessageLink
                    }
                  >
                    {topBar.topBarMessage}
                  </Link>
                ) : (
                  topBar.topBarMessage
                )}
              </div>
            )}
          </div>
        </div>
      )}
 <header
      className={
        settings.stickyHeader
          ? "sticky top-0 z-50 shadow-[0px_0px_20px_-10px_#0003] hidden lg:block"
          : "relative z-50 hidden lg:block"
      }
    >
      <div
        className="bg-white"
        style={{
          backgroundColor:
            settings.mainHeaderBackground ||
            "#ffffff",
        }}
      >
        <div className="mx-auto grid min-h-[100px] max-w-[1500px] grid-cols-[1fr_360px_1fr] items-center gap-6 px-6 lg:px-8">
          <nav
            className="hidden items-center gap-8 xl:flex"
            aria-label="Primary left navigation"
          >
            <MenuItems
                items={leftMenu ?? []}
                textColor={
                  settings.menuTextColor || "#666666"
                }
              />
          </nav>

          <div className="flex justify-center logo">
            <Link
              href="/"
              aria-label="Skyward Roofs home"
            >
              {logo ? (
                <Image
                  src={logo.sourceUrl}
                  alt={
                    logo.altText ||
                    "Skyward Roofs"
                  }
                  width={
                    logo.mediaDetails?.width ||
                    300
                  }
                  height={
                    logo.mediaDetails?.height ||
                    100
                  }
                  className="h-24 w-auto"
                  priority
                />
              ) : (
                <span className="text-2xl font-bold">
                  Skyward Roofs
                </span>
              )}
            </Link>
          </div>

          <div className="hidden items-center justify-end gap-8 xl:flex">
            <nav
              className="flex items-center gap-8"
              aria-label="Primary right navigation"
            >
              <MenuItems
                items={rightMenu ?? []}
                textColor={
                  settings.menuTextColor || "#666666"
                }
              />
            </nav>

            {settings.showCallButton &&
              settings.phoneNumber && (
                <a
                  href={`tel:${
                    settings.phoneLink ||
                    settings.phoneNumber.replace(
                      /[^\d+]/g,
                      "",
                    )
                  }`}
                  className="inline-flex items-center gap-3 rounded-full px-6 py-4"
                  style={{
                    backgroundColor:
                      settings.callButtonBackground ||
                      "#6520D7",
                    color:
                      settings.callButtonTextColor ||
                      "#ffffff",
                  }}
                >
                  <PhoneCall
                    size={28}
                    aria-hidden="true"
                  />

                  <span className="flex flex-col">
                    <span className="text-xs font-medium">
                      {settings.callButtonSmallText ||
                        "Call Us Now"}
                    </span>

                    <strong className="text-lg">
                      {settings.phoneNumber}
                    </strong>
                  </span>
                </a>
              )}
          </div>
        </div>
      </div>
    </header>
    <MobileHeader
      logo={logo ?? null}
      leftMenu={leftMenu}
      rightMenu={rightMenu}
      phoneNumber={settings.phoneNumber ?? ""}
      phoneLink={settings.phoneLink ?? ""}
    />
    </>
  );
}
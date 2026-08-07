import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa6";

import type {
  BrandingSettings,
  FooterSettings,
  MenuItemTree,
} from "@/lib/site-data";

type SiteFooterProps = {
  menuOne: MenuItemTree[];
  menuTwo: MenuItemTree[];
  branding: BrandingSettings;
  settings: FooterSettings;
};
const socialIcons = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  tiktok: FaTiktok,
  youtube: FaYoutube,
};
function getMenuHref(item: MenuItemTree) {
  return item.path || item.uri || item.url || "#";
}

function FooterMenuColumn({
  heading,
  items,
}: {
  heading: string;
  items: MenuItemTree[];
}) {
  return (
    <div>
      <h2 className="text-lg font-bold">{heading}</h2>

      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={getMenuHref(item)}
              target={item.target || undefined}
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              {item.label}
            </Link>

            {item.children.length > 0 && (
              <ul className="mt-2 space-y-2 pl-4">
                {item.children.map((child) => (
                  <li key={child.id}>
                    <Link
                      href={getMenuHref(child)}
                      target={child.target || undefined}
                      className="text-sm opacity-70 transition-opacity hover:opacity-100"
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter({
  menuOne,
  menuTwo,
  branding,
  settings,
}: SiteFooterProps) {
  const logo =
    branding.footerLogo?.node ||
    branding.headerLogo?.node;

  const footerBackground =
    settings.footerBackgroundColor || "#17151f";

  const footerText =
    settings.footerTextColor || "#ffffff";
function FooterSocialLinks({
  links,
}: {
  links: FooterSettings["footerSocialMedia"];
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
          <a
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
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#6520D7] transition-all duration-300 hover:-translate-y-1 hover:bg-[#8b0000] hover:text-white"
          >
            <Icon size={18} />
          </a>
        );
      })}
    </div>
  );
}
  return (
    <footer>
      <div
        style={{
          backgroundColor: footerBackground,
          color: footerText,
        }}
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {/* Column 1 */}
          <div>
            {logo && (
              <Image
                src={logo.sourceUrl}
                alt={logo.altText || "Skyward Roofs"}
                width={logo.mediaDetails?.width || 240}
                height={logo.mediaDetails?.height || 80}
                className="h-24 w-auto object-contain"
              />
            )}

            {settings.footerDescription && (
              <p className="mt-6 leading-7 opacity-80">
                {settings.footerDescription}
              </p>
            )}
          </div>

          {/* Column 2 */}
          <FooterMenuColumn
            heading={
              settings.footerColumnTwoHeading ||
              "Services"
            }
            items={menuOne ?? []}
          />

          {/* Column 3 */}
          <FooterMenuColumn
            heading={
              settings.footerColumnThreeHeading ||
              "Quick Links"
            }
            items={menuTwo ?? []}
          />

          {/* Column 4 */}
          <div>
            <h2 className="text-lg font-bold">
              {settings.footerContactHeading ||
                "Contact Us"}
            </h2>

            <div className="mt-5 space-y-4 opacity-80">
              {settings.footerPhoneNumber && (
                <a
                  href={`tel:${settings.footerPhoneNumber.replace(
                    /[^\d+]/g,
                    "",
                  )}`}
                  className="block hover:opacity-100"
                >
                  {settings.footerPhoneNumber}
                </a>
              )}

              {settings.footerEmailAddress && (
                <a
                  href={`mailto:${settings.footerEmailAddress}`}
                  className="block hover:opacity-100"
                >
                  {settings.footerEmailAddress}
                </a>
              )}

              {settings.footerBusinessAddress && (
                <p className="whitespace-pre-line">
                  {settings.footerBusinessAddress}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Full width CTA */}
      {settings.showFooterCta && (
        <section
          className="relative overflow-hidden"
          style={{
          backgroundColor: footerBackground,
        }}
        >
          

          <div style={{
            backgroundColor:
              settings.footerCtaBackgroundColor ||
              "#6520D7",
            color:
              settings.footerCtaTextColor ||
              "#ffffff",
          }} className="relative mx-auto flex max-w-7xl flex-col gap-8 px-5 py-14 lg:flex-row lg:items-center lg:justify-between lg:px-8 border border-[#8b0000]">
            <div className="absolute w-full h-[188px] left-0 top-0 z-0">
          {settings.footerCtaBackgroundImage?.node && (
            <Image
              src={
                settings.footerCtaBackgroundImage.node
                  .sourceUrl
              }
              alt={
                settings.footerCtaBackgroundImage.node
                  .altText || ""
              }
              fill
              className="object-cover h-full z-[-1]"
              style={{objectFit:"cover",}}
            />
          )}
          </div>
            <div className="flex justify-between flex-wrap w-full relative z-[9] items-center">
              <div className="flex flex-row gap-6 items-center">
                {settings.footerCtaSocialHeading && (
                  <p className="text-lg font-semibold">
                    {settings.footerCtaSocialHeading}
                  </p>
                )}

                <FooterSocialLinks
                  links={settings.footerSocialMedia}
                />
              </div>
              <div className="flex flex-row gap-6 align-center">
                {settings.footerCtaHeading && (
                  <h2 className="text-3xl font-bold">
                    {settings.footerCtaHeading}
                  </h2>
                )}
                {settings.footerCtaButtonText &&
              settings.footerCtaButtonUrl && (
                <Link
                  style={{backgroundColor: "#8b0000",  color: "#ffffff",}}
                  href={settings.footerCtaButtonUrl}
                  className="inline-flex min-h-14 items-center justify-center bg-white px-8 font-bold text-purple-700"
                >
                  {settings.footerCtaButtonText}
                </Link>
              )}
              </div>
              
            </div>

            
          </div>
        </section>
      )}

      {/* Copyright bar */}
      <div className="bg-[#0f0e14] text-white" style={{
          backgroundColor: footerBackground,
        }}>
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-sm md:flex-row md:items-center md:justify-between lg:px-8">
          <p>
            {settings.copyrightText ||
              `© ${new Date().getFullYear()} Skyward Roofs. All rights reserved.`}
          </p>

          {settings.copyrightLicenseNumber && (
            <p>
              {settings.copyrightLicenseNumber}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
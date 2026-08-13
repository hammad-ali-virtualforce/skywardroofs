"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Menu,
  X,
  Phone,
  ChevronDown,
} from "lucide-react";

import { useState } from "react";

type MenuItem = {
  id: string;
  label: string;
  path?: string | null;
  uri?: string | null;
  url?: string | null;
  children?: MenuItem[];
};

type MobileHeaderProps = {
  logo: {
    sourceUrl: string;
    altText?: string | null;
  } | null;

  leftMenu: MenuItem[];
  rightMenu: MenuItem[];

  phoneNumber: string;
  phoneLink: string;
};

export function MobileHeader({
  logo,
  leftMenu,
  rightMenu,
  phoneNumber,
  phoneLink,
}: MobileHeaderProps) {
  const [open, setOpen] =
    useState(false);

  const menuItems = [
    ...leftMenu,
    ...rightMenu,
  ];

  return (
    <>
      {/* =================================
          MOBILE HEADER
      ================================= */}

      <header
        className="
          fixed
          inset-x-0
          top-0
          z-[1000]
          border-t
          border-[#75333d]
          bg-white
          shadow-sm
          lg:hidden
        "
      >
        <div
          className="
            grid
            h-[88px]
            grid-cols-[70px_1fr_70px]
            items-center
            px-3
          "
        >
          {/* MENU */}

          <button
            type="button"
            onClick={() =>
              setOpen(true)
            }
            aria-label="Open menu"
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-[#75333d]
              text-white
              transition-transform
              active:scale-95
            "
          >
            <Menu size={23} />
          </button>

          {/* LOGO */}

          <Link
            href="/"
            className="
              flex
              justify-center
            "
          >
            {logo && (
              <Image
                src={
                  logo.sourceUrl
                }
                alt={
                  logo.altText ||
                  "Skyward Roofing"
                }
                width={190}
                height={90}
                priority
                className="
                  h-auto
                  max-h-[72px]
                  w-auto
                  max-w-[180px]
                  object-contain
                "
              />
            )}
          </Link>

          {/* CALL */}

          <div className="flex justify-end">
            <a
              href={`tel:${
                    phoneLink ||
                    phoneNumber.replace(
                      /[^\d+]/g,
                      "",
                    )
                  }`}
              aria-label={`Call ${phoneNumber}`}
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-[#75333d]
                text-white
                transition-all
                active:scale-95
              "
            >
              <Phone
                size={22}
                strokeWidth={2}
              />
            </a>
          </div>
        </div>
      </header>

      {/* =================================
          BACKDROP
      ================================= */}

      <div
        onClick={() =>
          setOpen(false)
        }
        className={`
          fixed
          inset-0
          z-[1100]
          bg-black/60
          backdrop-blur-sm
          transition-opacity
          duration-300
          lg:hidden

          ${
            open
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />

      {/* =================================
          MOBILE DRAWER
      ================================= */}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-[1200]
          h-dvh
          w-[88%]
          max-w-[380px]
          overflow-y-auto
          bg-[#121012]
          text-white
          shadow-2xl
          transition-transform
          duration-300
          ease-out
          lg:hidden

          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Drawer top */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-white/10
            p-5
          "
        >
          <h3 className="text-white font-bold text-2xl">Skywards Roofing</h3>

          <button
            type="button"
            onClick={() =>
              setOpen(false)
            }
            aria-label="Close menu"
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-[#75333d]
              text-white
            "
          >
            <X size={22} />
          </button>
        </div>

        {/* Menu */}

        <nav className="px-5 py-6">
          <ul>
            {menuItems.map(
              (item) => (
                <MobileMenuItem
                  key={item.id}
                  item={item}
                  onNavigate={() =>
                    setOpen(false)
                  }
                />
              ),
            )}
          </ul>
        </nav>

        {/* Phone CTA */}

        <div className="px-5 pb-8">
          <a
            href={`tel:${
                    phoneLink ||
                    phoneNumber.replace(
                      /[^\d+]/g,
                      "",
                    )
                  }`}
            className="
              flex
              min-h-14
              items-center
              justify-center
              gap-3
              bg-[#75333d]
              px-5
              font-black
              uppercase
              text-white
            "
          >
            <Phone size={19} />

            {phoneNumber}
          </a>
        </div>
      </aside>
    </>
  );
}

function MobileMenuItem({
  item,
  onNavigate,
}: {
  item: MenuItem;
  onNavigate: () => void;
}) {
  const [open, setOpen] =
    useState(false);

  const children =
    item.children ?? [];

  const hasChildren =
    children.length > 0;

  const href =
    getMenuHref(item);

  return (
    <li
      className="
        border-b
        border-white/10
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <Link
          href={href}
          onClick={onNavigate}
          className="
            flex-1
            py-5
            text-base
            font-bold
            uppercase
            tracking-[0.04em]
            transition-colors
            hover:text-[#c98992]
          "
        >
          {item.label}
        </Link>

        {hasChildren && (
          <button
            type="button"
            onClick={() =>
              setOpen(
                (current) =>
                  !current,
              )
            }
            aria-expanded={open}
            aria-label={`Toggle ${item.label} submenu`}
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              text-white/70
            "
          >
            <ChevronDown
              size={19}
              className={`
                transition-transform
                duration-300

                ${
                  open
                    ? "rotate-180"
                    : ""
                }
              `}
            />
          </button>
        )}
      </div>

      {hasChildren && (
        <div
          className={`
            grid
            transition-all
            duration-300

            ${
              open
                ? "grid-rows-[1fr]"
                : "grid-rows-[0fr]"
            }
          `}
        >
          <div className="overflow-hidden">
            <ul
              className="
                mb-3
                border-l
                border-[#75333d]
                pl-5
              "
            >
              {children.map(
                (child) => (
                  <MobileMenuItem
                    key={
                      child.id
                    }
                    item={
                      child
                    }
                    onNavigate={
                      onNavigate
                    }
                  />
                ),
              )}
            </ul>
          </div>
        </div>
      )}
    </li>
  );
}

function getMenuHref(
  item: MenuItem,
) {
  if (item.path) {
    return item.path;
  }

  if (item.uri) {
    return item.uri;
  }

  if (item.url) {
    try {
      const url =
        new URL(item.url);

      return `${url.pathname}${url.search}${url.hash}`;
    } catch {
      return item.url;
    }
  }

  return "#";
}
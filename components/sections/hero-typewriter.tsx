"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import type {
  HeroEyebrowItem,
} from "@/lib/page-data";

type HeroTypewriterProps = {
  items: HeroEyebrowItem[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseAfterTyping?: number;
  pauseAfterDeleting?: number;
};

export function HeroTypewriter({
  items,
  typingSpeed = 70,
  deletingSpeed = 40,
  pauseAfterTyping = 1600,
  pauseAfterDeleting = 250,
}: HeroTypewriterProps) {
  const words = useMemo(
    () =>
      items
        .map((item) =>
          item.heroEyebrowText?.trim(),
        )
        .filter(
          (text): text is string =>
            Boolean(text),
        ),
    [items],
  );

  const [wordIndex, setWordIndex] =
    useState(0);

  const [displayedText, setDisplayedText] =
    useState("");

  const [isDeleting, setIsDeleting] =
    useState(false);

  useEffect(() => {
    if (!words.length) return;

    const currentWord =
      words[wordIndex] ?? "";

    let delay = isDeleting
      ? deletingSpeed
      : typingSpeed;

    if (!isDeleting &&
        displayedText === currentWord) {
      delay = pauseAfterTyping;
    }

    if (isDeleting &&
        displayedText === "") {
      delay = pauseAfterDeleting;
    }

    const timer = window.setTimeout(() => {
      if (!isDeleting) {
        if (
          displayedText.length <
          currentWord.length
        ) {
          setDisplayedText(
            currentWord.slice(
              0,
              displayedText.length + 1,
            ),
          );
        } else {
          setIsDeleting(true);
        }

        return;
      }

      if (displayedText.length > 0) {
        setDisplayedText(
          currentWord.slice(
            0,
            displayedText.length - 1,
          ),
        );

        return;
      }

      setIsDeleting(false);

      setWordIndex(
        (index) =>
          (index + 1) % words.length,
      );
    }, delay);

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    words,
    wordIndex,
    displayedText,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    pauseAfterTyping,
    pauseAfterDeleting,
  ]);

  if (!words.length) return null;

  return (
    <span className="inline-flex items-center">
      <span>{displayedText}</span>

      <span
        aria-hidden="true"
        className="ml-1 inline-block h-[1em] w-[2px] animate-pulse bg-current"
      />
    </span>
  );
}
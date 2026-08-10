"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

type PageBackgroundProps = {
  image: string;
};

export function PageBackground({
  image,
}: PageBackgroundProps) {
  const { scrollY } = useScroll();

  /*
   * Page scroll:
   * 0px   -> image y = -120px
   * 1500px -> image y = 500px
   *
   * Increase the last value for stronger movement.
   */
  const y = useTransform(
    scrollY,
    [0, 1500],
    [-120, 500],
  );

  const scale = useTransform(
    scrollY,
    [0, 1500],
    [1.18, 1.28],
  );

  return (
    <motion.div
      style={{
        y,
        scale,
      }}
      className="pointer-events-none fixed -inset-[15%] z-[-1] overflow-hidden "
      aria-hidden="true"
    >
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover max-w-full"
      />

      <div className="absolute inset-0 bg-black/20" />
    </motion.div>
  );
}
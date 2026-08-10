"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

type AboutBackgroundProps = {
  image: string;
};

export function AboutBackground({
  image,
}: AboutBackgroundProps) {
  const { scrollY } = useScroll();

  /*
   * Increase these values for stronger movement.
   *
   * Scroll page:
   * 0px    -> image y = -120px
   * 900px  -> image y = 420px
   */
  const y = useTransform(
    scrollY,
    [0, 2500],
    [-300, 500],
  );

  const scale = useTransform(
    scrollY,
    [0, 2500],
    [1.15, 1.25],
  );

  return (
    <motion.div
      style={{
        y,
        scale,
      }}
      className="absolute -inset-[15%] -z-20"
    >
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
    </motion.div>
  );
}
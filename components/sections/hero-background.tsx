"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export function HeroBackground({
  image,
}: {
  image: string;
}) {
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 800], [0, 250]);

  return (
    <motion.div
      style={{ y }}
      className="absolute inset-0 -z-20"
    >
      <Image
        src={image}
        alt=""
        fill
        priority
        className="object-cover"
      />
    </motion.div>
  );
}
"use client";

import { useEffect, useCallback } from "react";
import Link from "next/link";
import { heroImages } from "@/lib/data";
import { motion, stagger, useAnimate } from "motion/react";
import Floating, { FloatingElement } from "@/components/parallax-floating";
import { Button } from "@/components/ui/button";

const FLOATING_IMAGE_CONFIG = [
  {
    index: 0,
    depth: 0.5,
    position: "top-[18%] left-[15%]",
    size: "w-16 h-16 md:w-24 md:h-24",
  },
  {
    index: 1,
    depth: 1,
    position: "top-[10%] left-[32%]",
    size: "w-20 h-20 md:w-28 md:h-28",
  },
  {
    index: 2,
    depth: 2,
    position: "top-[2%] left-[53%]",
    size: "w-28 h-40 md:w-40 md:h-52",
  },
  {
    index: 3,
    depth: 1,
    position: "top-[0%] left-[83%]",
    size: "w-24 h-24 md:w-32 md:h-32",
  },
  {
    index: 4,
    depth: 1,
    position: "top-[40%] left-[80%]",
    size: "w-28 h-28 md:w-36 md:h-36",
  },
  {
    index: 7,
    depth: 2,
    position: "top-[70%] left-[77%]",
    size: "w-28 h-28 md:w-36 md:h-48",
  },
  {
    index: 5,
    depth: 4,
    position: "top-[73%] left-[20%]",
    size: "w-40 md:w-52 h-full",
  },
  {
    index: 6,
    depth: 1,
    position: "top-[80%] left-[45%]",
    size: "w-24 h-24 md:w-32 md:h-32",
  },
] as const;

export default function HomePage() {
  const [scope, animate] = useAnimate();

  const animateImages = useCallback(() => {
    animate(
      "img",
      { opacity: [0, 1] },
      { duration: 0.5, delay: stagger(0.15) }
    );
  }, [animate]);

  useEffect(() => {
    animateImages();
  }, [animateImages]);

  return (
    <div
      className="flex w-dvw h-dvh justify-center items-center bg-black overflow-hidden"
      ref={scope}
    >
      <motion.div
        className="z-50 text-center space-y-4 items-center flex flex-col"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.88, delay: 1.5 }}
      >
        <h1 className="text-5xl md:text-7xl xl:text-8xl z-50 text-white font-serif">
          Start<span className="italic">ed.</span>
        </h1>
        <p className="text-white text-sm md:text-base max-w-md">
          Get your recruitment process Started quickly.
        </p>
        <Link href="/brand-inputs">
          <Button variant="secondary">Get Started</Button>
        </Link>
      </motion.div>

      <Floating sensitivity={-1} className="overflow-hidden">
        {FLOATING_IMAGE_CONFIG.map((config) => (
          <FloatingElement
            key={config.index}
            depth={config.depth}
            className={config.position}
          >
            <motion.img
              initial={{ opacity: 0 }}
              src={heroImages[config.index].url}
              className={`${config.size} object-cover hover:scale-105 duration-200 cursor-pointer transition-transform`}
            />
          </FloatingElement>
        ))}
      </Floating>
    </div>
  );
}

"use client";
import localFont from "next/font/local";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Lenis from "lenis";

const cirkular = localFont({
  src: "../fonts/cirkular.ttf",
  variable: "--font-cirkular",
});

const Hero = () => {
  // Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Letter animation
  const letterVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.08,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const brandName = "Cirkular".split("");

  return (
    <header className="max-w-5xl mx-auto mt-8 mb-10 md:mb-12 text-center h-screen flex flex-col justify-center items-center">
      <motion.div
        initial="hidden"
        animate="visible"
        className="flex items-center justify-center mb-4 overflow-hidden"
      >
        <h1
          className={`tracking-widest text-6xl sm:text-7xl md:text-9xl font-bold text-primary ${cirkular.className} flex`}
        >
          {brandName.map((letter, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            delay: 0.8,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          },
        }}
        className="arial text-md sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
      >
        Craft stunning text-based logos and banners with live previews,
        AI-powered design suggestions.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: {
            delay: 1.2,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          },
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="mt-10"
      >
        <a
          href="#get-started"
          className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
        >
          Get Started
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            delay: 1.6,
            duration: 0.8,
          },
        }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-muted-foreground text-sm mb-2">
          Scroll to explore
        </span>
        <motion.div
          animate={{
            y: [0, 10, 0],
            transition: {
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            },
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5L12 19M12 19L18 13M12 19L6 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>
    </header>
  );
};

export default Hero;

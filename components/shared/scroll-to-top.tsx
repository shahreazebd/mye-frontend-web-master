"use client";

import { useEffect } from "react";

export default function ScrollToTop() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    let scrollPosition = 0;

    const isScrollingDown = () => {
      let scrollingDown = false;
      let newScrollPosition = window.scrollY;
      if (newScrollPosition > scrollPosition) {
        scrollingDown = true;
      }
      scrollPosition = newScrollPosition;
      return scrollingDown;
    };

    const handleScroll = () => {
      const scrollToTopButton = document.querySelector("[data-backtotopbutton]");
      if (isScrollingDown() || window.pageYOffset === 0) {
        scrollToTopButton?.classList.add("opacity-0", "invisible");
        scrollToTopButton?.classList.remove("opacity-100", "visible");
      } else {
        scrollToTopButton?.classList.remove("opacity-0", "invisible");
        scrollToTopButton?.classList.add("opacity-100", "visible");
      }
    };

    window.addEventListener("scroll", handleScroll);
  });

  return (
    <div
      data-backtotopbutton
      role="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      className="shadow-back-to-top group invisible fixed bottom-4 right-2 z-10 flex size-[40px] items-center justify-center rounded-full bg-[#9147FF] text-white opacity-0"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="size-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 15l7-7 7 7"
        />
      </svg>
    </div>
  );
}

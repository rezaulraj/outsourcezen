// components/common/SmoothScroll.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import gsap from "gsap";

const SmoothScroll = () => {
  const location = useLocation();

  useEffect(() => {
    // Destroy any existing Lenis instance
    let lenis = null;

    const initLenis = () => {
      lenis = new Lenis({
        duration: 1.6,
        lerp: 0.06,
        smoothWheel: true,
      });

      lenis.on("scroll", () => {
        gsap.ticker.tick();
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    };

    initLenis();

    // Scroll to top on route change
    window.scrollTo(0, 0);

    return () => {
      if (lenis) {
        lenis.destroy();
        lenis = null;
      }
    };
  }, [location.pathname]); // ← Re-initialize on route change

  return null;
};

export default SmoothScroll;

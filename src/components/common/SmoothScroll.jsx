import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";

const SmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
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

    return () => lenis.destroy();
  }, []);

  return null;
};

export default SmoothScroll;

import { useEffect, useRef } from "react";

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.querySelectorAll("[data-animate]");
    const targets = children.length > 0 ? Array.from(children) : [el];

    // Set initial hidden state
    targets.forEach((target) => {
      (target as HTMLElement).style.opacity = "0";
      (target as HTMLElement).style.transform = "translateY(32px)";
      (target as HTMLElement).style.transition = "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const delay = Number(target.getAttribute("data-delay") || 0);
            setTimeout(() => {
              target.style.opacity = "1";
              target.style.transform = "translateY(0)";
            }, delay);
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return ref;
}

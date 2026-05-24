import { useEffect, useRef } from 'react';

export function useReveal<T extends HTMLElement>(selector?: string) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const elements = selector
      ? root.querySelectorAll(selector)
      : root.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale, .glitch-reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('is-visible');
            }, index * 100);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selector]);

  return ref;
}

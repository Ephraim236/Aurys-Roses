import { useEffect } from 'react';

// Observes elements matched by selector and adds 'in-view' class when they enter the viewport.
export function useAnimateOnInView(selector: string, options?: IntersectionObserverInit) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (els.length === 0) return;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, options || { threshold: 0.12 });

    els.forEach((el) => obs.observe(el));

    return () => obs.disconnect();
  }, [selector, JSON.stringify(options)]);
}

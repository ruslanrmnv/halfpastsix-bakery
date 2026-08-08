"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Progressive-enhancement motion layer (client review pass, decisions 9.x).
// Four effects, all opt-in through data attributes so server components stay
// plain markup:
//   data-split    — heading slides out of a line mask when its section enters
//   data-rise     — block fades/rises in, stagger via the attribute's number
//   data-parallax — media scrolls slower than text (factor in the attribute)
//   data-float    — slow idle drift (pure CSS, see globals.css)
// The pre-animation hidden state only exists under `html.js:not(.motion-off)`
// — no JS, or prefers-reduced-motion, means everything just renders visible.
export default function Motion() {
  useEffect(() => {
    if (document.documentElement.classList.contains("motion-off")) return;

    // 1 · Inertial scroll. Lenis keeps native scrolling (anchor links,
    // keyboard, find-in-page all work) and only smooths the wheel.
    const lenis = new Lenis();
    let rafId = requestAnimationFrame(function raf(t) {
      lenis.raf(t);
      rafId = requestAnimationFrame(raf);
    });

    // 2 · Masked headings. Words are wrapped, grouped into rendered lines,
    // then each line gets an overflow-hidden mask. Re-split on resize would
    // fight the one-time greeting — headings that already played just render
    // their final state, so a stale split only shows on rotate, and the next
    // navigation heals it. Runs after fonts so line breaks are the real ones.
    const splitEls = [...document.querySelectorAll<HTMLElement>("[data-split]")];
    const splitOne = (el: HTMLElement) => {
      const words = (el.textContent ?? "").split(/\s+/).filter(Boolean);
      el.textContent = "";
      const spans = words.map((w) => {
        const s = document.createElement("span");
        s.textContent = w;
        s.style.display = "inline-block";
        el.append(s, document.createTextNode(" "));
        return s;
      });
      const byTop = new Map<number, HTMLSpanElement[]>();
      for (const s of spans) {
        const line = byTop.get(s.offsetTop) ?? [];
        line.push(s);
        byTop.set(s.offsetTop, line);
      }
      el.textContent = "";
      [...byTop.values()].forEach((line, i) => {
        const mask = document.createElement("span");
        mask.className = "line-mask";
        const inner = document.createElement("span");
        inner.className = "line-in";
        inner.style.transitionDelay = `${i * 110}ms`;
        line.forEach((w, j) => {
          w.style.display = "";
          inner.append(w, document.createTextNode(j < line.length - 1 ? " " : ""));
        });
        mask.append(inner);
        el.append(mask);
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      },
      { threshold: 0.15 },
    );

    let cancelled = false;
    document.fonts.ready.then(() => {
      if (cancelled) return;
      splitEls.forEach(splitOne);
      document
        .querySelectorAll("[data-split], [data-rise]")
        .forEach((el) => io.observe(el));
    });

    // 3 · Differentiated media speed. The photo lags the text by the given
    // factor; the uncovered strip is the hero's own top edge, which by then
    // is always above the viewport, so no bleed/scale is needed.
    const media = [...document.querySelectorAll<HTMLElement>("[data-parallax]")];
    const onScroll = () => {
      const y = window.scrollY;
      for (const el of media)
        el.style.transform = `translateY(${(y * Number(el.dataset.parallax || 0.18)).toFixed(1)}px)`;
    };
    lenis.on("scroll", onScroll);
    onScroll();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      lenis.destroy();
      io.disconnect();
    };
  }, []);

  return null;
}

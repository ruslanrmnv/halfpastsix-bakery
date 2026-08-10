"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

// Progressive-enhancement motion layer (client review pass, decisions 9.x).
// Four effects, all opt-in through data attributes so server components stay
// plain markup:
//   data-split    — heading slides out of a line mask when its section enters
//   data-rise     — block fades/rises in, stagger via the --rise custom prop
//   data-parallax — media scrolls slower than text (factor in the attribute)
//   data-float    — slow idle drift (pure CSS, see globals.css)
// The pre-animation hidden state only exists under `html.js:not(.motion-off)`
// — no JS, or prefers-reduced-motion, means everything just renders visible.
//
// This component mounts once in the root layout and the layout survives
// client-side navigation, so everything that touches page DOM lives in the
// pathname-keyed effect below — a fresh page means a fresh scan, otherwise
// data-rise blocks stay at opacity 0 forever (the vanishing-board bug).
export default function Motion() {
  const pathname = usePathname();

  // Inertial scroll — one Lenis for the whole visit. It keeps native
  // scrolling (anchors, keyboard, find-in-page) and only smooths the wheel.
  useEffect(() => {
    if (document.documentElement.classList.contains("motion-off")) return;
    // Lerp mode, tuned for touchpads (the client's input): a touchpad
    // streams tiny deltas with OS momentum on top, and any per-step
    // duration ease ends up tracking the fingers 1:1 — dry. A low lerp
    // makes the page visibly trail the gesture and keep drifting after
    // the fingers lift. Scrollbar and keyboard stay native and instant.
    const lenis = new Lenis({ lerp: 0.05 });
    let rafId = requestAnimationFrame(function raf(t) {
      lenis.raf(t);
      rafId = requestAnimationFrame(raf);
    });
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Per-page scan: split headings, observe reveals, drive parallax.
  useEffect(() => {
    if (document.documentElement.classList.contains("motion-off")) return;

    // Masked headings. Words are wrapped, grouped into rendered lines, then
    // each line gets an overflow-hidden mask. Runs after fonts so the line
    // breaks are the real ones. Client-side navigation hands us fresh
    // unsplit headings, so splitting again here is both safe and required.
    const splitOne = (el: HTMLElement) => {
      if (el.querySelector(".line-mask")) return;
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

    /* Rise-in blocks are observed straight away. Only the split needs fonts:
       it measures rendered line breaks, and measuring them against a fallback
       face gives the wrong ones. A rise measures nothing, and putting it in
       the same queue parked every one of them behind the last woff2 to land —
       Lighthouse dated this page's largest paint 2351ms after first byte, and
       the element it named was the hero paragraph, sitting at opacity 0 that
       whole time waiting on a font it never needed. */
    document.querySelectorAll("[data-rise]").forEach((el) => io.observe(el));

    let cancelled = false;
    document.fonts.ready.then(() => {
      if (cancelled) return;
      document.querySelectorAll<HTMLElement>("[data-split]").forEach(splitOne);
      document.querySelectorAll("[data-split]").forEach((el) => io.observe(el));
    });

    // Differentiated media speed. The photo lags the text by the given
    // factor; the uncovered strip is the hero's own top edge, which by then
    // is always above the viewport, so no bleed/scale is needed. Lenis
    // animates native scrollTop, so a plain scroll listener hears it.
    const media = [...document.querySelectorAll<HTMLElement>("[data-parallax]")];
    const onScroll = () => {
      const y = window.scrollY;
      for (const el of media)
        el.style.transform = `translateY(${(y * Number(el.dataset.parallax || 0.18)).toFixed(1)}px)`;
    };
    if (media.length) {
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    return () => {
      cancelled = true;
      io.disconnect();
      if (media.length) window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return null;
}

import localFont from "next/font/local";

// Variable latin-subset files, fetched once at build time and served from
// our own domain — the site loads zero external resources (intake rule).
// The pair was chosen by the client on a rendered specimen board
// (research/decisions.md 2.29–2.30).

export const montserrat = localFont({
  src: "../fonts/montserrat-latin.woff2",
  weight: "100 900",
  variable: "--font-montserrat",
  display: "swap",
});

export const sourceSans = localFont({
  src: "../fonts/source-sans-3-latin.woff2",
  weight: "200 900",
  variable: "--font-source-sans",
  display: "swap",
});

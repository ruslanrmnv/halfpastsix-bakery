import { site } from "@/data/site";

// Placeholder — the real homepage is built in phase 4 from the accepted
// mockup (mockup/index.html). This page only proves the stack exports.
export default function Home() {
  return (
    <main className="p-8">
      <h1 className="font-display text-3xl font-black">{site.name}</h1>
      <p className="mt-2 text-mocha">Phase 3 scaffold — build starts in phase 4.</p>
    </main>
  );
}

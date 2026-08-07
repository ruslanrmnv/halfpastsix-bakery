import { site, today } from "@/data/site";

// The day stamp. Separator dots sit at the end of a segment, never as
// their own flex children — a wrapped dot at line start reads as a list
// marker (decision 2.17).
export default function Stamp({ onPhoto = false }: { onPhoto?: boolean }) {
  const base = onPhoto ? "text-latte" : "text-mocha-2";
  const strong = onPhoto ? "text-cream-2" : "text-mocha";

  return (
    <p className={`mb-3.5 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm ${base}`}>
      <span>
        {today.weekday}, {today.date} · {today.countedAt} ·
      </span>
      <b className={`font-bold whitespace-nowrap ${strong}`}>
        second bake at {site.bakes.secondShort}
        {onPhoto && <span className={`font-normal ${base}`}> ·</span>}
      </b>
      {onPhoto && <span>baking since {site.since}</span>}
    </p>
  );
}

import { type Model } from "@/lib/game";

export function Dots() {
  return (
    <span className="dots">
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </span>
  );
}

export function ModelTag({ model, small }: { model: Model; small?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold whitespace-nowrap ${small ? "text-xs gap-1" : "text-sm"}`}
      style={{ color: model.color }}
    >
      {model.name}
    </span>
  );
}

/**
 * Section eyebrow: large numeral in Unbounded (the display face's only
 * post-hero use) plus a mono label.
 */
export default function SectionLabel({
  numeral,
  label,
  id,
  className = "",
}: {
  numeral: string;
  label: string;
  id?: string;
  className?: string;
}) {
  return (
    <div className={`flex items-baseline gap-4 ${className}`}>
      <span aria-hidden className="font-display text-2xl text-voxel/50 md:text-3xl">
        {numeral}
      </span>
      <h2
        id={id}
        className="font-mono text-xs uppercase tracking-[0.3em] text-muted"
      >
        {label}
      </h2>
    </div>
  );
}

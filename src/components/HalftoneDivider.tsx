/**
 * The halftone matrix's first of two post-hero appearances:
 * the Hero → Manifesto transition.
 */
export default function HalftoneDivider() {
  return (
    <div
      aria-hidden
      className="halftone-dots h-36 w-full opacity-[0.16] md:h-48"
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent, black 35%, black 65%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, black 35%, black 65%, transparent)",
      }}
    />
  );
}

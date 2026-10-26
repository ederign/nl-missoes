import handout from "@/assets/brand/handout-artwork.png";

// Windows into the original 846 × 1860 handout. SVG clips the original pixels;
// these are not traced, redrawn, or generated versions of the church artwork.
const regions = {
  logo: "50 30 370 94",
  family: "36 1020 102 103",
  housing: "436 1020 103 103",
  donations: "36 1153 102 105",
  citizenship: "436 1153 103 105",
  documents: "36 1290 102 103",
  protection: "436 1290 103 103",
  legal: "36 1409 102 103",
} as const;

export type BannerIcon = Exclude<keyof typeof regions, "logo">;

export function BannerArtwork({ name, className = "" }: {
  name: keyof typeof regions;
  className?: string;
}) {
  return <svg viewBox={regions[name]} className={`banner-artwork ${className}`}
    aria-hidden="true" focusable="false" overflow="hidden">
    <image href={handout} width="846" height="1860" />
  </svg>;
}

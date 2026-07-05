import { Opening } from "@/components/chapters/Opening";
import { PinnedNarrative } from "@/components/chapters/PinnedNarrative";
import { WorkGallery } from "@/components/chapters/WorkGallery";
import { Metrics } from "@/components/chapters/Metrics";
import { Finale } from "@/components/chapters/Finale";

export default function Home() {
  return (
    <>
      <Opening />
      <PinnedNarrative />
      <WorkGallery />
      <Metrics />
      <Finale />
    </>
  );
}
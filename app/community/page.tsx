import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CommunityPostCard } from "@/components/community/CommunityPostCard";
import { PlaceholderNote } from "@/components/ui/PlaceholderNote";
import { getCommunityHighlights } from "@/lib/data/queries";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Community",
  description: "REFORGE community highlights — featured training, announcements, and celebrations.",
  alternates: { canonical: "/community" },
};

export default async function CommunityPage() {
  const posts = await getCommunityHighlights();

  return (
    <section className="pt-28 pb-24">
      <Container>
        <SectionHeading
          kicker="Community"
          title={"TRAIN TOGETHER.\nGROW TOGETHER."}
          subtitle="Only content explicitly featured for the public website appears here. Private member posts stay in the REFORGE app."
        />
        <div className="mt-6">
          <PlaceholderNote>
            Public feed requires featured_on_website on approved posts. Sample highlights shown until that flag is live.
          </PlaceholderNote>
        </div>
        <Stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <StaggerItem key={post.id}>
              <CommunityPostCard post={post} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

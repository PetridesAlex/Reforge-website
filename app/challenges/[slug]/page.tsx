import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChallengeDetail } from "@/components/challenges/ChallengeDetail";
import { getChallengeBySlug, getChallenges } from "@/lib/data/queries";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const challenges = await getChallenges();
  return challenges.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const challenge = await getChallengeBySlug(slug);
  if (!challenge) return { title: "Challenge" };
  return {
    title: challenge.name,
    description: challenge.description ?? "REFORGE weekly challenge.",
    alternates: { canonical: `/challenges/${challenge.slug}` },
  };
}

export default async function ChallengeDetailPage({ params }: Props) {
  const { slug } = await params;
  const challenge = await getChallengeBySlug(slug);
  if (!challenge) notFound();

  return <ChallengeDetail challenge={challenge} />;
}

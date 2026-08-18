import { HomePage } from "@/components/home/HomePage";
import {
  getAchievements,
  getChallenges,
  getClasses,
  getCoaches,
  getCommunityHighlights,
  getProducts,
  getTrainingCategories,
} from "@/lib/data/queries";

export default async function Page() {
  const [categories, classes, challenges, achievements, posts, coaches, products] =
    await Promise.all([
      getTrainingCategories(),
      getClasses(),
      getChallenges(),
      getAchievements(),
      getCommunityHighlights(),
      getCoaches(),
      getProducts(),
    ]);

  const live = challenges.find((c) => c.status === "live") ?? challenges[0];

  return (
    <HomePage
      categories={categories}
      classes={classes}
      challenge={live}
      achievements={achievements}
      posts={posts}
      coaches={coaches}
      products={products}
    />
  );
}

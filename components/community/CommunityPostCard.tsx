import Image from "next/image";
import type { CommunityPost } from "@/types";

export function CommunityPostCard({ post }: { post: CommunityPost }) {
  return (
    <article className="group border border-border bg-surface transition-colors duration-300 hover:border-accent/50">
      {post.image ? (
        <div className="relative aspect-[4/3]">
          <Image
            src={post.image}
            alt=""
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, 33vw"
            loading="lazy"
          />
        </div>
      ) : null}
      <div className="p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
          {post.authorName} · {post.postType}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-text-secondary">{post.body}</p>
        <p className="mt-4 text-[11px] uppercase tracking-[0.16em] text-text-muted">
          {post.likeCount} likes · {post.commentCount} comments
          {post.isPlaceholder ? " · Sample" : ""}
        </p>
      </div>
    </article>
  );
}

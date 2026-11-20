"use client";

import { useState } from "react";
import BlogListCard from "@/components/shared/BlogListCard";

/**
 * Card grid for the Blogs / News / Case Studies pages: shows `pageSize` cards, and each
 * "Load More" click shows the next `pageSize`. The button disappears once every card is shown.
 */
export default function PostGrid({ cards, pageSize = 6 }) {
  const [visible, setVisible] = useState(pageSize);

  return (
    <>
      <div className="row gy-5 gx-4">
        {cards.slice(0, visible).map((card) => (
          <div className="col-lg-4 col-md-6" key={card.href ?? card.title}>
            <BlogListCard {...card} />
          </div>
        ))}
      </div>

      {visible < cards.length && (
        <button type="button" className="post-load-more" onClick={() => setVisible((count) => count + pageSize)}>
          Load More
        </button>
      )}
    </>
  );
}

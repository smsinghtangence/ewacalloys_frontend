export type BlogListCardData = { image: string; title: string; href?: string };

export default function BlogListCard({ image, title, href = "#" }: BlogListCardData) {
  return (
    <a href={href} className="blog-list-card-link">
      <div className="blog-list-card">
        <div className="blog-list-img">
          <img src={image} alt={title} />
        </div>
        <h3 className="blog-list-title">{title}</h3>
      </div>
    </a>
  );
}

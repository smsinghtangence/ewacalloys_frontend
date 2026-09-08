export default function TopBar({
  label,
  message,
  ctaLabel,
  ctaHref,
}: {
  label: string;
  message: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <div className="top-bar">
      <div className="container">
        <div className="top-header">
          <span>{label}</span>
          <p>{message}</p>
          <a href={ctaHref}>{ctaLabel}</a>
        </div>
      </div>
    </div>
  );
}

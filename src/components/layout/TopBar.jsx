import SmartLink from "@/components/shared/SmartLink";

export default function TopBar({
  label,
  message,
  ctaLabel,
  ctaHref,
}) {
  return (
    <div className="top-bar">
      <div className="container">
        <div className="top-header">
          <span>{label}</span>
          <p data-message={message}>{message}</p>
          <SmartLink href={ctaHref}>{ctaLabel}</SmartLink>
        </div>
      </div>
    </div>
  );
}

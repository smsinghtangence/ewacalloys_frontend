export default function GearBackdrop({ className = "" }) {
  return (
    <div className={`about-gear-bg ${className}`.trim()}>
      <img src="/assets/images/about-gear1.svg" alt="img" className="gear1" />
      <img src="/assets/images/about-gear2.svg" alt="img" className="gear2" />
      <img src="/assets/images/about-gear2.svg" alt="img" className="gear3" />
    </div>
  );
}

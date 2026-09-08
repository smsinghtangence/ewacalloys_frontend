export default function Overlay({ active, onClick }: { active: boolean; onClick: () => void }) {
  return <div className={`overlay${active ? " active" : ""}`} id="overlay" onClick={onClick} />;
}

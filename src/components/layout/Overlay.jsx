export default function Overlay({ active, onClick }) {
  return <div className={`overlay${active ? " active" : ""}`} id="overlay" onClick={onClick} />;
}

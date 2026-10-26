const ROW_1_LOGOS = [
  { src: "/assets/images/client1.svg", alt: "ST" },
  { src: "/assets/images/client2.svg", alt: "JK Cement" },
  { src: "/assets/images/client3.svg", alt: "Nagpur" },
  { src: "/assets/images/client4.svg", alt: "Client" },
  { src: "/assets/images/client5.svg", alt: "NTPC" },
  { src: "/assets/images/client6.svg", alt: "Client" },
  { src: "/assets/images/client7.svg", alt: "Oil India Limited" },
  { src: "/assets/images/client8.svg", alt: "SR Rungta Group" },
  { src: "/assets/images/client9.svg", alt: "Reliance Industries" },
  { src: "/assets/images/client10.svg", alt: "HM" },
];

const ROW_2_LOGOS = [
  { src: "/assets/images/client11.svg", alt: "Client" },
  { src: "/assets/images/client12.svg", alt: "Kalyani" },
  { src: "/assets/images/client13.svg", alt: "Orient Cement" },
  { src: "/assets/images/client14.svg", alt: "CCi" },
  { src: "/assets/images/client15.svg", alt: "Chettinad Cement" },
  { src: "/assets/images/client16.svg", alt: "Zuari Cement" },
  { src: "/assets/images/client17.svg", alt: "The India Cements" },
  { src: "/assets/images/client18.svg", alt: "Client" },
  { src: "/assets/images/client19.svg", alt: "Kamco" },
  { src: "/assets/images/client20.svg", alt: "MMF" },
];

function MarqueeRow({
  logos,
  durationSeconds,
}) {
  return (
    <div className="marquee-track" style={{ animationDuration: `${durationSeconds}s` }}>
      {[...logos, ...logos].map((logo, index) => (
        <div className="logo-slide" key={`${logo.src}-${index}`}>
          <img src={logo.src} alt={logo.alt} />
        </div>
      ))}
    </div>
  );
}

export default function ClientsLogos() {
  return (
    <section className="clients-section">
      <div className="container">
        <h2 className="clients-title">Our Clients</h2>
      </div>

      <div className="clients-row-wrap">
        <div className="logo-slider-1">
          <MarqueeRow logos={ROW_1_LOGOS} durationSeconds={30} />
        </div>
      </div>

      <div className="clients-row-wrap">
        <div className="logo-slider-2">
          <MarqueeRow logos={ROW_2_LOGOS} durationSeconds={30} />
        </div>
      </div>
    </section>
  );
}

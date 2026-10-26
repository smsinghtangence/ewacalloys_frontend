"use client";

import { useEffect, useRef, useState } from "react";



const TESTIMONIALS = [
  {
    name: "Somnath Goswami",
    role: "M&R Products, Training Head",
    years: "15+yrs",
    photo: "/assets/images/life/person-somnath.png",
    quote:
      "“When I think of EWAC, I think of, Immense Learning opportunity – Both technical and behavioral – Enriching knowledge. Knowing new technologies. Great Team work – Here we work together. So winning becomes easier as well as failures are shared. Empowerment – Encouraged to take independent decision being within guideline. & Growth opportunity.”",
  },
  {
    name: "Santanu Banerjee",
    role: "Zonal Head – East region",
    years: "31yrs",
    photo: "/assets/images/life/person-santanu.png",
    quote:
      "“EWAC truly practices its philosophy – People – the Prime Movers. Every possible measure is taken for the development, retention and growth of an employee. EWAC imparts top class training for continuous upgradation of domain knowledge and competencies. EWAC offers an environment of transparency, candour and comfort at work, impeccable inter personal relationship and great respect for knowledge and experience for its employees. The in-depth exposure to various industries and applications, relationship with a variety of Customers, job rotation and working as a team, make the job of an individual more enjoyable at EWAC. I have spent my 31 best years working for this great organization. I feel EWAC truly shaped my professional life.”",
  },
  {
    name: "Sundararaman",
    role: "Zonal Manager – South Zone",
    photo: "/assets/images/life/person-sundararaman.png",
    quote:
      "“EWAC has promoted an ethical and open culture where even field force can approach the Chief Executive. It always puts the employee first!! The application specialist is always considered as the top most employee of the organisation. The other most important aspect of EWAC is the training and soft skill development, where any one can develop the acumen to communicate to the welder and the Managing director with ease. These factors combine to make EWAC truly a unique work place to hone our technical, managerial and behaviour skills. As they say, once a EWACian always an EWACian.”",
  },
  {
    name: "Aditya Gupta",
    role: "Head – Services",
    years: "16yrs",
    photo: "/assets/images/life/person-aditya.png",
    quote:
      "“Working at EWAC for 16 years has been an incredible journey, deeply cherished. Each day, new opportunities to learn and grow, both professionally and personally, have shaped me into a better individual. Continuous learning at EWAC has transformed my experience. One of my most rewarding aspects has been the profound job satisfaction. Contributing to meaningful projects and being part of an excellence-driven team is unparalleled. EWAC's people-centric culture stands out. Support, camaraderie, and collaboration among colleagues foster a positive atmosphere, encouraging innovation and shared achievements.”",
  },
];

const AUTOPLAY_MS = 3000;

export default function LifeTestimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const listRef = useRef(null);
  const person = TESTIMONIALS[active];

  // When the row scrolls sideways (phones), keep the active person centred. Scrolls the row only, never the page.
  useEffect(() => {
    const list = listRef.current;
    const button = list?.children[active];
    if (!list || !button || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({ left: button.offsetLeft - (list.clientWidth - button.clientWidth) / 2, behavior: "smooth" });
  }, [active]);

  // Autoplay: move to the next person every few seconds (restarts after any manual pick, pauses while the
  // pointer or keyboard focus is on the section, and is skipped for visitors who prefer reduced motion).
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => setActive((current) => (current + 1) % TESTIMONIALS.length), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [active, paused]);

  return (
    <section
      className="life-testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="container">
        <h2 className="life-heading">Employee Testimonials</h2>

        <article className="life-quote-card" key={person.name}>
          <div className="life-quote-person">
            <img src={person.photo} alt={person.name} />
            <strong>{person.name}</strong>
            <small>{person.role}</small>
            {person.years && (
              <p>
                <b>{person.years}</b>
                <span>with EWAC</span>
              </p>
            )}
          </div>
          <blockquote>{person.quote}</blockquote>
        </article>

        <div className="life-people" ref={listRef}>
          {TESTIMONIALS.map((item, index) => (
            <button
              type="button"
              key={item.name}
              className={index === active ? "active" : ""}
              aria-pressed={index === active}
              onClick={() => setActive(index)}
            >
              <span className="life-people-initial">{item.name.charAt(0)}</span>
              <span>
                <strong>{item.name}</strong>
                <small>{item.role}</small>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

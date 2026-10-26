"use client";

import { useEffect, useRef, useState } from "react";

const FAQS = [
  {
    question: "What is Maintenance & Repair Welding?",
    answer: (
      <p>
        Maintenance & Repair Welding (M&R welding) refers to restoring wornout, damaged, or
        failed components using welding processes instead of replacing them. It helps extend
        component life and reduce operational costs.
      </p>
    ),
  },
  {
    question: "Why is repair welding preferred over replacement?",
    answer: (
      <ul>
        <li>Reduces downtime</li>
        <li>Saves cost on new parts</li>
        <li>Minimizes inventory requirements</li>
        <li>Supports sustainability (&ldquo;Repair rather than Replace&rdquo;)</li>
      </ul>
    ),
  },
  {
    question: "What are the main causes of component failure?",
    answer: (
      <ul>
        <li>Wear (Abrasion, Friction, Erosion, Impact, Heat, Corrosion, Cavitation etc.)</li>
        <li>Aging due to service</li>
        <li>High temperature degradation</li>
        <li>Mechanical overload</li>
        <li>Design flaws</li>
      </ul>
    ),
  },
  {
    question: "What industries use maintenance welding?",
    answer: (
      <>
        <ul>
          <li>Cement</li>
          <li>Mining</li>
          <li>Steel plants</li>
          <li>Power generation</li>
          <li>Railways</li>
          <li>Oil & Gas (Refineries)</li>
          <li>Tyre</li>
          <li>Sugar</li>
          <li>Forging</li>
          <li>Engineering</li>
          <li>Automobile</li>
          <li>Foundry</li>
          <li>Glass</li>
          <li>Fertiliser & Chemical</li>
          <li>Construction</li>
          <li>Defence</li>
          <li>Paper & Pulp</li>
          <li>Port & Shipyard</li>
          <li>Road Transport</li>
          <li>Textile</li>
        </ul>
        <p>These sectors rely heavily on wear protection and reclamation solutions</p>
      </>
    ),
  },
];

function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}) {
  const answerRef = useRef(null);

  useEffect(() => {
    const el = answerRef.current;
    if (!el) return;
    el.style.maxHeight = isOpen ? `${el.scrollHeight}px` : "0px";
  }, [isOpen]);

  return (
    <div className={`faq-item${isOpen ? " active" : ""}`}>
      <button className="faq-question" type="button" onClick={onToggle}>
        {question}
        <span className="faq-icon">
          <i className="fas fa-chevron-down" />
        </span>
      </button>
      <div className="faq-answer" ref={answerRef}>
        {answer}
      </div>
    </div>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="faq-section">
      <div className="faq-gears-left" aria-hidden="true">
        <img src="/assets/images/about-gear1.svg" className="gear1" alt="img" />
        <img src="/assets/images/about-gear2.svg" className="gear2" alt="img" />
        <img src="/assets/images/about-gear2.svg" className="gear3" alt="img" />
      </div>

      <div className="faq-deco-right" aria-hidden="true">
        <img src="/assets/images/gear4.svg" alt="" className="faq-person" />
      </div>
      <div className="faq-men">
        <img src="/assets/images/Welding_Animation.gif" alt="" />
      </div>

      <div className="container">
        <h2 className="faq-heading">Got Questions?</h2>
        <p className="faq-sub">Everything you need to know, answered honestly.</p>

        <div className="faq-list">
          {FAQS.map((faq, index) => (
            <FaqItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>

        <div className="faq-footer">
          <a href="#" className="faq-btn">
            Read All FAQs
          </a>
        </div>
      </div>
    </section>
  );
}

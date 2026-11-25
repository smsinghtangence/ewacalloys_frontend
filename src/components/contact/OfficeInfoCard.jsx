"use client";

import { useState } from "react";



// Office entries are managed in Strapi → Contact Page → Offices.
export default function OfficeInfoCard({ title = "Our Offices", offices = [] }) {
  const [officeIndex, setOfficeIndex] = useState(0);
  const office = offices[officeIndex] ?? offices[0];
  if (!office) return null;
  if (!office) return null;

  return (
    <div className="contact-office-card">
      <div className="contact-office-header">
        <h3 className="contact-office-title">{title}</h3>
        <div className="contact-office-select-wrap">
          <select
            className="contact-office-select"
            id="officeSelect"
            aria-label="Choose an office"
            value={officeIndex}
            onChange={(event) => setOfficeIndex(Number(event.target.value))}
          >
            {offices.map((item, index) => (
              <option value={index} key={item.label}>
                {item.label}
              </option>
            ))}
          </select>
          <span className="contact-select-arrow">
            <i className="fas fa-chevron-down" />
          </span>
        </div>
      </div>

      <div className="contact-office-row">
        <i className="fas fa-location-dot" />
        <p className="contact-office-text mb-0">
          <span className="contact-office-name">{office.name}</span>
          <br />
          <span>{office.address}</span>
        </p>
      </div>

      <hr className="contact-office-divider" />

      {(office.phones ?? []).length > 0 && (
        <div className="contact-office-row">
          <i className="fas fa-phone" />
          <p className="contact-office-text mb-0 contact-phone">
            {office.phones.map((phone, index) => (
              <span key={phone}>
                {index > 0 && " / "}
                <a href={`tel:${phone.replace(/\s+/g, "")}`}>{phone}</a>
              </span>
            ))}
          </p>
        </div>
      )}
      {office.email && (
        <div className="contact-office-row">
          <i className="fas fa-envelope" />
          <p className="contact-office-text mb-0">
            <a href={`mailto:${office.email}`} target="_blank" rel="noreferrer">
              {office.email}
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

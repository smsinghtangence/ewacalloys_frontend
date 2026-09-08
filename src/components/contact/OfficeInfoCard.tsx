"use client";

import { useState } from "react";

type Office = {
  value: string;
  label: string;
  name: string;
  address: string;
  phones: string[];
  email: string;
};

// West/South addresses are placeholders in the design itself (contact.php),
// explicitly marked "to be updated with real details" — carried over as-is.
const OFFICES: Office[] = [
  {
    value: "head",
    label: "Head Office",
    name: "EWAC Alloys Limited,",
    address:
      "6th floor, AWFIS, Vaman Techno Center, Makwana Road, Marol, Andheri East, Mumbai – 400059. Maharashtra, India.",
    phones: ["+91 89255 22309", "+91 8433603454"],
    email: "enquiry@ewacalloys.com",
  },
  {
    value: "west",
    label: "Western Region Office",
    name: "EWAC Alloys Limited,",
    address: "Placeholder address — Western Region Office, to be updated with real details.",
    phones: ["+91 00000 00000"],
    email: "enquiry@ewacalloys.com",
  },
  {
    value: "south",
    label: "Southern Region Office",
    name: "EWAC Alloys Limited,",
    address: "Placeholder address — Southern Region Office, to be updated with real details.",
    phones: ["+91 00000 00000"],
    email: "enquiry@ewacalloys.com",
  },
];

export default function OfficeInfoCard() {
  const [officeValue, setOfficeValue] = useState(OFFICES[0].value);
  const office = OFFICES.find((item) => item.value === officeValue) ?? OFFICES[0];

  return (
    <div className="contact-office-card">
      <div className="contact-office-header">
        <h3 className="contact-office-title">Our Offices</h3>
        <div className="contact-office-select-wrap">
          <select
            className="contact-office-select"
            id="officeSelect"
            value={officeValue}
            onChange={(event) => setOfficeValue(event.target.value)}
          >
            {OFFICES.map((item) => (
              <option value={item.value} key={item.value}>
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
      <div className="contact-office-row">
        <i className="fas fa-envelope" />
        <p className="contact-office-text mb-0">
          <a href={`mailto:${office.email}`} target="_blank" rel="noreferrer">
            {office.email}
          </a>
        </p>
      </div>
    </div>
  );
}

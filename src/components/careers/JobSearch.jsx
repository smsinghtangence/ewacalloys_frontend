"use client";

import { useEffect, useState } from "react";
import ContactForm from "@/components/contact/ContactForm";

const SAMPLE_JOBS = [
  {
    id: "welding-application-engineer",
    title: "Welding Application Engineer",
    location: "Ankleshwar, Gujarat",
    type: "Engineering",
    summary: "Support customers with welding process recommendations and application trials.",
  },
  {
    id: "production-engineer",
    title: "Production Engineer",
    location: "Ankleshwar, Gujarat",
    type: "Manufacturing",
    summary: "Help deliver safe, reliable production across EWAC's manufacturing operations.",
  },
  {
    id: "quality-assurance-engineer",
    title: "Quality Assurance Engineer",
    location: "Ankleshwar, Gujarat",
    type: "Quality",
    summary: "Contribute to product quality, process control, and continuous improvement.",
  },
  {
    id: "territory-sales-manager",
    title: "Territory Sales Manager",
    location: "West India",
    type: "Sales",
    summary: "Build customer partnerships and support industrial clients across the region.",
  },
  {
    id: "service-engineer",
    title: "Service Engineer",
    location: "Pune, Maharashtra",
    type: "Field Services",
    summary: "Work with customers on-site to support industrial repair and reclamation projects.",
  },
];

export default function JobSearch() {
  const [moreOptions, setMoreOptions] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    if (!selectedJob) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setSelectedJob(null);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedJob]);

  const filteredJobs = SAMPLE_JOBS.filter((job) => {
    const matchesKeyword = `${job.title} ${job.location} ${job.type} ${job.summary}`
      .toLowerCase()
      .includes(keyword.trim().toLowerCase());
    const matchesTitle = job.title.toLowerCase().includes(jobTitle.trim().toLowerCase());
    const matchesLocation = job.location.toLowerCase().includes(location.trim().toLowerCase());

    return matchesKeyword && matchesTitle && matchesLocation;
  });

  const clearSearch = () => {
    setKeyword("");
    setJobTitle("");
    setLocation("");
    setHasSearched(false);
  };

  return (
    <section className="job-search-section" id="job-search" aria-labelledby="job-search-title">
      <div className="container">
        <div className="job-search-heading">
          <p className="careers-eyebrow">Take the next step</p>
          <h1 id="job-search-title">Find a role that fits</h1>
          <p>Search EWAC career opportunities by keyword, job title, or location.</p>
        </div>

        <form
          className="job-search-form"
          onSubmit={(event) => {
            event.preventDefault();
            setHasSearched(true);
          }}
        >
          <div className="job-search-primary">
            <label className="visually-hidden" htmlFor="job-keyword">
              Search by keyword or location
            </label>
            <input
              id="job-keyword"
              type="search"
              placeholder="Search by keyword and/or location"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />
            <button type="submit" className="job-search-button">
              Search
            </button>
            <button type="button" className="job-clear-button" onClick={clearSearch}>
              Clear
            </button>
            <button
              type="button"
              className="job-more-options"
              aria-expanded={moreOptions}
              aria-controls="job-search-filters"
              onClick={() => setMoreOptions((open) => !open)}
            >
              {moreOptions ? "Fewer options" : "More options"}
            </button>
          </div>

          {moreOptions && (
            <div className="job-search-filters" id="job-search-filters">
              <label>
                <span>Job title</span>
                <input
                  type="search"
                  placeholder="Job title"
                  value={jobTitle}
                  onChange={(event) => setJobTitle(event.target.value)}
                />
              </label>
              <label>
                <span>Location</span>
                <input
                  type="search"
                  placeholder="Location"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                />
              </label>
              <div className="job-filter-actions">
                <button type="submit" className="job-search-button">
                  Filter
                </button>
                <button type="button" className="job-clear-button" onClick={clearSearch}>
                  Reset
                </button>
              </div>
            </div>
          )}
        </form>

        <div className="job-results" aria-live="polite">
          <p className="job-results-count">
            {hasSearched ? "Search results" : "Sample role examples"} · {filteredJobs.length}
            {filteredJobs.length === 1 ? " role" : " roles"}
          </p>
          <p className="job-sample-notice">
            Sample listings for layout preview only — these are not confirmed or active vacancies.
          </p>
          {filteredJobs.length > 0 ? (
            <div className="job-list">
              {filteredJobs.map((job) => (
                <article className="job-listing" key={job.id}>
                  <div className="job-listing-main">
                    <p className="job-listing-type">{job.type} · Sample role</p>
                    <h2>{job.title}</h2>
                    <p>{job.summary}</p>
                  </div>
                  <p className="job-listing-location">
                    <i className="fas fa-map-marker-alt" aria-hidden="true" />
                    {job.location}
                  </p>
                  <button
                    className="job-listing-link"
                    type="button"
                    onClick={() => setSelectedJob(job)}
                  >
                    Enquire <span aria-hidden="true">→</span>
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <div className="job-empty-state">
              <span className="job-empty-icon" aria-hidden="true">
                <i className="fas fa-search" />
              </span>
              <h2>No sample roles match your search</h2>
              <p>Try a different keyword, job title, or location.</p>
            </div>
          )}
        </div>
      </div>

      {selectedJob && (
        <div
          className="career-enquiry-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="career-enquiry-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedJob(null);
          }}
        >
          <div className="career-enquiry-panel">
            <button
              type="button"
              className="career-enquiry-close"
              aria-label="Close application form"
              onClick={() => setSelectedJob(null)}
            >
              <i className="fas fa-times" aria-hidden="true" />
            </button>
            <h2 className="contact-form-title" id="career-enquiry-title">
              Enquire about this role
            </h2>
            <p className="contact-form-sub">
              <strong>{selectedJob.title}</strong>
              <br />
              {selectedJob.location} · Sample listing, not an active vacancy
            </p>
            <ContactForm
              key={selectedJob.id}
              initialValues={{
                country: "India",
                interestedIn: `Career enquiry: ${selectedJob.title}`,
                message: `I am interested in learning more about the ${selectedJob.title} role listed for ${selectedJob.location}.`,
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
}

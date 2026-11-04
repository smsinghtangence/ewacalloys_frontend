"use client";

import { useTabs } from "@/components/shared/useTabs";

/** "Our Approach / Capabilities / Services offered" tabs on the ERF page: a photo beside a blue panel with the list. */
export default function ErfTabs({ tabs }) {
  const { activeTab, setActiveTab } = useTabs(tabs.map((tab) => tab.id));
  const tab = tabs.find((t) => t.id === activeTab);

  return (
    <>
      <div className="erf-tabs" role="tablist">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`erf-${t.id}-tab`}
            aria-controls={`erf-${t.id}`}
            aria-selected={t.id === activeTab}
            className={`erf-tab${t.id === activeTab ? " is-active" : ""}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="erf-tab-pane" role="tabpanel" id={`erf-${tab.id}`} aria-labelledby={`erf-${tab.id}-tab`} key={tab.id}>
        <div className="erf-tab-img">
          <img src={tab.image} alt={tab.label} />
        </div>
        <div className="tk-panel tk-panel--blue erf-tab-panel">
          <h3>{tab.label}</h3>
          <ul>
            {tab.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

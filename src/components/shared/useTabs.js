"use client";

import { useState } from "react";

export function useTabs(tabIds, initial = tabIds[0]) {
  const [activeTab, setActiveTab] = useState(initial);

  const onDropdownChange = (event) => {
    setActiveTab(event.target.value);
  };

  return { activeTab, setActiveTab, onDropdownChange };
}

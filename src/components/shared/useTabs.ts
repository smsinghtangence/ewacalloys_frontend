"use client";

import { useState } from "react";

export function useTabs(tabIds: string[], initial = tabIds[0]) {
  const [activeTab, setActiveTab] = useState(initial);

  const onDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveTab(event.target.value);
  };

  return { activeTab, setActiveTab, onDropdownChange };
}

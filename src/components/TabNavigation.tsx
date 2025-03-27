import { useState } from "react";
import { motion } from "framer-motion";
import { Tab } from "@headlessui/react";

interface TabNavigationProps {
  tabs: string[];
  activeTab: number;
  onTabChange: (index: number) => void;
  darkMode: boolean;
}

export default function TabNavigation({
  tabs,
  activeTab,
  onTabChange,
  darkMode,
}: TabNavigationProps) {
  return (
    <div className="mb-8">
      <Tab.Group selectedIndex={activeTab} onChange={onTabChange}>
        <Tab.List
          className={`flex space-x-1 rounded-xl p-1 ${
            darkMode ? "bg-[#1E1B2E]" : "bg-gray-100"
          }`}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              className={({ selected }) => `
                w-full rounded-lg py-3 text-sm font-medium transition-all
                ${
                  selected
                    ? darkMode
                      ? "bg-[#8B5CF6] text-white shadow"
                      : "bg-white text-[#8B5CF6] shadow"
                    : darkMode
                    ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                    : "text-gray-500 hover:bg-gray-200 hover:text-gray-900"
                }
              `}
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
    </div>
  );
}

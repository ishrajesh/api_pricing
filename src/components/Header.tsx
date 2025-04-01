import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  BellIcon,
  ChevronDownIcon,
} from "@heroicons/react/20/solid";
import { Calculator, Zap, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  darkMode: boolean;
  currentSection: string;
  onQuickCalculate: () => void;
  onSectionChange: (section: string) => void;
}

export default function Header({
  darkMode,
  currentSection,
  onQuickCalculate,
  onSectionChange,
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleModelMetricsClick = () => {
    onSectionChange("calculator");
  };

  const navigationItems = [
    { id: "calculator", label: "Calculator" },
    { id: "results", label: "Results" },
    { id: "models", label: "Models" },
    { id: "docs", label: "Documentation" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 ${
        darkMode ? "bg-[#13111C]" : "bg-white"
      }`}
    >
      {/* Top Header */}
      <div className="border-b border-[#2D2B3B]">
        <div className="h-16 px-4">
          <div className="flex items-center justify-between h-full max-w-[1920px] mx-auto">
            {/* Left Section: Brand */}
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                onClick={handleModelMetricsClick}
                className="flex items-center space-x-2 transition-opacity duration-200 hover:opacity-80"
              >
                <Calculator className="h-6 w-6 text-[#8B5CF6]" />
                <span
                  className={`text-lg font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  ModelMetrics
                </span>
              </Link>
            </div>

            {/* Center Section: Search */}
            <div className="flex-1 max-w-2xl px-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MagnifyingGlassIcon
                    className={`h-4 w-4 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                    darkMode
                      ? "bg-[#1E1B2E] text-white placeholder-gray-400 border-transparent focus:border-purple-500"
                      : "bg-gray-100 text-gray-900 placeholder-gray-500 border-transparent focus:border-purple-500"
                  } border-2 focus:ring-2 focus:ring-purple-500/20`}
                  placeholder="Search models, features..."
                />
              </div>
            </div>

            {/* Right Section: Actions */}
            <div className="flex items-center space-x-2">
              <motion.button
                onClick={onQuickCalculate}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium shadow-sm transition-all bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Zap className="h-4 w-4 mr-2" />
                Quick Calculate
              </motion.button>

              <div className="flex items-center pl-2 space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode
                      ? "hover:bg-gray-800 text-gray-400 hover:text-white"
                      : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Share2 className="h-5 w-5" />
                </motion.button>

                <div className="flex items-center space-x-1 pl-2 border-l border-gray-700">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode
                        ? "hover:bg-gray-800 text-gray-300"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <UserCircleIcon className="h-5 w-5" />
                  </motion.button>

                  <motion.div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-2 rounded-lg transition-colors ${
                        darkMode
                          ? "hover:bg-gray-800 text-gray-300"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      <BellIcon className="h-5 w-5" />
                    </motion.button>
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-[#13111C]"></span>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="h-12 border-b border-[#2D2B3B]">
        <div className="h-full max-w-[1920px] mx-auto flex items-center justify-center">
          <nav className="flex items-center space-x-6">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`h-full px-2.5 flex items-center text-[15px] transition-colors relative ${
                  currentSection === item.id
                    ? "text-[#8B5CF6]"
                    : darkMode
                    ? "text-gray-400 hover:text-gray-200"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {item.label}
                {currentSection === item.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-[#8B5CF6]"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

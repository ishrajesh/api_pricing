import { useState } from "react";
import { motion } from "framer-motion";
import {
  MoonIcon,
  SunIcon,
  DocumentTextIcon,
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
  onThemeToggle: () => void;
  currentSection: string;
  providers: string[];
  onQuickCalculate: () => void;
}

export default function Header({
  darkMode,
  onThemeToggle,
  currentSection,
  providers = [],
  onQuickCalculate,
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Generate breadcrumb path based on current section
  const getBreadcrumb = () => {
    switch (currentSection) {
      case "calculator":
        return "Home / Calculator";
      case "results":
        return "Home / Results & Visualization";
      case "models":
        return "Home / Model Comparison";
      case "docs":
        return "Home / Documentation";
      case "faq":
        return "Home / FAQ";
      case "settings":
        return "Home / Settings";
      default:
        return "Home";
    }
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`transition-colors duration-200 ${
        darkMode
          ? "bg-gray-800/95 backdrop-blur-sm shadow-gray-900/10"
          : "bg-white/95 backdrop-blur-sm shadow-soft"
      } sticky top-0 z-40 ml-64`}
    >
      <div className="container mx-auto px-4 py-2">
        {/* Breadcrumb Navigation */}
        <div className="text-sm text-gray-500 mb-2 pl-1">{getBreadcrumb()}</div>

        <div className="flex items-center justify-between">
          {/* Search Bar */}
          <div className="relative w-64">
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
              className={`w-full pl-10 pr-3 py-2 rounded-lg text-sm ${
                darkMode
                  ? "bg-gray-700/50 text-white placeholder-gray-400 border-gray-600"
                  : "bg-gray-100 text-gray-900 placeholder-gray-500 border-gray-200"
              } border focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Search models, features..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* Quick Calculate */}
            <motion.button
              onClick={onQuickCalculate}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium shadow-sm transition-all ${
                darkMode
                  ? "bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
                  : "bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
              }`}
            >
              <Zap className="h-4 w-4 mr-2" />
              Quick Calculate
            </motion.button>

            {/* Provider Dropdown */}
            <div className="relative inline-block text-left">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium shadow-sm transition-all ${
                  darkMode
                    ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                Providers
                <ChevronDownIcon className="h-4 w-4 ml-1" />
              </motion.button>
              {/* Dropdown menu would go here */}
            </div>

            {/* Theme Toggle */}
            <motion.button
              onClick={onThemeToggle}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-full transition-colors ${
                darkMode
                  ? "hover:bg-white/10 text-gray-400 hover:text-white"
                  : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
              }`}
            >
              {darkMode ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </motion.button>

            {/* Share Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-full transition-colors ${
                darkMode
                  ? "hover:bg-white/10 text-gray-400 hover:text-white"
                  : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
              }`}
            >
              <Share2 className="h-5 w-5" />
            </motion.button>

            {/* Export Results */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium text-white shadow-sm transition-all ${
                darkMode
                  ? "bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
                  : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
              }`}
            >
              <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
              Export
            </motion.button>

            {/* User Profile / Settings */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-1 rounded-full transition-colors ${
                darkMode
                  ? "hover:bg-white/10 text-gray-300"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <UserCircleIcon className="h-6 w-6" />
            </motion.button>

            {/* Notifications */}
            <motion.div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-1 rounded-full transition-colors ${
                  darkMode
                    ? "hover:bg-white/10 text-gray-300"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <BellIcon className="h-6 w-6" />
              </motion.button>
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

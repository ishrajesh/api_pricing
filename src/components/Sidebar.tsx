import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Calculator,
  BarChart,
  Layers,
  FileText,
  HelpCircle,
  Settings,
  Save,
  History,
} from "lucide-react";

interface SidebarProps {
  darkMode: boolean;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Sidebar({
  darkMode,
  activeSection,
  onSectionChange,
}: SidebarProps) {
  const navItems = [
    { id: "calculator", label: "Calculator", icon: Calculator },
    { id: "results", label: "Results & Visualization", icon: BarChart },
    { id: "models", label: "Model Comparison", icon: Layers },
    { id: "docs", label: "Documentation", icon: FileText },
    { id: "faq", label: "FAQ", icon: HelpCircle },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const quickActions = [
    { id: "save", label: "Save Configuration", icon: Save },
    { id: "history", label: "Recent Calculations", icon: History },
  ];

  return (
    <div
      className={`h-full ${
        darkMode ? "bg-[#1E1B2E] text-white" : "bg-gray-100 text-gray-800"
      } flex flex-col`}
    >
      {/* Logo area */}
      <div
        className={`p-4 border-b ${
          darkMode ? "border-gray-700" : "border-gray-200"
        } flex items-center`}
      >
        <div className="flex items-center text-sm">
          <span className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            Home
          </span>
          <span
            className={`mx-2 ${darkMode ? "text-gray-600" : "text-gray-400"}`}
          >
            /
          </span>
          <span
            className={`${
              darkMode ? "text-white" : "text-gray-900"
            } capitalize`}
          >
            {activeSection}
          </span>
        </div>
      </div>

      {/* Main navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <motion.button
                  onClick={() => onSectionChange(item.id)}
                  className={`w-full flex items-center px-3 py-3 rounded-md transition-colors ${
                    activeSection === item.id
                      ? darkMode
                        ? "bg-[#8B5CF6] text-white"
                        : "bg-blue-100 text-blue-700"
                      : darkMode
                      ? "text-gray-300 hover:bg-gray-700/30 hover:text-white"
                      : "text-gray-700 hover:bg-gray-200 hover:text-black"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="h-5 w-5" />
                  <span className="ml-3">{item.label}</span>
                </motion.button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Quick actions */}
      <div
        className={`p-4 border-t ${
          darkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <h3 className="text-sm font-medium mb-3 text-gray-400">
          Quick Actions
        </h3>
        <ul className="space-y-2">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <li key={action.id}>
                <motion.button
                  className={`w-full flex items-center px-3 py-2 rounded-md transition-colors ${
                    darkMode
                      ? "text-gray-300 hover:bg-gray-700/30 hover:text-white"
                      : "text-gray-700 hover:bg-gray-200 hover:text-black"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="h-4 w-4" />
                  <span className="ml-3 text-sm">{action.label}</span>
                </motion.button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

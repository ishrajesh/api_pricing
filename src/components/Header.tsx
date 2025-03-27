import { motion } from "framer-motion";
import {
  MoonIcon,
  SunIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/20/solid";
import { Calculator } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  darkMode: boolean;
  onThemeToggle: () => void;
}

export default function Header({ darkMode, onThemeToggle }: HeaderProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`transition-colors duration-200 ${
        darkMode
          ? "bg-gray-800/95 backdrop-blur-sm shadow-gray-900/10"
          : "bg-white/95 backdrop-blur-sm shadow-soft"
      } sticky top-0 z-50`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div
              className={`p-2 rounded-xl ${
                darkMode ? "bg-blue-500/10" : "bg-blue-50"
              }`}
            >
              <Calculator
                className={`h-8 w-8 ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`}
              />
            </div>
            <div>
              <h1
                className={`text-2xl font-semibold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                ModelMetrics
              </h1>
              <p
                className={`text-sm font-medium ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                AI Inference Cost Calculator
              </p>
            </div>
          </motion.div>

          <div className="flex items-center space-x-4">
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

            <Link
              to="/docs"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                darkMode
                  ? "text-gray-400 hover:text-white hover:bg-white/5"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <DocumentTextIcon className="h-4 w-4" />
              <span>Docs</span>
            </Link>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white shadow-sm transition-all ${
                darkMode
                  ? "bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
                  : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
              }`}
            >
              <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
              Export Results
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

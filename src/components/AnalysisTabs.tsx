import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, SlidersHorizontal } from "lucide-react";
import CostBreakdown from "./CostBreakdown";
import ModelFeatureMatrix from "./ModelFeatureMatrix";
import { CalculationParams, Model, Provider } from "../types";

interface AnalysisTabsProps {
  params: CalculationParams;
  selectedProviders: Provider[];
  darkMode: boolean;
  selectedModelIds: string[];
  models: Model[];
}

export default function AnalysisTabs({
  params,
  selectedProviders,
  darkMode,
  selectedModelIds,
  models,
}: AnalysisTabsProps) {
  const [activeTab, setActiveTab] = useState<"cost" | "features">("cost");

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div
        className={`border-b ${
          darkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <nav className="flex space-x-8" aria-label="Analysis Tabs">
          <button
            onClick={() => setActiveTab("cost")}
            className={`py-4 px-1 inline-flex items-center gap-2 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === "cost"
                ? `${
                    darkMode
                      ? "border-purple-500 text-purple-400"
                      : "border-purple-600 text-purple-600"
                  }`
                : `${
                    darkMode
                      ? "border-transparent text-gray-400 hover:text-gray-300"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`
            } transition-colors duration-200`}
          >
            <BarChart3 className="h-5 w-5" />
            Cost Analysis
          </button>
          <button
            onClick={() => setActiveTab("features")}
            className={`py-4 px-1 inline-flex items-center gap-2 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === "features"
                ? `${
                    darkMode
                      ? "border-purple-500 text-purple-400"
                      : "border-purple-600 text-purple-600"
                  }`
                : `${
                    darkMode
                      ? "border-transparent text-gray-400 hover:text-gray-300"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`
            } transition-colors duration-200`}
          >
            <SlidersHorizontal className="h-5 w-5" />
            Feature Comparison
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === "cost" ? (
          <CostBreakdown
            params={params}
            selectedProviders={selectedProviders}
            darkMode={darkMode}
            selectedModelIds={selectedModelIds}
          />
        ) : (
          <ModelFeatureMatrix
            models={models.filter(
              (model) =>
                selectedProviders.includes(model.provider) &&
                (selectedModelIds.length === 0 ||
                  selectedModelIds.includes(model.id))
            )}
            darkMode={darkMode}
          />
        )}
      </motion.div>
    </div>
  );
}

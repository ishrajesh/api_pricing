import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import ModelFeatureMatrix from "./ModelFeatureMatrix";
import CostBreakdown from "./CostBreakdown";
import { Model, CalculationParams, Provider } from "../types";

interface CombinedFeatureSectionProps {
  models: Model[];
  darkMode: boolean;
  params: CalculationParams;
  selectedProviders: Provider[];
  selectedModelIds: string[];
  isCalculated: boolean;
}

export default function CombinedFeatureSection({
  models,
  darkMode,
  params,
  selectedProviders,
  selectedModelIds,
  isCalculated,
}: CombinedFeatureSectionProps) {
  const [activeTab, setActiveTab] = useState<"features" | "optimization">(
    "optimization"
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <h2
          className={`text-2xl font-bold mb-4 md:mb-0 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Model Analysis & Comparison
        </h2>

        <div
          className={`inline-flex rounded-lg ${
            darkMode ? "bg-gray-800/50" : "bg-gray-100"
          } p-1`}
        >
          <button
            onClick={() => setActiveTab("optimization")}
            className={`px-4 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
              activeTab === "optimization"
                ? darkMode
                  ? "bg-[#8B5CF6] text-white shadow-lg shadow-purple-900/20"
                  : "bg-[#8B5CF6] text-white shadow-md"
                : darkMode
                ? "text-gray-400 hover:text-white hover:bg-gray-700/50"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            <span>Cost Optimization</span>
          </button>
          <button
            onClick={() => setActiveTab("features")}
            className={`px-4 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
              activeTab === "features"
                ? darkMode
                  ? "bg-[#8B5CF6] text-white shadow-lg shadow-purple-900/20"
                  : "bg-[#8B5CF6] text-white shadow-md"
                : darkMode
                ? "text-gray-400 hover:text-white hover:bg-gray-700/50"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Feature Comparison</span>
          </button>
        </div>
      </div>

      {activeTab === "features" ? (
        <ModelFeatureMatrix models={models} darkMode={darkMode} />
      ) : (
        <CostBreakdown
          params={params}
          selectedProviders={selectedProviders}
          darkMode={darkMode}
          selectedModelIds={selectedModelIds}
          isCalculated={isCalculated}
        />
      )}
    </div>
  );
}

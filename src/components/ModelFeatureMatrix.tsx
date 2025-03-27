import { Model, ModelFeature } from "../types";
import {
  CheckCircle2,
  XCircle,
  Filter,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface ModelFeatureMatrixProps {
  models: Model[];
  darkMode: boolean;
}

export default function ModelFeatureMatrix({
  models,
  darkMode,
}: ModelFeatureMatrixProps) {
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [showAllModels, setShowAllModels] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<ModelFeature[]>([]);

  const allFeatures = Array.from(
    new Set(models.flatMap((model) => model.features))
  ).sort() as ModelFeature[];

  const displayFeatures = showAllFeatures
    ? allFeatures
    : allFeatures.slice(0, 4);

  const toggleFeature = (feature: ModelFeature) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };

  const filteredModels =
    selectedFeatures.length > 0
      ? models.filter((model) =>
          selectedFeatures.every((feature) => model.features.includes(feature))
        )
      : models;

  // Display only 5 models initially
  const displayModels = showAllModels
    ? filteredModels
    : filteredModels.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`space-y-8 transition-colors duration-200 ${
        darkMode ? "bg-background" : "bg-white"
      } p-8 rounded-xl shadow-md border ${
        darkMode ? "border-gray-700" : "border-gray-200"
      }`}
    >
      <div>
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 rounded-lg bg-gray-800">
            <SlidersHorizontal className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">
              Feature Comparison
            </h2>
            <p className="text-sm text-gray-400">
              Compare capabilities across {filteredModels.length} models
            </p>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-3">
            <Filter className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-300">
              Filter by features
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {allFeatures.map((feature) => (
              <button
                key={feature}
                onClick={() => toggleFeature(feature)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  selectedFeatures.includes(feature)
                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                    : "bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700"
                }`}
              >
                {feature}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider sticky left-0 bg-gray-800 z-10">
                  MODEL
                </th>
                {displayFeatures.map((feature) => (
                  <th
                    key={feature}
                    className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    {feature}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {displayModels.map((model, index) => (
                <tr
                  key={model.id}
                  className={index % 2 === 0 ? "bg-gray-800/50" : ""}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white sticky left-0 bg-inherit z-10">
                    {model.name}
                  </td>
                  {displayFeatures.map((feature) => (
                    <td
                      key={`${model.id}-${feature}`}
                      className="px-6 py-4 whitespace-nowrap text-center"
                    >
                      {model.features.includes(feature) ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <XCircle className="h-5 w-5 text-gray-500 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={() => setShowAllFeatures(!showAllFeatures)}
            className="px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-md text-sm font-medium transition-colors"
          >
            Show {showAllFeatures ? "Fewer" : "All"} Features
          </button>

          {filteredModels.length > 5 && (
            <button
              onClick={() => setShowAllModels(!showAllModels)}
              className="px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
            >
              <span>Show {filteredModels.length - 5} More Models</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

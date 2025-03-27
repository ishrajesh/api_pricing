import { motion } from "framer-motion";
import { useState } from "react";
import { CalculationParams, Provider } from "../types";
import { getModelsByProvider } from "../data/modelPricing";
import { calculateCosts } from "../utils/costCalculator";
import {
  TrendingUp,
  Award,
  AlertTriangle,
  Download,
  BarChart3,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface CostBreakdownProps {
  params: CalculationParams;
  selectedProviders: Provider[];
  darkMode: boolean;
  selectedModelIds: string[];
}

export default function CostBreakdown({
  params,
  selectedProviders,
  darkMode,
  selectedModelIds,
}: CostBreakdownProps) {
  const [showModelAnalysis, setShowModelAnalysis] = useState(false);

  const models = selectedProviders
    .flatMap((provider) => getModelsByProvider(provider))
    .filter((model) => selectedModelIds.includes(model.id));

  const modelCosts = models.map((model) => {
    const costs = calculateCosts({
      inputSize: params.inputSize,
      outputSize: params.outputSize,
      requests: params.requests,
      useTokens: params.useTokens,
      inputCostPerMillion: model.inputCost,
      outputCostPerMillion: model.outputCost,
    });

    // Calculate efficiency score based on cost per token and features
    const costPerToken = (model.inputCost + model.outputCost) / 2;
    const featureScore = model.features.length / 6; // Normalize by max possible features
    const contextScore = model.contextWindow / 200000; // Normalize by max context window
    const efficiencyScore =
      ((1 / costPerToken) * 0.4 + featureScore * 0.3 + contextScore * 0.3) *
      100;

    return {
      model,
      costs: params.currency === "USD" ? costs.costsUSD : costs.costsINR,
      efficiencyScore: Math.round(efficiencyScore * 10) / 10,
    };
  });

  // Calculate cost metrics
  const totalCost = modelCosts.reduce((sum, m) => sum + m.costs.total, 0);
  const avgCost = totalCost / modelCosts.length;
  const bestValueModel = modelCosts.reduce((prev, curr) =>
    curr.efficiencyScore > prev.efficiencyScore ? curr : prev
  );

  // Calculate potential savings
  const optimalCost = modelCosts.reduce(
    (min, curr) => Math.min(min, curr.costs.total),
    Infinity
  );
  const potentialSavings = totalCost - optimalCost * modelCosts.length;

  const formatCurrency = (value: number) => {
    const symbol = params.currency === "USD" ? "$" : "₹";
    if (value >= 1000000) return `${symbol}${(value / 1000000).toFixed(2)}M`;
    if (value >= 1000) return `${symbol}${(value / 1000).toFixed(2)}K`;
    return `${symbol}${value.toFixed(2)}`;
  };

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
      <div className="flex justify-between items-center">
        <div>
          <h2
            className={`text-xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            } flex items-center gap-2`}
          >
            <BarChart3
              className={`h-5 w-5 ${
                darkMode ? "text-purple-400" : "text-purple-600"
              }`}
            />
            Cost Analysis & Optimization
          </h2>
          <p
            className={`text-sm mt-1 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Comprehensive cost analysis with efficiency scoring and
            recommendations
          </p>
        </div>
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${
            darkMode
              ? "bg-purple-600 hover:bg-purple-700 text-white"
              : "bg-purple-600 hover:bg-purple-700 text-white"
          } transition-colors duration-200`}
        >
          <Download className="h-4 w-4" />
          Export Analysis
        </button>
      </div>

      {/* Cost Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className={`p-6 rounded-xl ${
            darkMode ? "bg-gray-800/80" : "bg-gray-50"
          } shadow-sm border ${
            darkMode ? "border-gray-700" : "border-gray-100"
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`p-2 rounded-full ${
                darkMode ? "bg-purple-900/30" : "bg-purple-100"
              }`}
            >
              <BarChart3
                className={darkMode ? "text-purple-400" : "text-purple-600"}
                size={18}
              />
            </div>
            <div
              className={`text-sm font-medium ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Total {params.timeframe || "Monthly"} Cost
            </div>
          </div>
          <div
            className={`text-2xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {formatCurrency(totalCost)}
          </div>
          <div
            className={`text-xs mt-2 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Based on {params.requests.toLocaleString()} requests
          </div>
        </div>

        <div
          className={`p-6 rounded-xl ${
            darkMode ? "bg-gray-800/80" : "bg-gray-50"
          } shadow-sm border ${
            darkMode ? "border-gray-700" : "border-gray-100"
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`p-2 rounded-full ${
                darkMode ? "bg-green-900/30" : "bg-green-100"
              }`}
            >
              <TrendingUp
                className={darkMode ? "text-green-400" : "text-green-600"}
                size={18}
              />
            </div>
            <div
              className={`text-sm font-medium ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Potential Savings
            </div>
          </div>
          <div
            className={`text-2xl font-bold ${
              darkMode ? "text-green-400" : "text-green-600"
            }`}
          >
            {formatCurrency(potentialSavings)}
          </div>
          <div
            className={`text-xs mt-2 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            By optimizing model selection
          </div>
        </div>

        <div
          className={`p-6 rounded-xl ${
            darkMode ? "bg-gray-800/80" : "bg-gray-50"
          } shadow-sm border ${
            darkMode ? "border-gray-700" : "border-gray-100"
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`p-2 rounded-full ${
                darkMode ? "bg-purple-900/30" : "bg-purple-100"
              }`}
            >
              <Award
                className={darkMode ? "text-purple-400" : "text-purple-600"}
                size={18}
              />
            </div>
            <div
              className={`text-sm font-medium ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Best Value Model
            </div>
          </div>
          <div
            className={`text-xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {bestValueModel?.model.name || "N/A"}
          </div>
          <div
            className={`text-xs mt-2 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {bestValueModel
              ? `${bestValueModel.efficiencyScore}% efficiency score`
              : "No models selected"}
          </div>
        </div>
      </div>

      {/* Optimization Insights */}
      <div
        className={`p-6 rounded-xl ${
          darkMode ? "bg-purple-900/10" : "bg-purple-50"
        } border ${darkMode ? "border-purple-900/20" : "border-purple-100"}`}
      >
        <h3
          className={`text-lg font-semibold mb-4 ${
            darkMode ? "text-white" : "text-gray-900"
          } flex items-center gap-2`}
        >
          <AlertTriangle
            className={`h-5 w-5 ${
              darkMode ? "text-purple-400" : "text-purple-600"
            }`}
          />
          Optimization Insights
        </h3>

        <div className="space-y-4">
          <div
            className={`p-4 rounded-lg ${
              darkMode ? "bg-background/80" : "bg-white"
            } shadow-sm`}
          >
            <h4
              className={`text-sm font-medium mb-2 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Cost Efficiency
            </h4>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {bestValueModel
                ? `${
                    bestValueModel.model.name
                  } offers the best balance of features and cost at ${formatCurrency(
                    bestValueModel.costs.total
                  )} per ${params.requests.toLocaleString()} requests.`
                : "Select models to see cost efficiency analysis."}
            </p>
          </div>

          <div
            className={`p-4 rounded-lg ${
              darkMode ? "bg-background/80" : "bg-white"
            } shadow-sm`}
          >
            <h4
              className={`text-sm font-medium mb-2 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Savings Opportunity
            </h4>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {potentialSavings > 0
                ? `You could save up to ${formatCurrency(
                    potentialSavings
                  )} by optimizing your model selection.`
                : "Your current model selection is already optimized for cost."}
            </p>
          </div>
        </div>
      </div>

      {/* Show More Button */}
      <button
        onClick={() => setShowModelAnalysis(!showModelAnalysis)}
        className={`w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 ${
          darkMode
            ? "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700"
            : "bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-200"
        } transition-colors duration-200`}
      >
        <span className="text-sm font-medium">
          {showModelAnalysis ? "Hide Model Analysis" : "Show Model Analysis"}
        </span>
        {showModelAnalysis ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>

      {/* Model Efficiency Analysis - Conditionally Rendered */}
      {showModelAnalysis && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3
            className={`text-lg font-semibold mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            } flex items-center gap-2`}
          >
            <BarChart3
              className={`h-5 w-5 ${
                darkMode ? "text-purple-400" : "text-purple-600"
              }`}
            />
            Model Efficiency Analysis
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {modelCosts.map(({ model, efficiencyScore, costs }) => (
              <div
                key={model.id}
                className={`p-5 rounded-xl ${
                  darkMode ? "bg-gray-800/80" : "bg-white"
                } shadow-sm border ${
                  darkMode ? "border-gray-700" : "border-gray-200"
                } hover:shadow-md transition-shadow duration-200`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3
                      className={`font-medium ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {model.name}
                    </h3>
                    <span
                      className={`text-xs ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {model.provider}
                    </span>
                  </div>
                  <div
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      efficiencyScore >= 70
                        ? darkMode
                          ? "bg-green-900/30 text-green-400"
                          : "bg-green-100 text-green-700"
                        : efficiencyScore >= 50
                        ? darkMode
                          ? "bg-yellow-900/30 text-yellow-400"
                          : "bg-yellow-100 text-yellow-700"
                        : darkMode
                        ? "bg-red-900/30 text-red-400"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {efficiencyScore}% efficient
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Total Cost:
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {formatCurrency(costs.total)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Input Cost:
                    </span>
                    <span
                      className={`text-sm ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {formatCurrency(costs.input)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Output Cost:
                    </span>
                    <span
                      className={`text-sm ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {formatCurrency(costs.output)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-700/30 flex flex-wrap gap-1.5">
                  {model.features.includes("JSON Mode") && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        darkMode
                          ? "bg-purple-900/30 text-purple-400"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      Feature-rich
                    </span>
                  )}
                  {model.contextWindow >= 100000 && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        darkMode
                          ? "bg-blue-900/30 text-blue-400"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      High Context
                    </span>
                  )}
                  {(model.inputCost + model.outputCost) / 2 < 20 && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        darkMode
                          ? "bg-green-900/30 text-green-400"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      Budget
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

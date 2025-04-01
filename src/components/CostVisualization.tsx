import { CalculationParams, Provider } from "../types";
import { Bar, Radar, Scatter } from "react-chartjs-2";
import { getModelsByProvider } from "../data/modelPricing";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { calculateCosts } from "../utils/costCalculator";
import { BarChart3, RadarIcon, ScatterChart } from "lucide-react";
import { useState } from "react";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

interface CostVisualizationProps {
  params: CalculationParams;
  onParamsChange: (params: CalculationParams) => void;
  selectedProviders: Provider[];
  darkMode: boolean;
  selectedModelIds: string[];
}

export default function CostVisualization({
  params,
  onParamsChange,
  selectedProviders,
  darkMode,
  selectedModelIds,
}: CostVisualizationProps) {
  const [showLimitedModels, setShowLimitedModels] = useState(true);
  const MAX_MODELS_IN_CHART = 10;
  const [activeChart, setActiveChart] = useState<"bar" | "radar" | "scatter">(
    "bar"
  );

  const models = selectedProviders
    .flatMap((provider) => getModelsByProvider(provider))
    .filter((model) => selectedModelIds.includes(model.id));

  const modelData = models.map((model) => {
    const costs = calculateCosts({
      inputSize: params.inputSize,
      outputSize: params.outputSize,
      requests: params.requests,
      useTokens: params.useTokens,
      inputCostPerMillion: model.inputCost,
      outputCostPerMillion: model.outputCost,
    });

    return {
      model,
      inputCost: costs.costsUSD.input * (params.currency === "INR" ? 83 : 1),
      outputCost: costs.costsUSD.output * (params.currency === "INR" ? 83 : 1),
      totalCost: costs.costsUSD.total * (params.currency === "INR" ? 83 : 1),
      contextWindow: model.contextWindow,
      featureCount: model.features.length,
    };
  });

  // Sort models by total cost in descending order instead of ascending
  const sortedModels = [...modelData].sort((a, b) => b.totalCost - a.totalCost);

  // Use limited models if showLimitedModels is true
  const visualizationModels = showLimitedModels
    ? sortedModels.slice(0, MAX_MODELS_IN_CHART)
    : sortedModels;

  const formatCurrency = (value: number | string | undefined): string => {
    if (typeof value !== "number") return "0.00";

    if (params.currency === "USD") {
      if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
      if (value >= 1000) return `$${(value / 1000).toFixed(2)}K`;
      return `$${value.toFixed(2)}`;
    } else {
      if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)}Cr`;
      if (value >= 100000) return `₹${(value / 100000).toFixed(2)}L`;
      if (value >= 1000) return `₹${(value / 1000).toFixed(2)}K`;
      return `₹${value.toFixed(2)}`;
    }
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            family: "Inter",
            size: 12,
          },
          color: darkMode ? "#e5e7eb" : "#374151",
        },
      },
      tooltip: {
        backgroundColor: darkMode
          ? "rgba(17, 24, 39, 0.8)"
          : "rgba(255, 255, 255, 0.8)",
        titleColor: darkMode ? "#e5e7eb" : "#111827",
        bodyColor: darkMode ? "#e5e7eb" : "#374151",
        borderColor: darkMode
          ? "rgba(75, 85, 99, 0.2)"
          : "rgba(229, 231, 235, 0.8)",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        titleFont: {
          family: "Inter",
          size: 14,
          weight: 700,
        },
        bodyFont: {
          family: "Inter",
          size: 13,
          weight: 400,
        },
        callbacks: {
          label: function (context: any) {
            const label = context.dataset.label || "";
            const value = context.raw;
            return `${label}: ${formatCurrency(value)}`;
          },
        },
      },
    },
  };

  // Bar chart data - using sortedData instead of modelData
  const barData = {
    labels: visualizationModels.map((model) => model.model.name),
    datasets: [
      {
        label: "Input Cost",
        data: visualizationModels.map((model) => model.inputCost),
        backgroundColor: darkMode
          ? "rgba(79, 70, 229, 0.7)" // Indigo in dark mode (#4F46E5)
          : "rgba(79, 70, 229, 0.7)", // Same indigo in light mode
        borderColor: darkMode ? "rgb(79, 70, 229)" : "rgb(79, 70, 229)",
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: "Output Cost",
        data: visualizationModels.map((model) => model.outputCost),
        backgroundColor: darkMode
          ? "rgba(217, 70, 239, 0.7)" // Fuchsia in dark mode (#D946EF)
          : "rgba(217, 70, 239, 0.7)", // Same fuchsia in light mode
        borderColor: darkMode ? "rgb(217, 70, 239)" : "rgb(217, 70, 239)",
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  // Radar chart data
  const radarData = {
    labels: [
      "Total Cost",
      "Input Cost",
      "Output Cost",
      "Context Window",
      "Features",
    ],
    datasets: visualizationModels.map((model, index) => ({
      label: model.model.name,
      data: [
        // Normalize values for radar chart
        (model.totalCost /
          Math.max(...visualizationModels.map((m) => m.totalCost))) *
          100 || 0,
        (model.inputCost /
          Math.max(...visualizationModels.map((m) => m.inputCost))) *
          100 || 0,
        (model.outputCost /
          Math.max(...visualizationModels.map((m) => m.outputCost))) *
          100 || 0,
        (model.contextWindow /
          Math.max(...visualizationModels.map((m) => m.contextWindow))) *
          100 || 0,
        (model.featureCount /
          Math.max(...visualizationModels.map((m) => m.featureCount))) *
          100 || 0,
      ],
      backgroundColor: `hsla(${
        index * (360 / visualizationModels.length)
      }, 85%, 60%, 0.2)`,
      borderColor: `hsla(${
        index * (360 / visualizationModels.length)
      }, 85%, 60%, 0.8)`,
      borderWidth: 2,
      pointBackgroundColor: `hsla(${
        index * (360 / visualizationModels.length)
      }, 85%, 60%, 0.8)`,
      pointBorderColor: darkMode ? "#fff" : "#fff",
      pointHoverBackgroundColor: darkMode ? "#fff" : "#fff",
      pointHoverBorderColor: `hsla(${
        index * (360 / visualizationModels.length)
      }, 85%, 60%, 1)`,
    })),
  };

  // Scatter chart data
  const scatterData = {
    datasets: visualizationModels.map((model, index) => ({
      label: model.model.name,
      data: [
        {
          x: model.contextWindow / 1000, // Normalized context window
          y: model.totalCost,
        },
      ],
      backgroundColor: `hsla(${
        index * (360 / visualizationModels.length)
      }, 85%, 60%, 0.6)`,
      borderColor: `hsla(${
        index * (360 / visualizationModels.length)
      }, 85%, 60%, 0.8)`,
      borderWidth: 2,
      pointRadius: 8,
      pointHoverRadius: 10,
    })),
  };

  // Bar chart options
  const barOptions = {
    ...commonOptions,
    indexAxis: "y" as const,
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: `Cost (${params.currency})`,
          color: darkMode ? "#e5e7eb" : "#374151",
          font: {
            family: "Inter",
            size: 12,
            weight: 500,
          },
        },
        grid: {
          color: darkMode
            ? "rgba(75, 85, 99, 0.2)"
            : "rgba(229, 231, 235, 0.8)",
        },
        ticks: {
          color: darkMode ? "#e5e7eb" : "#374151",
          font: {
            family: "Inter",
            size: 11,
          },
          callback: function (value: any) {
            return formatCurrency(value);
          },
        },
      },
      y: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          color: darkMode ? "#e5e7eb" : "#374151",
          font: {
            family: "Inter",
            size: 11,
          },
        },
      },
    },
  };

  // Radar chart options
  const radarOptions = {
    ...commonOptions,
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: {
          display: false,
          stepSize: 20,
        },
        grid: {
          color: darkMode
            ? "rgba(75, 85, 99, 0.2)"
            : "rgba(229, 231, 235, 0.8)",
        },
        angleLines: {
          color: darkMode
            ? "rgba(75, 85, 99, 0.2)"
            : "rgba(229, 231, 235, 0.8)",
        },
        suggestedMin: 0,
        suggestedMax: 100,
        pointLabels: {
          color: darkMode ? "#e5e7eb" : "#374151",
          font: {
            family: "Inter",
            size: 11,
            weight: 500,
          },
        },
      },
    },
  };

  // Scatter chart options
  const scatterOptions = {
    ...commonOptions,
    scales: {
      x: {
        title: {
          display: true,
          text: "Context Window (K tokens)",
          color: darkMode ? "#e5e7eb" : "#374151",
          font: {
            family: "Inter",
            size: 12,
            weight: 500,
          },
        },
        grid: {
          color: darkMode
            ? "rgba(75, 85, 99, 0.2)"
            : "rgba(229, 231, 235, 0.8)",
        },
        ticks: {
          color: darkMode ? "#e5e7eb" : "#374151",
          font: {
            family: "Inter",
            size: 11,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: `Total Cost (${params.currency})`,
          color: darkMode ? "#e5e7eb" : "#374151",
          font: {
            family: "Inter",
            size: 12,
            weight: 500,
          },
        },
        grid: {
          color: darkMode
            ? "rgba(75, 85, 99, 0.2)"
            : "rgba(229, 231, 235, 0.8)",
        },
        ticks: {
          color: darkMode ? "#e5e7eb" : "#374151",
          font: {
            family: "Inter",
            size: 11,
          },
          callback: function (value: any) {
            return formatCurrency(value);
          },
        },
      },
    },
  };

  // Calculate dynamic height based on chart type and data
  const getChartHeight = () => {
    if (params.chartType === "bar") {
      const barHeight = 40;
      const minHeight = 300;
      return Math.max(minHeight, visualizationModels.length * barHeight);
    }
    return 400; // Fixed height for radar and scatter
  };

  return (
    <div
      className={`transition-colors duration-200 ${
        darkMode ? "bg-gray-800" : "bg-white"
      } p-6 rounded-xl shadow-soft mb-8`}
    >
      <h2
        className={`text-lg font-semibold mb-4 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Cost Visualization
      </h2>

      {/* Chart Type Selector */}
      <div className="flex mb-6 bg-gray-900 rounded-lg p-1 w-fit">
        <button
          onClick={() => setActiveChart("bar")}
          className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeChart === "bar"
              ? "bg-purple-600 text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          Bar Chart
        </button>

        <button
          onClick={() => setActiveChart("radar")}
          className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeChart === "radar"
              ? "bg-purple-600 text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <RadarIcon className="h-4 w-4 mr-2" />
          Radar Chart
        </button>

        <button
          onClick={() => setActiveChart("scatter")}
          className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeChart === "scatter"
              ? "bg-purple-600 text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <ScatterChart className="h-4 w-4 mr-2" />
          Scatter Plot
        </button>
      </div>

      {/* Visualization Content */}
      <div
        style={{ height: `${getChartHeight()}px` }}
        className={`w-full rounded-lg p-4 ${
          darkMode ? "bg-gray-900/30" : "bg-gray-50"
        }`}
      >
        {models.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <BarChart3
              className={`w-12 h-12 mb-4 ${
                darkMode ? "text-gray-600" : "text-gray-400"
              }`}
            />
            <h3
              className={`text-lg font-medium mb-2 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              No Models Selected
            </h3>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-500"
              } max-w-md`}
            >
              Please select at least one model from the comparison table to view
              cost visualizations.
            </p>
          </div>
        ) : (
          <>
            {activeChart === "bar" && (
              <Bar data={barData} options={barOptions} />
            )}
            {activeChart === "radar" && (
              <Radar data={radarData} options={radarOptions} />
            )}
            {activeChart === "scatter" && (
              <Scatter data={scatterData} options={scatterOptions} />
            )}
          </>
        )}
      </div>

      {/* Show All Models Button */}
      <div className="mt-4 flex justify-end pb-2">
        <button
          onClick={() => setShowLimitedModels(!showLimitedModels)}
          className={`text-xs flex items-center px-3 py-1.5 rounded-md ${
            darkMode
              ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {showLimitedModels
            ? `Show All (${sortedModels.length})`
            : `Show Top ${MAX_MODELS_IN_CHART}`}
        </button>
      </div>
    </div>
  );
}

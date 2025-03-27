import { useState } from "react";
import { CalculationParams, Provider } from "../types";
import { getModelsByProvider } from "../data/modelPricing";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { calculateCosts } from "../utils/costCalculator";
import { CheckCircle2 } from "lucide-react";

interface ResultsTableProps {
  params: CalculationParams;
  selectedProviders: Provider[];
  darkMode: boolean;
  selectedModelIds: string[];
  onSelectedModelsChange: (modelIds: string[]) => void;
  isCalculated: boolean;
}

export default function ResultsTable({
  params,
  selectedProviders,
  darkMode,
  selectedModelIds,
  onSelectedModelsChange,
  isCalculated,
}: ResultsTableProps) {
  const [sortField, setSortField] = useState<
    "name" | "provider" | "inputCost" | "outputCost" | "totalCost"
  >("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [modelsPerPage, setModelsPerPage] = useState(5);

  // Get models for selected providers
  const models = selectedProviders.flatMap((provider) =>
    getModelsByProvider(provider)
  );

  // Calculate costs based on params
  const modelsWithCosts = models.map((model) => {
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
      costs: {
        input:
          params.currency === "USD"
            ? costs.costsUSD.input
            : costs.costsINR.input,
        output:
          params.currency === "USD"
            ? costs.costsUSD.output
            : costs.costsINR.output,
        total:
          params.currency === "USD"
            ? costs.costsUSD.total
            : costs.costsINR.total,
      },
    };
  });

  // Sort models
  const sortedModels = [...modelsWithCosts].sort((a, b) => {
    if (sortField === "name") {
      return sortDirection === "asc"
        ? a.model.name.localeCompare(b.model.name)
        : b.model.name.localeCompare(a.model.name);
    } else if (sortField === "provider") {
      return sortDirection === "asc"
        ? a.model.provider.localeCompare(b.model.provider)
        : b.model.provider.localeCompare(a.model.provider);
    } else {
      const aValue =
        sortField === "inputCost"
          ? a.costs.input
          : sortField === "outputCost"
          ? a.costs.output
          : a.costs.total;
      const bValue =
        sortField === "inputCost"
          ? b.costs.input
          : sortField === "outputCost"
          ? b.costs.output
          : b.costs.total;
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }
  });

  // Get current models for pagination
  const indexOfLastModel = currentPage * modelsPerPage;
  const indexOfFirstModel = indexOfLastModel - modelsPerPage;
  const currentModels = sortedModels.slice(indexOfFirstModel, indexOfLastModel);
  const totalPages = Math.ceil(sortedModels.length / modelsPerPage);

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleModelToggle = (modelId: string) => {
    if (selectedModelIds.includes(modelId)) {
      onSelectedModelsChange(selectedModelIds.filter((id) => id !== modelId));
    } else {
      onSelectedModelsChange([...selectedModelIds, modelId]);
    }
  };

  // Enhanced SortIcon component with always-visible arrows
  const SortIcon = ({ field }: { field: typeof sortField }) => {
    const isActive = sortField === field;

    return (
      <span className="inline-flex ml-1">
        {isActive && sortDirection === "asc" ? (
          <ChevronUpIcon className="w-4 h-4 text-purple-500" />
        ) : isActive && sortDirection === "desc" ? (
          <ChevronDownIcon className="w-4 h-4 text-purple-500" />
        ) : (
          <span className="flex flex-col">
            <ChevronUpIcon className="w-3 h-3 text-gray-400" />
            <ChevronDownIcon className="w-3 h-3 text-gray-400 -mt-1" />
          </span>
        )}
      </span>
    );
  };

  // Add pagination controls
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Add a "Select All" functionality
  const handleSelectAll = () => {
    onSelectedModelsChange(models.map((model) => model.id));
  };

  const handleDeselectAll = () => {
    onSelectedModelsChange([]);
  };

  return (
    <div
      className={`transition-colors duration-200 ${
        darkMode ? "bg-gray-800" : "bg-white"
      } p-6 rounded-xl shadow-soft`}
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2
            className={`text-lg font-semibold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Model Cost Comparison
          </h2>
          <p
            className={`text-sm mt-1 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Showing {currentModels.length} of {sortedModels.length} models
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleSelectAll}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg ${
              darkMode
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Select All
          </button>
          <button
            onClick={handleDeselectAll}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg ${
              darkMode
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Deselect All
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table
          className={`min-w-full divide-y ${
            darkMode ? "divide-gray-700" : "divide-gray-200"
          }`}
        >
          <thead className={darkMode ? "bg-gray-700/30" : "bg-gray-50"}>
            <tr>
              <th
                className={`px-6 py-3.5 text-left text-xs font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-500"
                } uppercase tracking-wider w-12`}
              >
                Show
              </th>
              <th
                onClick={() => handleSort("name")}
                className={`px-6 py-3.5 text-left text-xs font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-500"
                } uppercase tracking-wider cursor-pointer group`}
              >
                <span className="flex items-center">
                  Model <SortIcon field="name" />
                </span>
              </th>
              <th
                onClick={() => handleSort("provider")}
                className={`px-6 py-3.5 text-left text-xs font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-500"
                } uppercase tracking-wider cursor-pointer group`}
              >
                <span className="flex items-center">
                  Provider <SortIcon field="provider" />
                </span>
              </th>
              <th
                onClick={() => handleSort("inputCost")}
                className={`px-6 py-3.5 text-right text-xs font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-500"
                } uppercase tracking-wider cursor-pointer group`}
              >
                <span className="flex items-center justify-end">
                  Input Cost <SortIcon field="inputCost" />
                </span>
              </th>
              <th
                onClick={() => handleSort("outputCost")}
                className={`px-6 py-3.5 text-right text-xs font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-500"
                } uppercase tracking-wider cursor-pointer group`}
              >
                <span className="flex items-center justify-end">
                  Output Cost <SortIcon field="outputCost" />
                </span>
              </th>
              <th
                onClick={() => handleSort("totalCost")}
                className={`px-6 py-3.5 text-right text-xs font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-500"
                } uppercase tracking-wider cursor-pointer group`}
              >
                <span className="flex items-center justify-end">
                  Total Cost <SortIcon field="totalCost" />
                </span>
              </th>
            </tr>
          </thead>
          <tbody
            className={`divide-y ${
              darkMode ? "divide-gray-700" : "divide-gray-200"
            }`}
          >
            {currentModels.map(({ model, costs }) => (
              <tr
                key={model.id}
                className={`${
                  darkMode ? "hover:bg-gray-700/50" : "hover:bg-gray-50"
                } transition-colors`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center justify-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={selectedModelIds.includes(model.id)}
                        onChange={() => handleModelToggle(model.id)}
                      />
                      <div
                        className={`w-5 h-5 rounded border ${
                          selectedModelIds.includes(model.id)
                            ? "bg-[#8B5CF6] border-[#8B5CF6]"
                            : darkMode
                            ? "border-gray-600 bg-gray-700"
                            : "border-gray-300 bg-white"
                        } flex items-center justify-center transition-colors`}
                      >
                        {selectedModelIds.includes(model.id) && (
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        )}
                      </div>
                    </label>
                  </div>
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap font-medium ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {model.name}
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm ${
                    darkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      model.provider === "OpenAI"
                        ? darkMode
                          ? "bg-emerald-900/30 text-emerald-400"
                          : "bg-emerald-50 text-emerald-700"
                        : model.provider === "Anthropic"
                        ? darkMode
                          ? "bg-purple-900/30 text-purple-400"
                          : "bg-purple-50 text-purple-700"
                        : darkMode
                        ? "bg-blue-900/30 text-blue-400"
                        : "bg-blue-50 text-blue-700"
                    }`}
                  >
                    {model.provider}
                  </span>
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm text-right ${
                    darkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  {params.currency === "USD" ? "$" : "₹"}
                  {costs.input.toFixed(4)}
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm text-right ${
                    darkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  {params.currency === "USD" ? "$" : "₹"}
                  {costs.output.toFixed(4)}
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm text-right`}
                >
                  <div>
                    <div
                      className={`font-semibold ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {params.currency === "USD" ? "$" : "₹"}
                      {costs.total.toFixed(4)}
                    </div>
                    <div
                      className={`text-xs mt-0.5 ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Per{" "}
                      {params.timeframe === "monthly"
                        ? "month"
                        : params.timeframe === "yearly"
                        ? "year"
                        : params.timeframe === "weekly"
                        ? "week"
                        : "day"}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div
          className={`flex justify-between items-center mt-4 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          <div className="flex items-center space-x-2">
            <select
              value={modelsPerPage}
              onChange={(e) => {
                setModelsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className={`text-sm rounded-md ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-700"
              } px-2 py-1 border`}
            >
              {[5, 10, 15, 20, 25].map((value) => (
                <option key={value} value={value}>
                  {value} per page
                </option>
              ))}
            </select>
            <span className="text-sm">
              Showing {indexOfFirstModel + 1}-
              {Math.min(indexOfLastModel, sortedModels.length)} of{" "}
              {sortedModels.length}
            </span>
          </div>

          <div className="flex space-x-1">
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className={`px-2 py-1 rounded-md text-sm ${
                currentPage === 1
                  ? darkMode
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : darkMode
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              First
            </button>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-2 py-1 rounded-md text-sm ${
                currentPage === 1
                  ? darkMode
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : darkMode
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Prev
            </button>

            {/* Page numbers */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Show pages around current page
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-8 h-8 flex items-center justify-center rounded-md text-sm ${
                    currentPage === pageNum
                      ? darkMode
                        ? "bg-[#8B5CF6] text-white"
                        : "bg-[#8B5CF6] text-white"
                      : darkMode
                      ? "bg-gray-700 text-white hover:bg-gray-600"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-2 py-1 rounded-md text-sm ${
                currentPage === totalPages
                  ? darkMode
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : darkMode
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Next
            </button>
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className={`px-2 py-1 rounded-md text-sm ${
                currentPage === totalPages
                  ? darkMode
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : darkMode
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Last
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

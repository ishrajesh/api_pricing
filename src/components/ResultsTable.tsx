import { useState, useEffect } from "react";
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
  const [searchQuery, setSearchQuery] = useState("");
<<<<<<< HEAD
  const [displayModels, setDisplayModels] = useState<typeof modelsWithCosts>(
    []
  );
  const [lastNavigationPage, setLastNavigationPage] = useState(1);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [hasPendingReorganization, setHasPendingReorganization] =
    useState(false);
  const [isReorganizing, setIsReorganizing] = useState(false);
=======
>>>>>>> 80200bc (Final Commit)

  // Get models for selected providers
  const models = selectedProviders.flatMap((provider) =>
    getModelsByProvider(provider)
  );

  // Filter models based on search query
  const filteredModels = models.filter(
    (model) =>
      model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.provider.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate costs based on params
  const modelsWithCosts = filteredModels.map((model) => {
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

  // Enhanced initialization effect to handle tab navigation
  useEffect(() => {
    const initializeDisplayModels = () => {
      if (selectedModelIds.length > 0 && !isReorganizing) {
        const sortedModels = getSortedModels(modelsWithCosts);
        setDisplayModels(sortedModels);
        setCurrentPage(1);
        setHasPendingReorganization(false);
      } else {
        setDisplayModels(modelsWithCosts);
      }
      setHasInitialized(true);
    };

    if (!hasInitialized || displayModels.length === 0) {
      initializeDisplayModels();
    } else {
      const updatedModels = displayModels.map((item) => {
        const updated = modelsWithCosts.find(
          (m) => m.model.id === item.model.id
        );
        return updated || item;
      });

      // Only check for reorganization if we're not actively reorganizing
      if (!isReorganizing) {
        const selectedModelsVisible = selectedModelIds.every((id) =>
          updatedModels
            .slice(0, selectedModelIds.length)
            .some((m) => m.model.id === id)
        );

        if (!selectedModelsVisible && selectedModelIds.length > 0) {
          setHasPendingReorganization(true);
        }
      }
      setDisplayModels(updatedModels);
    }
  }, [modelsWithCosts, selectedModelIds, isCalculated]);

  // Reset initialization flag when key dependencies change
  useEffect(() => {
    setHasInitialized(false);
  }, [selectedProviders, params]);

  // Enhanced sorting function with stable sort for selections
  const getSortedModels = (models: typeof modelsWithCosts) => {
    return [...models].sort((a, b) => {
      const aSelected = selectedModelIds.includes(a.model.id);
      const bSelected = selectedModelIds.includes(b.model.id);

      if (aSelected !== bSelected) {
        return bSelected ? 1 : -1;
      }

      // For selected items, maintain their relative order in selectedModelIds
      if (aSelected && bSelected) {
        const aIndex = selectedModelIds.indexOf(a.model.id);
        const bIndex = selectedModelIds.indexOf(b.model.id);
        return aIndex - bIndex;
      }

      // Regular sorting logic for unselected items
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
  };

  // Get current models for pagination
  const getCurrentModels = () => {
    const indexOfLastModel = currentPage * modelsPerPage;
    const indexOfFirstModel = indexOfLastModel - modelsPerPage;

    // Use displayModels for the current page
    return displayModels.slice(indexOfFirstModel, indexOfLastModel);
  };

  const currentModels = getCurrentModels();
  const totalPages = Math.ceil(displayModels.length / modelsPerPage);
  const selectedCount = selectedModelIds.length;

  // Handle page navigation with reorganization
  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setIsReorganizing(true);
      const sortedModels = getSortedModels(displayModels);
      setDisplayModels(sortedModels);
      setCurrentPage(page);
      setLastNavigationPage(page);
      setHasPendingReorganization(false);
      setIsReorganizing(false);
    }
  };

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
    // Apply sorting immediately when user explicitly sorts
    setDisplayModels((prev) => getSortedModels(prev));
  };

  // Enhanced model toggle without automatic navigation
  const handleModelToggle = (modelId: string) => {
    if (selectedModelIds.includes(modelId)) {
      onSelectedModelsChange(selectedModelIds.filter((id) => id !== modelId));
    } else {
      onSelectedModelsChange([...selectedModelIds, modelId]);
      setHasPendingReorganization(true);
    }
  };

  // Enhanced bulk actions
  const handleSelectAll = () => {
    const newSelectedIds = models.map((model) => model.id);
    onSelectedModelsChange(newSelectedIds);
    setIsReorganizing(true);
    setDisplayModels(getSortedModels(modelsWithCosts));
    setCurrentPage(1);
    setHasPendingReorganization(false);
    setIsReorganizing(false);
  };

  const handleDeselectAll = () => {
    onSelectedModelsChange([]);
    setIsReorganizing(true);
    setDisplayModels(modelsWithCosts);
    setCurrentPage(1);
    setHasPendingReorganization(false);
    setIsReorganizing(false);
  };

  // Enhanced search with reorganization handling
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsReorganizing(true);
    const filtered = modelsWithCosts.filter(
      ({ model }) =>
        model.name.toLowerCase().includes(query.toLowerCase()) ||
        model.provider.toLowerCase().includes(query.toLowerCase())
    );
    setDisplayModels(getSortedModels(filtered));
    setCurrentPage(1);
    setHasPendingReorganization(false);
    setIsReorganizing(false);
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

  return (
    <div
      className={`transition-colors duration-200 ${
        darkMode ? "bg-gray-800/50 backdrop-blur-sm" : "bg-white"
      } rounded-xl border ${
        darkMode ? "border-gray-700/50" : "border-gray-200"
      } shadow-lg overflow-hidden`}
    >
<<<<<<< HEAD
      {/* Table Header */}
      <div className="p-6 border-b border-gray-700/50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2
              className={`text-xl font-semibold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Model Cost Comparison
            </h2>
            <div className="flex items-center gap-2 mt-1">
              {selectedCount > 0 && (
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium ${
                    darkMode
                      ? "bg-purple-900/30 text-purple-400 border border-purple-500/30"
                      : "bg-purple-50 text-purple-700"
                  }`}
                >
                  {selectedCount} selected
                </span>
              )}
              {hasPendingReorganization && (
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs ${
                    darkMode
                      ? "bg-gray-800 text-gray-300 border border-gray-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  Selected models will be grouped on page 1 when you navigate
                </span>
              )}
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Showing {currentModels.length} of {displayModels.length} models
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 sm:flex-none">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search models..."
                className={`w-full sm:w-64 px-4 py-2 pr-8 text-sm rounded-lg transition-colors ${
                  darkMode
                    ? "bg-gray-900/50 text-white placeholder-gray-400 border-gray-600 focus:border-purple-500"
                    : "bg-white text-gray-900 placeholder-gray-500 border-gray-300 focus:border-purple-500"
                } border focus:outline-none focus:ring-1 focus:ring-purple-500`}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className={`w-4 h-4 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            <button
              onClick={handleSelectAll}
              className={`px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
                darkMode
                  ? "bg-gray-900/50 text-gray-300 hover:bg-gray-700/50 hover:text-white"
=======
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
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by model or provider..."
              className={`w-64 px-4 py-1.5 pr-8 text-sm rounded-lg transition-colors ${
                darkMode
                  ? "bg-gray-700 text-white placeholder-gray-400 border-gray-600 focus:border-purple-500"
                  : "bg-white text-gray-900 placeholder-gray-500 border-gray-300 focus:border-purple-500"
              } border focus:outline-none focus:ring-1 focus:ring-purple-500`}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className={`w-4 h-4 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          {/* Select/Deselect Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={handleSelectAll}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg ${
                darkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
>>>>>>> 80200bc (Final Commit)
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Select All
            </button>
            <button
              onClick={handleDeselectAll}
<<<<<<< HEAD
              className={`px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
                darkMode
                  ? "bg-gray-900/50 text-gray-300 hover:bg-gray-700/50 hover:text-white"
=======
              className={`px-3 py-1.5 text-xs font-medium rounded-lg ${
                darkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
>>>>>>> 80200bc (Final Commit)
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Deselect All
            </button>
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700/50">
          <thead className={darkMode ? "bg-gray-900/30" : "bg-gray-50"}>
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
          <tbody className="divide-y divide-gray-700/50">
            {currentModels.map(({ model, costs }) => {
              const isSelected = selectedModelIds.includes(model.id);
              return (
                <tr
                  key={model.id}
                  onClick={() => handleModelToggle(model.id)}
                  className={`${
                    isSelected
                      ? darkMode
                        ? "bg-purple-900/10 hover:bg-purple-900/20"
                        : "bg-purple-50 hover:bg-purple-100"
                      : darkMode
                      ? "hover:bg-gray-700/50"
                      : "hover:bg-gray-50"
                  } transition-colors cursor-pointer select-none`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center">
                      <div
                        className={`w-5 h-5 rounded border ${
                          isSelected
                            ? "bg-[#8B5CF6] border-[#8B5CF6]"
                            : darkMode
                            ? "border-gray-600 bg-gray-700"
                            : "border-gray-300 bg-white"
                        } flex items-center justify-center transition-colors`}
                      >
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        )}
                      </div>
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
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table Footer with Pagination */}
      <div className="px-6 py-4 border-t border-gray-700/50 bg-gray-900/20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
          <div className="flex items-center space-x-4">
            <select
              value={modelsPerPage}
              onChange={(e) => {
                setModelsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className={`text-sm rounded-lg ${
                darkMode
                  ? "bg-gray-900/50 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-700"
              } px-3 py-2 border focus:outline-none focus:ring-1 focus:ring-purple-500`}
            >
              {[5, 10, 15, 20, 25].map((value) => (
                <option key={value} value={value}>
                  {value} per page
                </option>
              ))}
            </select>
            <span
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Showing {currentPage * modelsPerPage - modelsPerPage + 1}-
              {Math.min(currentPage * modelsPerPage, displayModels.length)} of{" "}
              {displayModels.length}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1">
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                currentPage === 1
                  ? darkMode
                    ? "bg-gray-900/30 text-gray-500 cursor-not-allowed"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : darkMode
                  ? "bg-gray-900/50 text-white hover:bg-gray-700/50"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              First
            </button>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                currentPage === 1
                  ? darkMode
                    ? "bg-gray-900/30 text-gray-500 cursor-not-allowed"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : darkMode
                  ? "bg-gray-900/50 text-white hover:bg-gray-700/50"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Prev
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
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
                    className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 ${
                      currentPage === pageNum
                        ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20"
                        : darkMode
                        ? "bg-gray-900/50 text-white hover:bg-gray-700/50"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                currentPage === totalPages
                  ? darkMode
                    ? "bg-gray-900/30 text-gray-500 cursor-not-allowed"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : darkMode
                  ? "bg-gray-900/50 text-white hover:bg-gray-700/50"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Next
            </button>
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                currentPage === totalPages
                  ? darkMode
                    ? "bg-gray-900/30 text-gray-500 cursor-not-allowed"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : darkMode
                  ? "bg-gray-900/50 text-white hover:bg-gray-700/50"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Last
            </button>
          </div>
        </div>
      </div>
      <div className="h-6 bg-gradient-to-b from-gray-900/20 to-transparent"></div>
    </div>
  );
}

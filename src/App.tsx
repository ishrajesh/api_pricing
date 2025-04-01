import { useState, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import CalculatorForm from "./components/CalculatorForm";
import WizardCalculator from "./components/WizardCalculator";
import ResultsTable from "./components/ResultsTable";
import CostVisualization from "./components/CostVisualization";
import ModelFeatureMatrix from "./components/ModelFeatureMatrix";
import CostBreakdown from "./components/CostBreakdown";
import TabNavigation from "./components/TabNavigation";
import { CalculationParams, Provider, ThemeConfig } from "./types";
import { getAllModels } from "./data/modelPricing";
import CombinedFeatureSection from "./components/CombinedFeatureSection";

const Documentation = lazy(() => import("./components/Documentation"));
const FAQ = lazy(() => import("./components/FAQ"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="animate-pulse text-white">Loading...</div>
  </div>
);

function Calculator() {
  const [params, setParams] = useState<CalculationParams>({
    inputSize: 1000,
    outputSize: 500,
    requests: 1000,
    useTokens: true,
    currency: "USD",
    chartType: "bar",
    timeframe: "monthly",
  });

  const [selectedProviders, setSelectedProviders] = useState<Provider[]>([
    "OpenAI",
    "Anthropic",
    "Groq",
  ]);
  const [theme, setTheme] = useState<ThemeConfig>({ darkMode: true });
  const [isCalculated, setIsCalculated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Initialize with all model IDs to show all models by default
  const [selectedModelIds, setSelectedModelIds] = useState<string[]>(
    getAllModels().map((model) => model.id)
  );

  // Navigation state
  const [activeSection, setActiveSection] = useState("calculator");
  const [activeTab, setActiveTab] = useState(0);

  const handleCalculate = () => {
    setIsCalculated(true);
    setActiveSection("results");
  };

  const handleThemeToggle = () => {
    setTheme({ darkMode: !theme.darkMode });
  };

  const renderContent = () => {
    switch (activeSection) {
      case "calculator":
        return (
          <motion.div
            key="calculator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="min-h-[calc(100vh-180px)] flex flex-col">
              <div className="text-center mb-12 pt-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  LLM API Pricing Calculator
                </h1>
                <p className="text-sm md:text-base text-gray-400 max-w-3xl mx-auto leading-relaxed">
                  Calculate and compare the cost of using OpenAI, Anthropic,
                  Groq, and other LLM APIs for your AI project with our simple
                  and powerful calculator.{" "}
                  <span className="text-purple-400">
                    Latest numbers as of March 2024.
                  </span>
                </p>
              </div>
              <div className="max-w-4xl mx-auto w-full">
                <CalculatorForm
                  params={params}
                  onParamsChange={setParams}
                  selectedProviders={selectedProviders}
                  onProvidersChange={setSelectedProviders}
                  darkMode={theme.darkMode}
                  onSubmit={handleCalculate}
                />
              </div>
            </div>
          </motion.div>
        );
      case "results":
        const resultsTabs = [
          "Comparison Table",
          "Cost Visualization",
          "Features & Capabilities",
        ];
        return (
          <div className="space-y-4 mt-5">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                Results & Analysis
              </h1>
              <p
                className={`text-sm ${
                  theme.darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Compare costs and features across different AI models
              </p>
            </div>
            <TabNavigation
              tabs={resultsTabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              darkMode={theme.darkMode}
            />
            {activeTab === 0 && (
              <ResultsTable
                params={params}
                selectedProviders={selectedProviders}
                darkMode={theme.darkMode}
                selectedModelIds={selectedModelIds}
                onSelectedModelsChange={setSelectedModelIds}
                isCalculated={isCalculated}
              />
            )}
            {activeTab === 1 && (
              <CostVisualization
                params={params}
                onParamsChange={setParams}
                selectedProviders={selectedProviders}
                darkMode={theme.darkMode}
                selectedModelIds={selectedModelIds}
                isCalculated={isCalculated}
              />
            )}
            {activeTab === 2 && (
              <CombinedFeatureSection
                models={getAllModels().filter((model) =>
                  selectedModelIds.includes(model.id)
                )}
                darkMode={theme.darkMode}
                params={params}
                selectedProviders={selectedProviders}
                selectedModelIds={selectedModelIds}
                isCalculated={isCalculated}
              />
            )}
          </div>
        );
      case "models":
        return (
          <motion.div
            key="models"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="space-y-4 mt-5">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                  Model Comparison
                </h1>
                <p
                  className={`text-sm ${
                    theme.darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Compare features and capabilities across different AI models
                </p>
              </div>
              <div className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {getAllModels()
                    .filter((model) =>
                      selectedProviders.includes(model.provider)
                    )
                    .map((model) => (
                      <div
                        key={model.id}
                        className={`relative overflow-hidden p-6 rounded-xl ${
                          theme.darkMode
                            ? "bg-[#1E1B2E]/80 backdrop-blur-sm border border-purple-500/10 hover:border-purple-500/30"
                            : "bg-white hover:bg-gray-50"
                        } shadow-lg hover:shadow-xl transition-all duration-300`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none" />
                        <h3
                          className={`relative text-xl font-semibold mb-3 ${
                            theme.darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {model.name}
                        </h3>
                        <p
                          className={`relative text-sm mb-4 ${
                            theme.darkMode
                              ? "text-purple-300"
                              : "text-purple-600"
                          } font-medium`}
                        >
                          {model.provider}
                        </p>
                        <p
                          className={`relative text-sm mb-4 ${
                            theme.darkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {model.description}
                        </p>
                        <div className="relative flex flex-wrap gap-2 mt-4">
                          {model.features.map((feature) => (
                            <span
                              key={feature}
                              className={`text-xs px-3 py-1 rounded-full ${
                                theme.darkMode
                                  ? "bg-purple-500/10 text-purple-300 border border-purple-500/20"
                                  : "bg-purple-50 text-purple-700 border border-purple-200"
                              }`}
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </motion.div>
        );
      case "docs":
        return (
          <Suspense fallback={<LoadingFallback />}>
            <Documentation darkMode={theme.darkMode} />
          </Suspense>
        );
      case "faq":
        return (
          <Suspense fallback={<LoadingFallback />}>
            <FAQ darkMode={theme.darkMode} />
          </Suspense>
        );
      case "settings":
        return (
          <>
            <h1 className="text-3xl font-bold mb-6 text-white">Settings</h1>
            <div
              className={`p-6 rounded-xl ${
                theme.darkMode ? "bg-[#1E1B2E]" : "bg-white"
              } shadow-md`}
            >
              <h2
                className={`text-xl font-semibold mb-4 ${
                  theme.darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Appearance
              </h2>
              <div className="flex items-center space-x-4 mb-6">
                <span
                  className={`text-sm ${
                    theme.darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Theme
                </span>
                <button
                  onClick={handleThemeToggle}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    theme.darkMode
                      ? "bg-[#8B5CF6] text-white"
                      : "bg-[#1E1B2E] text-gray-400 hover:text-white"
                  }`}
                >
                  {theme.darkMode ? "Dark Mode" : "Light Mode"}
                </button>
              </div>

              <h2
                className={`text-xl font-semibold mb-4 ${
                  theme.darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Calculation Preferences
              </h2>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-4">
                  <span
                    className={`text-sm ${
                      theme.darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Currency
                  </span>
                  <button
                    onClick={() => setParams({ ...params, currency: "USD" })}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      params.currency === "USD"
                        ? "bg-[#8B5CF6] text-white"
                        : "bg-[#1E1B2E] text-gray-400 hover:text-white"
                    }`}
                  >
                    USD
                  </button>
                  <button
                    onClick={() => setParams({ ...params, currency: "INR" })}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      params.currency === "INR"
                        ? "bg-[#8B5CF6] text-white"
                        : "bg-[#1E1B2E] text-gray-400 hover:text-white"
                    }`}
                  >
                    INR
                  </button>
                </div>

                <div className="flex items-center space-x-4">
                  <span
                    className={`text-sm ${
                      theme.darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Time Frame
                  </span>
                  {(["daily", "weekly", "monthly", "yearly"] as const).map(
                    (timeframe) => (
                      <button
                        key={timeframe}
                        onClick={() => setParams({ ...params, timeframe })}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          params.timeframe === timeframe
                            ? "bg-[#8B5CF6] text-white"
                            : "bg-[#1E1B2E] text-gray-400 hover:text-white"
                        }`}
                      >
                        {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </>
        );
      default:
        return <div>Select a section from the sidebar</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#13111C] to-[#1A1825] flex flex-col relative">
      {/* Background overlay to ensure consistent color */}
      <div className="absolute inset-0 bg-[#1A1825]/50 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Header */}
        <Header
          darkMode={theme.darkMode}
          currentSection={activeSection}
          onQuickCalculate={handleCalculate}
          onSectionChange={setActiveSection}
        />

        {/* Main Content Area */}
        <div className="flex-1 pt-[calc(64px+48px)] pb-16">
          <main className="px-6 sm:px-8 md:px-12 lg:px-16">
            <div className="max-w-[1920px] mx-auto">
              <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Calculator />} />
          <Route path="/docs" element={<Calculator />} />
          <Route path="*" element={<Calculator />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

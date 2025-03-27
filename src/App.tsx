import { useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import CalculatorForm from "./components/CalculatorForm";
import ResultsTable from "./components/ResultsTable";
import CostVisualization from "./components/CostVisualization";
import ModelFeatureMatrix from "./components/ModelFeatureMatrix";
import CostBreakdown from "./components/CostBreakdown";
import { CalculationParams, Provider, ThemeConfig } from "./types";
import { getAllModels } from "./data/modelPricing";
import CombinedFeatureSection from "./components/CombinedFeatureSection";

const Documentation = lazy(() => import("./components/Documentation"));
const FAQ = lazy(() => import("./components/FAQ"));

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

  // Initialize with all model IDs to show all models by default
  const [selectedModelIds, setSelectedModelIds] = useState<string[]>(
    getAllModels().map((model) => model.id)
  );

  const handleCalculate = () => {
    setIsCalculated(true);
  };

  return (
    <div className="min-h-screen bg-[#13111C]">
      {/* Navigation Bar */}
      <nav className="border-b border-[#2D2B3B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-white">
                ModelMetrics
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <Link
                to="/docs"
                className="text-gray-300 hover:text-white text-sm"
              >
                Documentation
              </Link>
              <Link
                to="/blog"
                className="text-gray-300 hover:text-white text-sm"
              >
                Blog
              </Link>
              <Link
                to="/about"
                className="text-gray-300 hover:text-white text-sm"
              >
                About
              </Link>
              <button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Try Free
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6 text-white">
            LLM API Pricing Calculator
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Calculate and compare the cost of using OpenAI, Anthropic, Groq, and
            other LLM APIs for your AI project with our simple and powerful
            calculator. Latest numbers as of March 2024.
          </p>
        </div>

        {/* Calculator Section */}
        <div className="grid grid-cols-1 gap-8">
          {/* Input Form */}
          <CalculatorForm
            params={params}
            onParamsChange={setParams}
            selectedProviders={selectedProviders}
            onProvidersChange={setSelectedProviders}
            darkMode={theme.darkMode}
            onSubmit={handleCalculate}
          />

          {/* Results */}
          <div className="space-y-8 mt-12">
            <ResultsTable
              params={params}
              selectedProviders={selectedProviders}
              darkMode={theme.darkMode}
              selectedModelIds={selectedModelIds}
              onSelectedModelsChange={setSelectedModelIds}
              isCalculated={isCalculated}
            />

            <CostVisualization
              params={params}
              onParamsChange={setParams}
              selectedProviders={selectedProviders}
              darkMode={theme.darkMode}
              selectedModelIds={selectedModelIds}
              isCalculated={isCalculated}
            />

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
          </div>
        </div>

        {/* FAQ Section */}
        <FAQ darkMode={theme.darkMode} />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Calculator />} />
          <Route path="/docs" element={<Documentation />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

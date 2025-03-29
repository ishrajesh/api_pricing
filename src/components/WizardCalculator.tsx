import { useState } from "react";
import { motion } from "framer-motion";
import { CalculationParams, Provider } from "../types";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

interface WizardCalculatorProps {
  params: CalculationParams;
  onParamsChange: (params: CalculationParams) => void;
  selectedProviders: Provider[];
  onProvidersChange: (providers: Provider[]) => void;
  darkMode: boolean;
  onSubmit: () => void;
}

export default function WizardCalculator({
  params,
  onParamsChange,
  selectedProviders,
  onProvidersChange,
  darkMode,
  onSubmit,
}: WizardCalculatorProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { id: "providers", title: "Select Providers" },
    { id: "input-output", title: "Configure Input/Output" },
    { id: "options", title: "Set Options" },
    { id: "calculate", title: "Calculate" },
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-between mb-8 px-2">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <button
              onClick={() => setCurrentStep(index)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                index < currentStep
                  ? darkMode
                    ? "bg-green-500 text-white"
                    : "bg-green-600 text-white"
                  : index === currentStep
                  ? darkMode
                    ? "bg-[#8B5CF6] text-white"
                    : "bg-[#8B5CF6] text-white"
                  : darkMode
                  ? "bg-gray-700 text-gray-400"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {index < currentStep ? <Check size={16} /> : index + 1}
            </button>

            <span
              className={`ml-2 text-sm font-medium ${
                index === currentStep
                  ? darkMode
                    ? "text-white"
                    : "text-gray-900"
                  : darkMode
                  ? "text-gray-400"
                  : "text-gray-500"
              }`}
            >
              {step.title}
            </span>

            {index < steps.length - 1 && (
              <div
                className={`w-12 h-0.5 mx-2 ${
                  index < currentStep
                    ? darkMode
                      ? "bg-green-500"
                      : "bg-green-600"
                    : darkMode
                    ? "bg-gray-700"
                    : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderProviderSelection = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`p-6 rounded-xl ${
          darkMode ? "bg-[#1E1B2E]" : "bg-white"
        } shadow-md`}
      >
        <h2
          className={`text-xl font-semibold mb-4 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Which AI providers would you like to compare?
        </h2>
        <p className={`mb-6 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          Select one or more providers to include in your price comparison.
        </p>

        <div className="grid grid-cols-3 gap-4">
          {["OpenAI", "Anthropic", "Groq"].map((provider) => (
            <button
              key={provider}
              onClick={() => {
                if (selectedProviders.includes(provider as Provider)) {
                  onProvidersChange(
                    selectedProviders.filter((p) => p !== provider)
                  );
                } else {
                  onProvidersChange([
                    ...selectedProviders,
                    provider as Provider,
                  ]);
                }
              }}
              className={`p-4 rounded-lg flex flex-col items-center justify-center transition-colors ${
                selectedProviders.includes(provider as Provider)
                  ? darkMode
                    ? "bg-[#8B5CF6]/20 border-2 border-[#8B5CF6] text-white"
                    : "bg-[#8B5CF6]/10 border-2 border-[#8B5CF6] text-[#8B5CF6]"
                  : darkMode
                  ? "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span className="text-lg font-medium">{provider}</span>
            </button>
          ))}
        </div>
      </motion.div>
    );
  };

  const renderInputOutput = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`p-8 rounded-2xl ${
          darkMode ? "bg-[#1E1B2E]" : "bg-white"
        } shadow-xl`}
      >
        <h2
          className={`text-2xl font-semibold mb-3 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Configure Input and Output Parameters
        </h2>
        <p className={`mb-8 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          Set the size of your prompt and expected response.
        </p>

        <div className="mb-8">
          <label className="block text-gray-400 text-sm font-medium mb-3">
            Calculate by
          </label>
          <div className="flex space-x-3">
            <button
              onClick={() => onParamsChange({ ...params, useTokens: true })}
              className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                params.useTokens
                  ? "bg-[#8B5CF6] text-white shadow-lg shadow-purple-500/25"
                  : darkMode
                  ? "bg-[#292538] text-gray-400 hover:bg-[#332E44] hover:text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Tokens
            </button>
            <button
              onClick={() => onParamsChange({ ...params, useTokens: false })}
              className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                !params.useTokens
                  ? "bg-[#8B5CF6] text-white shadow-lg shadow-purple-500/25"
                  : darkMode
                  ? "bg-[#292538] text-gray-400 hover:bg-[#332E44] hover:text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Words
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {params.useTokens ? "Input Tokens" : "Input Words"}
            </label>
            <div className="relative">
              <input
                type="number"
                value={params.inputSize}
                onChange={(e) =>
                  onParamsChange({
                    ...params,
                    inputSize: parseInt(e.target.value) || 0,
                  })
                }
                className={`w-full px-4 py-3 rounded-xl text-lg transition-all duration-200 ${
                  darkMode
                    ? "bg-[#292538] text-white border-0 focus:ring-2 focus:ring-[#8B5CF6] focus:bg-[#332E44]"
                    : "bg-gray-100 text-gray-900 border-gray-300 focus:ring-[#8B5CF6]"
                }`}
                placeholder="1000"
              />
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <span
                  className={`text-sm ${
                    darkMode ? "text-gray-500" : "text-gray-600"
                  }`}
                >
                  tokens
                </span>
              </div>
            </div>
            <p
              className={`mt-2 text-xs ${
                darkMode ? "text-gray-500" : "text-gray-600"
              }`}
            >
              {params.useTokens
                ? "~4 characters per token"
                : "Will be converted to tokens for calculation"}
            </p>
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {params.useTokens ? "Output Tokens" : "Output Words"}
            </label>
            <div className="relative">
              <input
                type="number"
                value={params.outputSize}
                onChange={(e) =>
                  onParamsChange({
                    ...params,
                    outputSize: parseInt(e.target.value) || 0,
                  })
                }
                className={`w-full px-4 py-3 rounded-xl text-lg transition-all duration-200 ${
                  darkMode
                    ? "bg-[#292538] text-white border-0 focus:ring-2 focus:ring-[#8B5CF6] focus:bg-[#332E44]"
                    : "bg-gray-100 text-gray-900 border-gray-300 focus:ring-[#8B5CF6]"
                }`}
                placeholder="500"
              />
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <span
                  className={`text-sm ${
                    darkMode ? "text-gray-500" : "text-gray-600"
                  }`}
                >
                  tokens
                </span>
              </div>
            </div>
            <p
              className={`mt-2 text-xs ${
                darkMode ? "text-gray-500" : "text-gray-600"
              }`}
            >
              {params.useTokens
                ? "Typically costs more than input"
                : "Will be converted to tokens for calculation"}
            </p>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderOptions = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`p-6 rounded-xl ${
          darkMode ? "bg-[#1E1B2E]" : "bg-white"
        } shadow-md`}
      >
        <h2
          className={`text-xl font-semibold mb-4 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Set Additional Options
        </h2>
        <p className={`mb-6 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          Configure volume and display preferences.
        </p>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label
              className={`block text-sm mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              API Calls
            </label>
            <input
              type="number"
              value={params.requests}
              onChange={(e) =>
                onParamsChange({
                  ...params,
                  requests: parseInt(e.target.value) || 0,
                })
              }
              className={`w-full px-4 py-3 rounded-lg ${
                darkMode
                  ? "bg-[#292538] text-white border-0 focus:ring-2 focus:ring-[#8B5CF6]"
                  : "bg-gray-100 text-gray-900 border-gray-300 focus:ring-[#8B5CF6]"
              }`}
              placeholder="1000"
            />
            <p
              className={`mt-1 text-xs ${
                darkMode ? "text-gray-500" : "text-gray-600"
              }`}
            >
              Number of API requests you plan to make
            </p>
          </div>

          <div>
            <label
              className={`block text-sm mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Currency
            </label>
            <div className="flex space-x-2">
              <button
                onClick={() => onParamsChange({ ...params, currency: "USD" })}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
                  params.currency === "USD"
                    ? "bg-[#8B5CF6] text-white"
                    : darkMode
                    ? "bg-[#292538] text-gray-400 hover:text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                USD
              </button>
              <button
                onClick={() => onParamsChange({ ...params, currency: "INR" })}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
                  params.currency === "INR"
                    ? "bg-[#8B5CF6] text-white"
                    : darkMode
                    ? "bg-[#292538] text-gray-400 hover:text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                INR
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label
              className={`block text-sm mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Time Frame
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(["daily", "weekly", "monthly", "yearly"] as const).map(
                (timeframe) => (
                  <button
                    key={timeframe}
                    onClick={() => onParamsChange({ ...params, timeframe })}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      params.timeframe === timeframe
                        ? "bg-[#8B5CF6] text-white"
                        : darkMode
                        ? "bg-[#292538] text-gray-400 hover:text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
                  </button>
                )
              )}
            </div>
          </div>

          <div>
            <label
              className={`block text-sm mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Chart Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["bar", "radar", "scatter"] as const).map((chartType) => (
                <button
                  key={chartType}
                  onClick={() => onParamsChange({ ...params, chartType })}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    params.chartType === chartType
                      ? "bg-[#8B5CF6] text-white"
                      : darkMode
                      ? "bg-[#292538] text-gray-400 hover:text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {chartType.charAt(0).toUpperCase() + chartType.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderCalculate = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`p-6 rounded-xl ${
          darkMode ? "bg-[#1E1B2E]" : "bg-white"
        } shadow-md`}
      >
        <h2
          className={`text-xl font-semibold mb-4 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Review and Calculate
        </h2>
        <p className={`mb-6 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          Confirm your selections and click Calculate to see results.
        </p>

        <div
          className={`p-4 rounded-lg mb-6 ${
            darkMode ? "bg-[#292538]" : "bg-gray-100"
          }`}
        >
          <h3
            className={`text-lg font-medium mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Summary
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Providers
              </p>
              <p
                className={`font-medium ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {selectedProviders.join(", ")}
              </p>
            </div>

            <div>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Calculation Mode
              </p>
              <p
                className={`font-medium ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {params.useTokens ? "Tokens" : "Words"}
              </p>
            </div>

            <div>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {params.useTokens ? "Input Tokens" : "Input Words"}
              </p>
              <p
                className={`font-medium ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {params.inputSize.toLocaleString()}
              </p>
            </div>

            <div>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {params.useTokens ? "Output Tokens" : "Output Words"}
              </p>
              <p
                className={`font-medium ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {params.outputSize.toLocaleString()}
              </p>
            </div>

            <div>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                API Calls
              </p>
              <p
                className={`font-medium ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {params.requests.toLocaleString()}
              </p>
            </div>

            <div>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Time Frame
              </p>
              <p
                className={`font-medium ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {params.timeframe.charAt(0).toUpperCase() +
                  params.timeframe.slice(1)}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return renderProviderSelection();
      case 1:
        return renderInputOutput();
      case 2:
        return renderOptions();
      case 3:
        return renderCalculate();
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto pb-8">
      {renderStepIndicator()}
      {renderCurrentStep()}
      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          className={`flex items-center px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
            currentStep === 0
              ? "opacity-50 cursor-not-allowed"
              : darkMode
              ? "bg-gray-700 text-white hover:bg-gray-600"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
          disabled={currentStep === 0}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </button>

        <button
          onClick={nextStep}
          className={`flex items-center px-6 py-3 rounded-lg text-sm font-medium text-white shadow-sm transition-all ${
            darkMode
              ? "bg-[#8B5CF6] hover:bg-[#7C3AED]"
              : "bg-[#8B5CF6] hover:bg-[#7C3AED]"
          }`}
        >
          {currentStep === steps.length - 1 ? "Calculate" : "Next"}
          {currentStep < steps.length - 1 && (
            <ArrowRight className="h-4 w-4 ml-2" />
          )}
        </button>
      </div>
    </div>
  );
}

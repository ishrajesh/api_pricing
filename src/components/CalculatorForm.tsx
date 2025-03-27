import { motion } from "framer-motion";
import { CalculationParams, Provider } from "../types";
import { ArrowRight, Info } from "lucide-react";
import { useState } from "react";

interface CalculatorFormProps {
  params: CalculationParams;
  onParamsChange: (params: CalculationParams) => void;
  selectedProviders: Provider[];
  onProvidersChange: (providers: Provider[]) => void;
  darkMode: boolean;
  onSubmit?: () => void;
}

// Helper component for tooltips
function InfoTooltip({ text }: { text: string }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative inline-block ml-1">
      <button
        type="button"
        className="text-gray-400 hover:text-gray-300 focus:outline-none"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => setShowTooltip(!showTooltip)}
      >
        <Info className="h-4 w-4" />
      </button>

      {showTooltip && (
        <div className="absolute z-10 w-64 p-2 mt-2 text-sm text-white bg-gray-800 rounded-md shadow-lg -left-28 top-6">
          {text}
          <div className="absolute w-3 h-3 -mt-5 rotate-45 bg-gray-800 left-28"></div>
        </div>
      )}
    </div>
  );
}

export default function CalculatorForm({
  params,
  onParamsChange,
  selectedProviders,
  onProvidersChange,
  darkMode,
  onSubmit = () => {},
}: CalculatorFormProps) {
  return (
    <div className="space-y-8">
      {/* Calculate by Selection - Moved above input tokens */}
      <div>
        <label className="block text-gray-300 text-sm mb-3 flex items-center">
          Calculate by
          <InfoTooltip text="Choose between tokens (accurate for API pricing) or words (easier to estimate)." />
        </label>
        <div className="flex space-x-2">
          <button
            onClick={() => onParamsChange({ ...params, useTokens: true })}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
              params.useTokens
                ? "bg-[#8B5CF6] text-white"
                : "bg-[#1E1B2E] text-gray-400 hover:text-white"
            }`}
          >
            Tokens
          </button>
          <button
            onClick={() => onParamsChange({ ...params, useTokens: false })}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
              !params.useTokens
                ? "bg-[#8B5CF6] text-white"
                : "bg-[#1E1B2E] text-gray-400 hover:text-white"
            }`}
          >
            Words
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Input Tokens */}
        <div>
          <label className="block text-gray-300 text-sm mb-2 flex items-center">
            {params.useTokens ? "Input Tokens" : "Input Words"}
            <InfoTooltip
              text={
                params.useTokens
                  ? "Number of tokens in your prompt (~4 characters per token)."
                  : "Number of words in your prompt (converted to tokens for calculation)."
              }
            />
          </label>
          <input
            type="number"
            value={params.inputSize}
            onChange={(e) =>
              onParamsChange({
                ...params,
                inputSize: parseInt(e.target.value) || 0,
              })
            }
            className="w-full px-4 py-3 bg-[#1E1B2E] rounded-lg text-white border-0 focus:ring-2 focus:ring-[#8B5CF6]"
            placeholder="1000"
          />
        </div>

        {/* Output Tokens */}
        <div>
          <label className="block text-gray-300 text-sm mb-2 flex items-center">
            {params.useTokens ? "Output Tokens" : "Output Words"}
            <InfoTooltip
              text={
                params.useTokens
                  ? "Number of tokens in the model's response (typically costs more than input)."
                  : "Number of words in the model's response (converted to tokens for calculation)."
              }
            />
          </label>
          <input
            type="number"
            value={params.outputSize}
            onChange={(e) =>
              onParamsChange({
                ...params,
                outputSize: parseInt(e.target.value) || 0,
              })
            }
            className="w-full px-4 py-3 bg-[#1E1B2E] rounded-lg text-white border-0 focus:ring-2 focus:ring-[#8B5CF6]"
            placeholder="1000"
          />
        </div>

        {/* API Calls */}
        <div>
          <label className="block text-gray-300 text-sm mb-2 flex items-center">
            API Calls
            <InfoTooltip text="Number of API requests you plan to make (total cost = cost per request × this number)." />
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
            className="w-full px-4 py-3 bg-[#1E1B2E] rounded-lg text-white border-0 focus:ring-2 focus:ring-[#8B5CF6]"
            placeholder="1000"
          />
        </div>
      </div>

      {/* Combined Providers and Currency in one line, with Providers first */}
      <div className="flex flex-wrap gap-8">
        {/* Compare Providers - Now first */}
        <div className="flex-1">
          <label className="block text-gray-300 text-sm mb-3 flex items-center">
            Compare Providers
            <InfoTooltip text="Select which AI providers to compare costs between." />
          </label>
          <div className="flex flex-wrap gap-2">
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
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedProviders.includes(provider as Provider)
                    ? "bg-[#8B5CF6] text-white"
                    : "bg-[#1E1B2E] text-gray-400 hover:text-white"
                }`}
              >
                {provider}
              </button>
            ))}
          </div>
        </div>

        {/* Currency Selection - Now second */}
        <div className="flex-1">
          <label className="block text-gray-300 text-sm mb-3 flex items-center">
            Currency
            <InfoTooltip text="Select your preferred currency for cost calculations." />
          </label>
          <div className="flex space-x-2">
            <button
              onClick={() => onParamsChange({ ...params, currency: "USD" })}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                params.currency === "USD"
                  ? "bg-[#8B5CF6] text-white"
                  : "bg-[#1E1B2E] text-gray-400 hover:text-white"
              }`}
            >
              USD ($)
            </button>
            <button
              onClick={() => onParamsChange({ ...params, currency: "INR" })}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                params.currency === "INR"
                  ? "bg-[#8B5CF6] text-white"
                  : "bg-[#1E1B2E] text-gray-400 hover:text-white"
              }`}
            >
              INR (₹)
            </button>
          </div>
        </div>
      </div>

      {/* Submit Button - Left aligned */}
      <div className="flex justify-end mt-8">
        <button
          onClick={onSubmit}
          className="px-6 py-3 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          Calculate Costs
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

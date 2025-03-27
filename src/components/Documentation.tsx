import { motion } from "framer-motion";
import {
  ArrowLeft,
  FileText,
  Calculator,
  BookOpen,
  Code2,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  BarChart2,
  Database,
  Info,
  CheckSquare,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Documentation() {
  // Set the page title when the component mounts
  useEffect(() => {
    // Save the original title to restore it when component unmounts
    const originalTitle = document.title;
    document.title = "ModelMetrics - Documentation";

    // Cleanup function to restore the original title when component unmounts
    return () => {
      document.title = originalTitle;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gray-800/95 backdrop-blur-sm shadow-gray-900/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors group"
            >
              <ArrowLeft className="h-5 w-5 text-gray-400 group-hover:text-gray-300 transition-colors" />
              <Calculator className="h-5 w-5 text-primary" />
              <span className="font-medium">Back to Calculator</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="prose prose-invert max-w-none"
        >
          <div className="space-y-16">
            {/* Introduction */}
            <section className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gray-800/80 rounded-lg shadow-lg">
                  <FileText className="h-7 w-7 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-white inline-block m-0">
                  Introduction
                </h2>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 shadow-xl hover:shadow-purple-900/10 transition-all duration-300">
                <p className="text-gray-300 leading-relaxed text-lg">
                  The LLM API Cost Calculator provides a comprehensive solution
                  for estimating and comparing the costs of using various large
                  language model APIs. This documentation outlines the
                  calculation methodology, supported models, and usage
                  guidelines.
                </p>
              </div>
            </section>

            {/* Calculation Methodology */}
            <section className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gray-800/80 rounded-lg shadow-lg">
                  <BookOpen className="h-7 w-7 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-white inline-block m-0">
                  Calculation Methodology
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 shadow-xl hover:shadow-purple-900/10 transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-5">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                    <h4 className="font-semibold text-white text-xl inline-block m-0">
                      Token-Based Calculation
                    </h4>
                  </div>
                  <ul className="list-disc pl-5 space-y-3 text-gray-300">
                    <li>Direct calculation using exact token counts</li>
                    <li>Recommended for production environments</li>
                    <li>Highest accuracy for cost estimation</li>
                  </ul>
                </div>
                <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 shadow-xl hover:shadow-purple-900/10 transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-5">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                    <h4 className="font-semibold text-white text-xl inline-block m-0">
                      Word-Based Calculation
                    </h4>
                  </div>
                  <ul className="list-disc pl-5 space-y-3 text-gray-300">
                    <li>Approximation using word-to-token conversion</li>
                    <li>Suitable for quick estimates</li>
                    <li>Uses industry-standard 1.333 tokens per word ratio</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-8 mt-6 border border-gray-700 shadow-xl hover:shadow-purple-900/10 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-5">
                  <Zap className="h-6 w-6 text-primary" />
                  <h4 className="font-semibold text-white text-xl inline-block m-0">
                    Example Calculation
                  </h4>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h5 className="font-medium text-white mb-4 text-lg inline-block m-0">
                      Input Parameters:
                    </h5>
                    <ul className="list-disc pl-6 space-y-3 text-gray-300">
                      <li>Input Tokens: 100</li>
                      <li>Output Tokens: 500</li>
                      <li>Requests: 1,000</li>
                      <li>Input Rate: $10 per million tokens</li>
                      <li>Output Rate: $30 per million tokens</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-4 text-lg inline-block m-0">
                      Calculation:
                    </h5>
                    <div className="bg-gray-900/70 p-6 rounded-lg font-mono text-sm text-gray-300 shadow-inner">
                      <p className="mb-2">
                        Input Cost = (100 × 1,000 × $10) ÷ 1,000,000
                      </p>
                      <p className="mb-2">= $1.00</p>
                      <p className="mb-2">
                        Output Cost = (500 × 1,000 × $30) ÷ 1,000,000
                      </p>
                      <p className="mb-2">= $15.00</p>
                      <p className="font-medium text-primary text-lg">
                        Total Cost = $1.00 + $15.00 = $16.00
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Supported Models */}
            <section className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gray-800/80 rounded-lg shadow-lg">
                  <Cpu className="h-7 w-7 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-white inline-block m-0">
                  Supported Models
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 shadow-xl hover:shadow-purple-900/10 transition-all duration-300">
                  <h5 className="font-semibold text-white mb-5 text-xl inline-block m-0">
                    OpenAI Models
                  </h5>
                  <ul className="space-y-3">
                    {["GPT-4 Turbo", "GPT-3.5 Turbo"].map((model) => (
                      <li
                        key={model}
                        className="flex items-center space-x-3 text-gray-300"
                      >
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                        <span>{model}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 shadow-xl hover:shadow-purple-900/10 transition-all duration-300">
                  <h5 className="font-semibold text-white mb-5 text-xl inline-block m-0">
                    Anthropic Models
                  </h5>
                  <ul className="space-y-3">
                    {["Claude 3 Opus", "Claude 3 Sonnet", "Claude 3 Haiku"].map(
                      (model) => (
                        <li
                          key={model}
                          className="flex items-center space-x-3 text-gray-300"
                        >
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                          <span>{model}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 shadow-xl hover:shadow-purple-900/10 transition-all duration-300">
                  <h5 className="font-semibold text-white mb-5 text-xl inline-block m-0">
                    Groq Models
                  </h5>
                  <ul className="space-y-3">
                    {["Mixtral 8x7B", "Llama 3 70B", "Llama 3 8B"].map(
                      (model) => (
                        <li
                          key={model}
                          className="flex items-center space-x-3 text-gray-300"
                        >
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                          <span>{model}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </section>

            {/* Technical Notes */}
            <section className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gray-800/80 rounded-lg shadow-lg">
                  <Code2 className="h-7 w-7 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-white inline-block m-0">
                  Technical Notes
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 shadow-xl hover:shadow-purple-900/10 transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-5">
                    <Info className="h-6 w-6 text-primary" />
                    <h4 className="font-semibold text-white text-xl inline-block m-0">
                      API Integration
                    </h4>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    The calculator uses current pricing data from official API
                    documentation. Prices are updated regularly to reflect the
                    latest rates from each provider.
                  </p>
                </div>
                <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 shadow-xl hover:shadow-purple-900/10 transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-5">
                    <AlertTriangle className="h-6 w-6 text-primary" />
                    <h4 className="font-semibold text-white text-xl inline-block m-0">
                      Limitations
                    </h4>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    The calculator provides estimates based on average token
                    counts. Actual costs may vary depending on specific usage
                    patterns and potential volume discounts.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </motion.article>
      </main>
    </div>
  );
}

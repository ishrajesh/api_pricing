import { motion } from "framer-motion";
import {
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
  ArrowRight,
  Clock,
  DollarSign,
  Settings,
  Shield,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
import { useEffect } from "react";

export default function Documentation() {
  // Set the page title when the component mounts
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "LLM API Pricing Calculator - Documentation";
    return () => {
      document.title = originalTitle;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <main className="relative max-w-6xl mx-auto px-3 py-4 sm:px-4">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="prose prose-invert max-w-none"
        >
          {/* Document Header */}
          <div className="text-center mb-6 pt-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-4xl font-bold text-white mb-3 tracking-tight"
            >
              LLM API Pricing Calculator
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-lg text-gray-400 max-w-3xl mx-auto mb-3"
            >
              Comprehensive documentation and user guide for estimating and
              comparing costs across different Large Language Model APIs
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex justify-center items-center space-x-3 text-gray-400"
            >
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-purple-400" />
                <span className="text-base">
                  Last updated: {new Date().toLocaleDateString()}
                </span>
              </div>
              <div className="w-1 h-1 bg-gray-700 rounded-full" />
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2 text-purple-400" />
                <span className="text-base">Version 1.0.0</span>
              </div>
            </motion.div>
          </div>

          {/* Table of Contents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mb-6 p-4 bg-gray-800/40 rounded-lg border border-gray-700/50 backdrop-blur-sm"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-600/25 rounded-lg flex items-center justify-center mr-3">
                <FileText className="w-6 h-6 text-purple-500" />
              </div>
              <div className="flex items-center">
                <h2 className="text-2xl font-semibold text-white">
                  Table of Contents
                </h2>
              </div>
            </div>
            <nav className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { id: "introduction", title: "Introduction", icon: Info },
                { id: "quick-start", title: "Quick Start Guide", icon: Zap },
                {
                  id: "methodology",
                  title: "Calculation Methodology",
                  icon: Calculator,
                },
                { id: "models", title: "Supported Models", icon: Cpu },
                {
                  id: "features",
                  title: "Features & Capabilities",
                  icon: Settings,
                },
                { id: "technical", title: "Technical Notes", icon: Code2 },
              ].map(({ id, title, icon: Icon }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="group flex items-center p-3 rounded-lg bg-gray-800/30 border border-gray-700/50 hover:bg-purple-500/10 hover:border-purple-500/50 transition-all duration-300"
                >
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mr-3 group-hover:bg-purple-500/30 transition-colors duration-300">
                    <Icon className="h-5 w-5 text-purple-400 group-hover:text-purple-300" />
                  </div>
                  <span className="text-base text-gray-300 group-hover:text-white transition-colors duration-300">
                    {title}
                  </span>
                </a>
              ))}
            </nav>
          </motion.div>

          <div className="space-y-8">
            {/* Introduction */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              id="introduction"
              className="space-y-4"
            >
              <h2 className="text-3xl font-bold text-white mb-3">
                1. Introduction
              </h2>
              <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                <p className="text-base text-gray-300 leading-relaxed mb-4">
                  The LLM API Pricing Calculator is a comprehensive tool
                  designed to help you estimate and compare costs across
                  different Large Language Model APIs. This documentation will
                  guide you through the features, calculation methods, and best
                  practices for using the calculator effectively.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    {
                      icon: DollarSign,
                      title: "Cost Estimation",
                      description:
                        "Accurate cost predictions for your API usage",
                    },
                    {
                      icon: Clock,
                      title: "Real-time Updates",
                      description: "Instant calculations and comparisons",
                    },
                    {
                      icon: Shield,
                      title: "Accurate Data",
                      description: "Up-to-date pricing from official sources",
                    },
                  ].map(({ icon: Icon, title, description }) => (
                    <div
                      key={title}
                      className="flex flex-col items-center text-center p-3 bg-gray-800/40 rounded-xl border border-gray-700/50"
                    >
                      <div className="p-2 bg-purple-500/20 rounded-lg mb-2">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-base font-semibold text-white mb-2">
                        {title}
                      </h3>
                      <p className="text-sm text-gray-400">{description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Quick Start Guide */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              id="quick-start"
              className="space-y-4"
            >
              <h2 className="text-3xl font-bold text-white mb-3">
                2. Quick Start Guide
              </h2>
              <div className="space-y-3">
                {[
                  {
                    title: "Select Providers",
                    description:
                      "Choose the LLM providers you want to compare (OpenAI, Anthropic, Groq).",
                    icon: ArrowRight,
                  },
                  {
                    title: "Input Parameters",
                    description:
                      "Specify your expected usage: input/output size, number of requests, and timeframe.",
                    icon: ArrowRight,
                  },
                  {
                    title: "View Results",
                    description:
                      "Analyze cost comparisons, visualizations, and optimization recommendations.",
                    icon: ArrowRight,
                  },
                ].map(({ title, description, icon: Icon }) => (
                  <div
                    key={title}
                    className="flex items-center p-4 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-200"
                  >
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg mr-3 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {title}
                      </h3>
                      <p className="text-base text-gray-300 leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Calculation Methodology */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              id="methodology"
              className="space-y-4"
            >
              <h2 className="text-3xl font-bold text-white mb-3">
                3. Calculation Methodology
              </h2>
              <div className="space-y-4">
                <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Token-Based Calculation
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "Direct calculation using exact token counts",
                      "Recommended for production environments",
                      "Highest accuracy for cost estimation",
                      "Supports all major tokenizers",
                      "Real-time token counting",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-center text-base text-gray-300"
                      >
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mr-3" />
                        <span className="flex-1">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Word-Based Calculation
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "Approximation using word-to-token conversion",
                      "Suitable for quick estimates",
                      "Uses industry-standard 1.333 tokens per word ratio",
                      "Easy to understand and use",
                      "Perfect for initial planning",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-center text-base text-gray-300"
                      >
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mr-3" />
                        <span className="flex-1">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Example Calculation
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                      <h4 className="text-base font-medium text-white mb-3 flex items-center">
                        <Database className="h-4 w-4 text-purple-400 mr-2" />
                        Input Parameters
                      </h4>
                      <ul className="space-y-2.5">
                        {[
                          { label: "Input Tokens", value: "100" },
                          { label: "Output Tokens", value: "500" },
                          { label: "Requests", value: "1,000" },
                          {
                            label: "Input Rate",
                            value: "$10 per million tokens",
                          },
                          {
                            label: "Output Rate",
                            value: "$30 per million tokens",
                          },
                        ].map(({ label, value }) => (
                          <li
                            key={label}
                            className="flex items-center justify-between text-sm"
                          >
                            <span className="text-gray-400">{label}:</span>
                            <span className="text-gray-200 font-medium">
                              {value}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                      <h4 className="text-base font-medium text-white mb-3 flex items-center">
                        <Calculator className="h-4 w-4 text-purple-400 mr-2" />
                        Cost Breakdown
                      </h4>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="text-sm text-gray-400">
                            Input Cost:
                          </div>
                          <div className="bg-purple-500/10 rounded-lg p-2 font-mono text-sm">
                            <div className="text-gray-300">
                              = (100 × 1,000 × $10) ÷ 1,000,000
                            </div>
                            <div className="text-purple-400 font-medium">
                              = $1.00
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm text-gray-400">
                            Output Cost:
                          </div>
                          <div className="bg-purple-500/10 rounded-lg p-2 font-mono text-sm">
                            <div className="text-gray-300">
                              = (500 × 1,000 × $30) ÷ 1,000,000
                            </div>
                            <div className="text-purple-400 font-medium">
                              = $15.00
                            </div>
                          </div>
                        </div>
                        <div className="pt-2 mt-2 border-t border-gray-700">
                          <div className="flex items-center justify-between text-sm font-medium">
                            <span className="text-gray-300">Total Cost:</span>
                            <span className="text-purple-400 text-base">
                              $16.00
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Supported Models */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              id="models"
              className="space-y-4"
            >
              <h2 className="text-3xl font-bold text-white mb-3">
                4. Supported Models
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  {
                    title: "OpenAI Models",
                    models: ["GPT-4 Turbo", "GPT-3.5 Turbo"],
                  },
                  {
                    title: "Anthropic Models",
                    models: [
                      "Claude 3 Opus",
                      "Claude 3 Sonnet",
                      "Claude 3 Haiku",
                    ],
                  },
                  {
                    title: "Groq Models",
                    models: ["Mixtral 8x7B", "Llama 3 70B", "Llama 3 8B"],
                  },
                ].map(({ title, models }) => (
                  <div
                    key={title}
                    className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50"
                  >
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {title}
                    </h3>
                    <ul className="space-y-2">
                      {models.map((model) => (
                        <li
                          key={model}
                          className="flex items-center text-base text-gray-300"
                        >
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mr-3" />
                          <span className="flex-1">{model}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Features & Capabilities */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              id="features"
              className="space-y-4"
            >
              <h2 className="text-3xl font-bold text-white mb-3">
                5. Features & Capabilities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Advanced Features
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "Real-time cost calculations",
                      "Multiple visualization options",
                      "Model comparison tools",
                      "Cost optimization recommendations",
                      "Export functionality",
                      "Dark/Light mode support",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-center text-base text-gray-300"
                      >
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mr-3" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Getting Started
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "Select your preferred providers",
                      "Enter your usage parameters",
                      "Choose calculation method",
                      "View detailed cost breakdown",
                      "Compare different models",
                      "Export your analysis",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-center text-base text-gray-300"
                      >
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mr-3" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Technical Notes */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              id="technical"
              className="space-y-4"
            >
              <h2 className="text-3xl font-bold text-white mb-3">
                6. Technical Notes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    API Integration
                  </h3>
                  <p className="text-base text-gray-300 leading-relaxed">
                    The calculator uses current pricing data from official API
                    documentation. Prices are updated regularly to reflect the
                    latest rates from each provider. All calculations are
                    performed client-side for privacy and speed.
                  </p>
                </div>

                <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Limitations
                  </h3>
                  <p className="text-base text-gray-300 leading-relaxed">
                    The calculator provides estimates based on average token
                    counts. Actual costs may vary depending on specific usage
                    patterns and potential volume discounts. We recommend
                    verifying with providers for exact pricing in your region.
                  </p>
                </div>
              </div>
            </motion.section>
          </div>
        </motion.article>
      </main>
    </div>
  );
}

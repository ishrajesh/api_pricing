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
  Menu,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Documentation() {
  const [isNavOpen, setIsNavOpen] = useState(true);

  // Set the page title when the component mounts
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "LLM API Pricing Calculator - Documentation";
    return () => {
      document.title = originalTitle;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#13111C] to-[#1A1825] relative">
      {/* Background overlay for consistency */}
      <div className="absolute inset-0 bg-[#1A1825]/50 pointer-events-none" />

      <div className="flex min-h-screen relative z-10">
        {/* Side Navigation */}
        <motion.div
          initial={false}
          animate={{
            width: isNavOpen ? 288 : 64,
            transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
          }}
          className={`fixed left-0 top-[112px] bottom-0 z-20
            overflow-y-auto bg-[#13111C]/95 backdrop-blur-xl border-r border-purple-500/10 shadow-xl
            transform-gpu will-change-transform`}
        >
          <div className="p-4">
            <div className="flex items-center mb-8">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsNavOpen(!isNavOpen)}
                className="w-10 h-10 bg-purple-600/20 rounded-xl flex items-center justify-center hover:bg-purple-600/30 transition-colors duration-100"
              >
                <motion.div
                  animate={{ rotate: isNavOpen ? 0 : 180 }}
                  transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                >
                  <Menu className="w-5 h-5 text-purple-400" />
                </motion.div>
              </motion.button>
              <motion.div
                animate={{
                  width: isNavOpen ? "auto" : 0,
                  opacity: isNavOpen ? 1 : 0,
                  marginLeft: isNavOpen ? 12 : 0,
                }}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <h2 className="text-lg font-semibold bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent whitespace-nowrap">
                  Table of Contents
                </h2>
              </motion.div>
            </div>
            <motion.nav
              animate={{
                opacity: 1,
                transition: { duration: 0.1 },
              }}
              className="space-y-2"
            >
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
                <motion.a
                  key={id}
                  href={`#${id}`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ duration: 0.1 }}
                  className={`group flex items-center ${
                    isNavOpen
                      ? "p-3 rounded-xl bg-purple-500/5 hover:bg-purple-500/10 border border-purple-500/10 hover:border-purple-500/20"
                      : "p-2.5 justify-center hover:bg-purple-500/10"
                  } transition-colors duration-100`}
                  title={!isNavOpen ? title : undefined}
                >
                  <div
                    className={`${
                      isNavOpen ? "w-9 h-9" : "w-11 h-11"
                    } rounded-xl flex items-center justify-center bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors duration-100`}
                  >
                    <Icon
                      className={`${
                        isNavOpen ? "h-5 w-5" : "h-6 w-6"
                      } text-purple-400 group-hover:text-purple-300 transition-colors duration-100`}
                    />
                  </div>
                  <motion.div
                    animate={{
                      width: isNavOpen ? "auto" : 0,
                      opacity: isNavOpen ? 1 : 0,
                      marginLeft: isNavOpen ? 12 : 0,
                    }}
                    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <span className="text-sm font-medium text-gray-300 group-hover:text-purple-300 whitespace-nowrap flex items-center">
                      {title}
                      <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-100" />
                    </span>
                  </motion.div>
                </motion.a>
              ))}
            </motion.nav>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.main
          animate={{
            marginLeft: isNavOpen ? 288 : 64,
            transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
          }}
          className="flex-1 pt-[112px] min-h-screen relative z-10"
        >
          <div className="max-w-7xl mx-auto px-8 pb-24">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="prose prose-invert max-w-none"
            >
              {/* Document Header */}
              <div className="text-center mb-2">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-3xl md:text-5xl font-bold text-white mb-1 tracking-tight"
                >
                  LLM API Pricing Calculator
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-lg text-gray-400 max-w-5xl mx-auto mb-3"
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
                  <h2 className="text-3xl font-bold text-white mb-4">
                    1. Introduction
                  </h2>
                  <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                    <p className="text-base text-gray-300 leading-relaxed mb-4">
                      The LLM API Pricing Calculator is a comprehensive tool
                      designed to help you estimate and compare costs across
                      different Large Language Model APIs. This documentation
                      will guide you through the features, calculation methods,
                      and best practices for using the calculator effectively.
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
                          description:
                            "Up-to-date pricing from official sources",
                        },
                      ].map(({ icon: Icon, title, description }) => (
                        <div
                          key={title}
                          className="flex flex-col items-center text-center p-3 bg-gray-800/40 rounded-xl border border-gray-700/50"
                        >
                          <div className="p-2 bg-purple-500/20 rounded-lg">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <h3 className="text-base font-semibold text-white mb-2 ">
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
                  <h2 className="text-3xl font-bold text-white mb-4">
                    2. Quick Start Guide
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  <h2 className="text-3xl font-bold text-white mb-4">
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
                                <span className="text-gray-300">
                                  Total Cost:
                                </span>
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
                  <h2 className="text-3xl font-bold text-white mb-4">
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
                  <h2 className="text-3xl font-bold text-white mb-4">
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
                  <h2 className="text-3xl font-bold text-white mb-4">
                    6. Technical Notes
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        API Integration
                      </h3>
                      <p className="text-base text-gray-300 leading-relaxed">
                        The calculator uses current pricing data from official
                        API documentation. Prices are updated regularly to
                        reflect the latest rates from each provider. All
                        calculations are performed client-side for privacy and
                        speed.
                      </p>
                    </div>

                    <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        Limitations
                      </h3>
                      <p className="text-base text-gray-300 leading-relaxed">
                        The calculator provides estimates based on average token
                        counts. Actual costs may vary depending on specific
                        usage patterns and potential volume discounts. We
                        recommend verifying with providers for exact pricing in
                        your region.
                      </p>
                    </div>
                  </div>
                </motion.section>
              </div>
            </motion.article>
          </div>
        </motion.main>
      </div>
    </div>
  );
}

import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ({ darkMode }: { darkMode: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems: FAQItem[] = [
    {
      question:
        "How do I find the most cost-efficient model for my specific use case?",
      answer:
        "Use our scatter plot visualization to identify models with the best performance-to-cost ratio. For general tasks, models like Llama 3 8B and GPT-3.5 Turbo typically offer good value. For more complex applications requiring advanced reasoning, consider Claude 3.5 Haiku or GPT-4o Mini. Filter models by features you need (like function calling or vision capabilities) using our feature matrix, then compare costs based on your expected usage patterns.",
    },
    {
      question: "How can I optimize my LLM API costs?",
      answer:
        "Several strategies can reduce costs: 1) Use smaller, specialized models for simpler tasks, 2) Optimize prompts to be concise but effective, 3) Set appropriate maximum token limits for responses, 4) Implement caching for common queries, 5) Consider batching similar requests, and 6) Use our calculator to compare different models and usage patterns. For high-volume applications, contact providers directly as they often offer volume discounts not reflected in our standard pricing.",
    },
    {
      question: "What's the difference between input and output token pricing?",
      answer:
        "Input tokens represent the text you send to the model (your prompts), while output tokens are what the model generates in response. Most providers charge different rates for each, with output tokens typically costing 2-5 times more than input tokens. This pricing structure means that optimizing your prompts and controlling response length can significantly impact overall costs. Our radar chart visualization helps you understand this balance for each model.",
    },
    {
      question: "How do I interpret the different visualization options?",
      answer:
        "Our calculator offers three complementary views: Bar charts show total costs across models for quick comparison; Radar charts reveal the balance between input and output costs, helping identify where your expenses will be concentrated; Scatter plots position models based on performance and cost, making it easy to spot efficient options. Switch between these views to gain comprehensive insights into potential API expenses for your specific usage pattern.",
    },
    {
      question: "How accurate are the cost estimates?",
      answer:
        "Our calculator uses current official pricing data from each provider and applies standard token counting methodologies. For typical English text, estimates are highly accurate. Factors that may affect actual costs include: exact token counts (which vary by content), potential volume discounts, recent pricing changes, and currency fluctuations. We regularly update our database to maintain accuracy, but for mission-critical applications, we recommend verifying with the provider's latest pricing documentation.",
    },
  ];

  return (
    <div
      className={`w-full max-w-7xl mx-auto px-4 py-16 ${
        darkMode ? "text-white" : "text-gray-900"
      }`}
    >
      <h2
        className={`text-3xl font-bold mb-8 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Frequently asked questions
      </h2>

      <div className="space-y-0">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className={`border-t ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <button
              onClick={() => toggleQuestion(index)}
              className={`w-full py-6 text-left flex justify-between items-center`}
            >
              <span
                className={`font-medium text-lg ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {item.question}
              </span>
              <ChevronDown
                className={`h-5 w-5 ${
                  openIndex === index ? "rotate-180" : ""
                } transition-transform duration-200 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-96" : "max-h-0"
              }`}
            >
              <p
                className={`pb-6 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                } leading-relaxed`}
              >
                {item.answer}
              </p>
            </div>
          </div>
        ))}
        <div
          className={`border-t ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
        ></div>
      </div>
    </div>
  );
}

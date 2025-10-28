import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "How long does delivery take?",
    answer:
      "Orders are typically processed within 1–2 business days. Standard shipping takes 3–7 days depending on your location. You will receive tracking details once your order is shipped.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship worldwide! Delivery times and shipping fees vary depending on your region. Customs fees may apply based on your country’s regulations.",
  },
  {
    question: "What warranty do your watches come with?",
    answer:
      "All Timely Watches come with a 2-year international warranty covering manufacturing defects. It does not cover damage from misuse or normal wear and tear.",
  },
  {
    question: "Can I return or exchange my watch?",
    answer:
      "Of course. You can return your watch within 30 days of delivery for a full refund, as long as it’s unused and in its original packaging. Exchanges are also available for the same value.",
  },
  {
    question: "How do I care for my watch?",
    answer:
      "Avoid exposure to strong magnets, chemicals, or extreme temperatures. Clean your watch regularly with a soft cloth and ensure it’s serviced by authorized professionals.",
  },
  {
    question: "Are your watches waterproof?",
    answer:
      "Most of our watches are water-resistant up to 50 meters, suitable for everyday activities such as hand washing or rain exposure — but not for swimming or diving.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-[#1A2A50] text-white px-6! py-16!">

      <div className="max-w-5xl mx-auto! text-center mb-12!">
        <h1 className="text-4xl font-bold mb-4!">Frequently Asked Questions</h1>
        <p className="text-gray-300 text-lg">
          Find answers to common questions about our products, delivery, warranty, and more.
          Still need help?{" "}
          <a href="/contact" className="text-red-500 hover:underline">
            Contact our team
          </a>
          .
        </p>
      </div>

      <div className="max-w-4xl mx-auto! space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = index === openIndex;
          return (
            <div
              key={index}
              className={`border border-gray-700 rounded-2xl bg-gray-800/70 backdrop-blur-md shadow-md overflow-hidden transition-all duration-300 mb-2!${
                isOpen ? "ring-1 ring-red-700 mb-2!" : ""
              }`}
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center px-6! py-4! text-left focus:outline-none"
              >
                <span className="text-lg font-medium">{faq.question}</span>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-red-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-red-500" />
                )}
              </button>

              {isOpen && (
                <div className="px-6! py-4! text-gray-300 text-md border-t border-gray-700 animate-fadeIn">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="text-center text-gray-400 text-sm mt-12!">
        Still can’t find your answer? Email us at{" "}
        <a href="mailto:support@watchme.com" className="text-red-500 hover:underline">
          support@watchme.com
        </a>
      </div>
    </section>
  );
}

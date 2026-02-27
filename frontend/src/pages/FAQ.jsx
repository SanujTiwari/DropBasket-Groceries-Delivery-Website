import React, { useState } from 'react';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "How long does delivery take?",
            answer: "We pride ourselves on speed! Most orders are delivered within 30-60 minutes depending on your distance from our nearest distribution center. You can track your rider in real-time after dispatch."
        },
        {
            question: "Are the fruits and vegetables fresh?",
            answer: "Absolutely! We source our perishables directly from local farms every morning. Our quality control team inspects every item before packing. If you receive anything less than fresh, we offer an instant replacement."
        },
        {
            question: "What are the delivery charges?",
            answer: "Delivery is FREE for all orders above $20! for orders below that, we charge a nominal flat fee of $2 to help cover our logistics and ensure your groceries reach you safely."
        },
        {
            question: "Can I return products if I'm not satisfied?",
            answer: "Yes, we have a 'No Questions Asked' return policy at the time of delivery. For perishables like milk or vegetables, please report any issues within 2 hours of delivery for a full refund or replacement."
        },
        {
            question: "How can I track my order?",
            answer: "Once your order is confirmed, you can visit the 'My Orders' section in your profile. You'll see live updates from 'Order Placed' to 'Out for Delivery' with the rider's contact details."
        },
        {
            question: "Which payment methods do you accept?",
            answer: "We support all modern payment methods including Credit/Debit Cards (Visa, Mastercard), UPI, Digital Wallets, and Cash on Delivery (COD) for your convenience."
        }
    ];

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="mt-16 pb-24 max-w-4xl mx-auto px-6 animate-fadeIn">
            <div className="text-center mb-16">
                <h1 className="text-3xl md:text-4xl font-black text-[#1a202c] mb-3 italic">
                    Frequently Asked <span className="text-[#ff3838]">Questions</span>
                </h1>
                <p className="text-gray-500 text-lg">
                    Everything you need to know about your grocery delivery experience.
                </p>
            </div>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className={`border rounded-3xl transition-all duration-300 overflow-hidden ${activeIndex === index ? 'border-primary bg-green-50/30' : 'border-gray-100 bg-white hover:border-green-200'}`}
                    >
                        <button
                            onClick={() => toggleAccordion(index)}
                            className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none"
                        >
                            <span className={`text-lg font-bold transition-colors ${activeIndex === index ? 'text-primary' : 'text-gray-800'}`}>
                                {faq.question}
                            </span>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${activeIndex === index ? 'bg-primary text-white rotate-180' : 'bg-gray-100 text-gray-400'}`}>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </button>
                        <div
                            className={`px-8 transition-all duration-300 ease-in-out ${activeIndex === index ? 'max-h-64 pb-8 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
                        >
                            <p className="text-gray-600 leading-relaxed text-base">
                                {faq.answer}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Support section */}
            <div className="mt-20 p-10 bg-gradient-to-br from-green-600 to-primary rounded-[3rem] text-white text-center shadow-xl shadow-green-200">
                <h2 className="text-3xl font-black mb-4">Still have questions?</h2>
                <p className="text-green-50 mb-8 opacity-90">Our team is available 24/7 to assist you with any inquiries.</p>
                <a
                    href="/contact"
                    className="inline-block bg-white text-primary px-10 py-4 rounded-2xl font-black hover:scale-105 transition-transform"
                >
                    Contact Support
                </a>
            </div>

            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
            `}</style>
        </div>
    );
};

export default FAQ;

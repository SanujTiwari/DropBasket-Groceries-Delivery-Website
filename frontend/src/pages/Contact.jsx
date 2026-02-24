import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-hot-toast';

const Contact = () => {
    const { assets } = useAppContext();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Thank you for reaching out! We'll get back to you soon.");
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="mt-16 pb-20 animate-fadeIn">
            {/* Header Section */}
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
                    Get in <span className="text-primary">Touch</span>
                </h1>
                <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                    Have a question, feedback, or need help with an order? Our team is here for you.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Contact Info */}
                <div className="space-y-8">
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-green-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-6 mb-6">
                            <div className="p-4 bg-green-100 rounded-2xl">
                                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">Our Location</h3>
                                <p className="text-gray-500">123 Green Street, Fresh City, FC 56789</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 mb-6">
                            <div className="p-4 bg-green-100 rounded-2xl">
                                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">Email Us</h3>
                                <p className="text-gray-500">support@dropbasket.com</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="p-4 bg-green-100 rounded-2xl">
                                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">Call Us</h3>
                                <p className="text-gray-500">+1 (234) 567-890</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative h-64 rounded-[2rem] overflow-hidden shadow-sm border border-green-100">
                        <img src="https://images.unsplash.com/photo-1526367790999-0150786486a2?auto=format&fit=crop&w=800&q=80" alt="Contact Us" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                            <span className="bg-white/90 px-6 py-2 rounded-full font-bold text-primary shadow-lg">DropBasket HQ</span>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl border border-green-50 animate-slideUp">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-5 py-4 border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-primary focus:bg-green-50/30 transition-all placeholder:text-gray-400"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-5 py-4 border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-primary focus:bg-green-50/30 transition-all placeholder:text-gray-400"
                                    placeholder="Your Email"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Subject</label>
                            <input
                                type="text"
                                required
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                className="w-full px-5 py-4 border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-primary focus:bg-green-50/30 transition-all placeholder:text-gray-400"
                                placeholder="How can we help?"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Message</label>
                            <textarea
                                rows="5"
                                required
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full px-5 py-4 border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-primary focus:bg-green-50/30 transition-all placeholder:text-gray-400 resize-none"
                                placeholder="Tell us more about your inquiry..."
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-primary to-green-600 text-white font-extrabold py-5 rounded-2xl hover:from-green-700 hover:to-green-700 transition-all duration-300 transform hover:-translate-y-1 shadow-[0_10px_20px_-10px_rgba(34,197,94,0.5)] active:scale-95"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>

            <style>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
                .animate-slideUp { animation: slideUp 0.8s ease-out; }
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #22c55e; border-radius: 10px; }
            `}</style>
        </div>
    );
};

export default Contact;

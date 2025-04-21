import React, { useState } from "react";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted:", formData);
    };

    return (
        <div className="container mx-auto mt-8 px-4">
            <div
                className="p-6 rounded-4 shadow-sm"
                style={{
                    background: "linear-gradient(135deg, #fdfbfb, #ebedee)",
                }}
            >
                <h2 className="text-2xl font-bold text-[#2575fc] mb-6 flex items-center gap-2">
                    📬 Contact Us
                </h2>
                <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="🙋 Your Name"
                        required
                        className="form-control rounded-pill p-3 col-span-1"
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="📧 Email Address"
                        required
                        className="form-control rounded-pill p-3 col-span-1"
                    />
                    <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="📝 Subject"
                        required
                        className="form-control rounded-pill p-3 md:col-span-2"
                    />
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="💬 Your Message"
                        rows="5"
                        required
                        className="form-control rounded-4 p-3 md:col-span-2"
                        style={{ borderRadius: "1.5rem" }}
                    ></textarea>
                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            className="btn w-full text-white rounded-pill"
                            style={{
                                background: "linear-gradient(135deg, #6a11cb, #2575fc)",
                                padding: "12px",
                                fontWeight: "bold",
                            }}
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;

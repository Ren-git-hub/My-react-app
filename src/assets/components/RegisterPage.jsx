import React, { useState } from "react";

function RegisterPage() {
    const [userType, setUserType] = useState("jobSeeker");
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    // For user feedback
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage("");
        setErrorMessage("");

        // Construct a user object that matches your backend's User model
        const userPayload = {
            fullName,
            username,
            email,
            password,
            phone,
            isEmployer: userType === "employer",
            isJobseeker: userType === "jobSeeker"
        };

        try {
            const response = await fetch("http://localhost:8000/user/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userPayload)
            });

            // The server may return plain text or JSON on error.
            // We'll try to parse JSON; if that fails, we'll fallback to text.
            const responseText = await response.text();

            if (response.ok) {
                // 2xx status => success
                setSuccessMessage(responseText || "Registration successful!");
            } else {
                // Non-2xx => error
                try {
                    // Attempt to parse the error as JSON
                    const errorData = JSON.parse(responseText);
                    // If there's a known error field, use it; otherwise fallback
                    const errorMsg = errorData.message || errorData.error || responseText;
                    setErrorMessage(errorMsg);
                } catch {
                    // If it's not valid JSON, just display the raw response text
                    setErrorMessage(responseText || "Registration failed.");
                }
            }
        } catch (err) {
            // Network or fetch error
            setErrorMessage("Could not connect to the server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] px-4 py-12">
            <div className="w-full max-w-lg bg-white p-8 rounded-3xl shadow-md">
                <h2 className="text-3xl font-bold text-center mb-6 text-[#2575fc]">Register</h2>

                {/* Success / Error Messages */}
                {successMessage && (
                    <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg text-center">
                        {successMessage}
                    </div>
                )}
                {errorMessage && (
                    <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg text-center">
                        {errorMessage}
                    </div>
                )}

                {/* User Type Switch */}
                <div className="mb-6">
                    <div className="flex border border-[#2575fc] rounded-full overflow-hidden text-sm font-medium">
                        <button
                            type="button"
                            onClick={() => setUserType("jobSeeker")}
                            className={`w-1/2 py-2 transition-colors duration-200 ${
                                userType === "jobSeeker"
                                    ? "bg-gradient-to-r from-[#6a11cb] to-[#2575fc] text-white"
                                    : "bg-white text-[#2575fc]"
                            }`}
                        >
                            Job Seeker
                        </button>
                        <button
                            type="button"
                            onClick={() => setUserType("employer")}
                            className={`w-1/2 py-2 transition-colors duration-200 ${
                                userType === "employer"
                                    ? "bg-gradient-to-r from-[#6a11cb] to-[#2575fc] text-white"
                                    : "bg-white text-[#2575fc]"
                            }`}
                        >
                            Employer
                        </button>
                    </div>
                </div>

                {/* Registration Form */}
                <form onSubmit={handleSubmit} className="space-y-5" role="form">
                    {/* Full Name */}
                    <div className="relative">
                        <label htmlFor="fullName" className="sr-only">Full Name</label>
                        <div className="flex items-center border border-gray-300 rounded-full px-4 py-3 focus-within:ring-2 focus-within:ring-[#2575fc] bg-white">
                            <span className="mr-2">🙋</span>
                            <input
                                id="fullName"
                                type="text"
                                name="fullName"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Full Name"
                                required
                                className="w-full bg-transparent outline-none placeholder-gray-500"
                                aria-label="Full Name"
                            />
                        </div>
                    </div>

                    {/* Username */}
                    <div className="relative">
                        <label htmlFor="username" className="sr-only">Username</label>
                        <div className="flex items-center border border-gray-300 rounded-full px-4 py-3 focus-within:ring-2 focus-within:ring-[#2575fc] bg-white">
                            <span className="mr-2">👤</span>
                            <input
                                id="username"
                                type="text"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                                required
                                className="w-full bg-transparent outline-none placeholder-gray-500"
                                aria-label="Username"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <label htmlFor="email" className="sr-only">Email</label>
                        <div className="flex items-center border border-gray-300 rounded-full px-4 py-3 focus-within:ring-2 focus-within:ring-[#2575fc] bg-white">
                            <span className="mr-2">📧</span>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                required
                                className="w-full bg-transparent outline-none placeholder-gray-500"
                                aria-label="Email"
                            />
                        </div>
                    </div>

                    {/* Password with Show/Hide Toggle */}
                    <div className="relative">
                        <label htmlFor="password" className="sr-only">Password</label>
                        <div className="flex items-center border border-gray-300 rounded-full px-4 py-3 focus-within:ring-2 focus-within:ring-[#2575fc] bg-white">
                            <span className="mr-2">🔐</span>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                                className="w-full bg-transparent outline-none placeholder-gray-500"
                                aria-label="Password"
                            />
                            <button
                                type="button"
                                className="ml-2 text-sm text-[#2575fc] font-medium"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="relative">
                        <label htmlFor="phone" className="sr-only">Phone</label>
                        <div className="flex items-center border border-gray-300 rounded-full px-4 py-3 focus-within:ring-2 focus-within:ring-[#2575fc] bg-white">
                            <span className="mr-2">📱</span>
                            <input
                                id="phone"
                                type="tel"
                                name="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Phone"
                                required
                                className="w-full bg-transparent outline-none placeholder-gray-500"
                                aria-label="Phone"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full text-white rounded-full font-bold text-lg shadow-md transition-all duration-300"
                        style={{
                            background: "linear-gradient(135deg, #6a11cb, #2575fc)",
                            padding: "12px",
                        }}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

            </div>
        </div>

    );
}

export default RegisterPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../api";

function RegisterPage() {
    const [userType, setUserType] = useState("jobSeeker");
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage("");
        setErrorMessage("");

        const payload = {
            fullName,
            username,
            email,
            password,
            phone,
            isEmployer: userType === "employer",
            isJobseeker: userType === "jobSeeker",
        };

        try {
            const response = await apiFetch("http://localhost:8000/user/signup", {
                method: "POST",
                body: JSON.stringify(payload),
            });

            const text = await response.text();
            if (response.ok) {
                setSuccessMessage(text || "Registration successful!");
                setTimeout(() => navigate("/login"), 1500);
            } else {
                setErrorMessage(text || "Registration failed.");
            }
        } catch {
            setErrorMessage("Could not connect to the server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] px-4 py-12">
            <div className="w-full max-w-lg bg-white p-8 rounded-3xl shadow-md">
                <h2 className="text-3xl font-bold text-center mb-6 text-[#2575fc]">
                    Register
                </h2>

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

                <div className="mb-6 flex border border-[#2575fc] rounded-full overflow-hidden text-sm font-medium">
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

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Full Name */}
                    <div className="relative">
                        <div className="flex items-center border border-gray-300 rounded-full px-4 py-3 bg-white focus-within:ring-2 focus-within:ring-[#2575fc]">
                            <span className="mr-2">🙋</span>
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full bg-transparent outline-none placeholder-gray-500"
                                required
                            />
                        </div>
                    </div>
                    {/* Username */}
                    <div className="relative">
                        <div className="flex items-center border border-gray-300 rounded-full px-4 py-3 bg-white focus-within:ring-2 focus-within:ring-[#2575fc]">
                            <span className="mr-2">👤</span>
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-transparent outline-none placeholder-gray-500"
                                required
                            />
                        </div>
                    </div>
                    {/* Email */}
                    <div className="relative">
                        <div className="flex items-center border border-gray-300 rounded-full px-4 py-3 bg-white focus-within:ring-2 focus-within:ring-[#2575fc]">
                            <span className="mr-2">📧</span>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent outline-none placeholder-gray-500"
                                required
                            />
                        </div>
                    </div>
                    {/* Password */}
                    <div className="relative">
                        <div className="flex items-center border border-gray-300 rounded-full px-4 py-3 bg-white focus-within:ring-2 focus-within:ring-[#2575fc]">
                            <span className="mr-2">🔐</span>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent outline-none placeholder-gray-500"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="ml-2 text-sm text-[#2575fc] font-medium"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>
                    {/* Phone */}
                    <div className="relative">
                        <div className="flex items-center border border-gray-300 rounded-full px-4 py-3 bg-white focus-within:ring-2 focus-within:ring-[#2575fc]">
                            <span className="mr-2">📱</span>
                            <input
                                type="tel"
                                placeholder="Phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full bg-transparent outline-none placeholder-gray-500"
                                required
                            />
                        </div>
                    </div>

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

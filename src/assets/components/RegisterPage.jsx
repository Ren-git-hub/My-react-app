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
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

                {/* Success / Error Messages */}
                {successMessage && (
                    <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">
                        {successMessage}
                    </div>
                )}
                {errorMessage && (
                    <div className="mb-4 p-2 bg-red-100 text-red-800 rounded">
                        {errorMessage}
                    </div>
                )}

                {/* User Type Switch */}
                <div className="mb-4 mt-4">
                    <div className="flex w-full border rounded overflow-hidden">
                        <button
                            type="button"
                            onClick={() => setUserType("jobSeeker")}
                            className={`w-1/2 py-2 text-center transition-colors duration-200 ${
                                userType === "jobSeeker"
                                    ? "bg-navbg text-white"
                                    : "bg-white text-navbg"
                            }`}
                        >
                            Job Seeker
                        </button>
                        <button
                            type="button"
                            onClick={() => setUserType("employer")}
                            className={`w-1/2 py-2 text-center transition-colors duration-200 ${
                                userType === "employer"
                                    ? "bg-navbg text-white"
                                    : "bg-white text-navbg"
                            }`}
                        >
                            Employer
                        </button>
                    </div>
                </div>

                {/* Registration Form */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Full Name</label>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="mt-1 w-full border border-gray-300 rounded px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Username</label>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 w-full border border-gray-300 rounded px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 w-full border border-gray-300 rounded px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 w-full border border-gray-300 rounded px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Phone</label>
                        <input
                            type="tel"
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="mt-1 w-full border border-gray-300 rounded px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>

                    {/* Additional fields for job seekers or employers, if needed */}
                    {userType === "jobSeeker" && (
                        <>
                            {/* Add extra jobSeeker fields here if your backend requires them */}
                        </>
                    )}
                    {userType === "employer" && (
                        <>
                            {/* Add extra employer fields here if your backend requires them */}
                        </>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-navbg text-white py-2 rounded
                       hover:bg-teal-600 transition-colors duration-200
                       flex items-center justify-center"
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;

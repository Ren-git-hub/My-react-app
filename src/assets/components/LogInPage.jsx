import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("jobSeeker");
    const [loading, setLoading] = useState(false);
    const [loginMessage, setLoginMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setLoginMessage("");

        try {
            // Backend expects username in the body (as JSON string) and password as a query parameter
            const response = await fetch(
                `http://localhost:8000/user/login?password=${encodeURIComponent(password)}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(username),
                }
            );

            if (response.ok) {
                // Get the token from the response text
                const token = await response.text();
                // Store the token in localStorage
                localStorage.setItem("token", token);
                // Redirect to homepage
                navigate("/");
            } else {
                const responseText = await response.text();
                setLoginMessage("Login failed: " + responseText);
            }
        } catch (error) {
            setLoginMessage("Error connecting to server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

                {/* User Feedback */}
                {loginMessage && (
                    <div
                        className={`mb-4 p-2 rounded ${
                            loginMessage.startsWith("Login successful")
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                        }`}
                    >
                        {loginMessage}
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

                {/* Login Form */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Username / Email</label>
                        <input
                            type="text"
                            placeholder="Username or Email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 w-full border border-gray-300 rounded px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
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

                    <button
                        type="submit"
                        className="w-full bg-navbg text-white py-2 rounded hover:bg-teal-600 transition-colors duration-200
                       flex items-center justify-center"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Log In"}
                    </button>
                </form>

                {/* Divider with "or" */}
                <div className="flex items-center my-4">
                    <hr className="flex-grow border-t border-gray-300" />
                    <span className="mx-2 text-gray-500">or</span>
                    <hr className="flex-grow border-t border-gray-300" />
                </div>

                {/* Google Sign-In Button (unchanged) */}
                <button
                    type="button"
                    className="w-full flex items-center justify-center border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-100 transition-colors duration-200"
                >
                    <svg
                        className="w-5 h-5 mr-2"
                        viewBox="0 0 48 48"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill="#EA4335"
                            d="M24 9.5c3.54 0 6.71 1.22 9.22 3.24l6.82-6.82C36.22 3.23 30.47 1 24 1 14.64 1 6.5 6.64 2.72 14.16l7.91 6.15C12.76 12.24 17.86 9.5 24 9.5z"
                        />
                        <path
                            fill="#4285F4"
                            d="M46.08 24.5c0-1.62-.14-3.16-.39-4.65H24v8.79h12.52c-.54 2.96-2.16 5.47-4.59 7.16l7.2 5.59C43.08 37.14 46.08 31.04 46.08 24.5z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M10.63 28.28c-.43-1.27-.67-2.63-.67-4.03s.24-2.76.67-4.03L2.72 14.16C.99 17.08 0 20.24 0 24s.99 6.92 2.72 9.84l7.91-6.15z"
                        />
                        <path
                            fill="#34A853"
                            d="M24 47c6.47 0 12.22-2.14 16.29-5.83l-7.2-5.59c-2 1.34-4.56 2.13-9.09 2.13-6.14 0-11.24-2.74-14.3-7.42l-7.91 6.15C6.5 41.36 14.64 47 24 47z"
                        />
                        <path fill="none" d="M0 0h48v48H0z" />
                    </svg>
                    Sign in with Google
                </button>
            </div>
        </div>
    );
}

export default LoginPage;

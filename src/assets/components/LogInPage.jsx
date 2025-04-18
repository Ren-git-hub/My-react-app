import React, { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { apiFetch } from "../../api";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [loginMessage, setLoginMessage] = useState("");
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setLoginMessage("");

        try {
            const response = await apiFetch("http://localhost:8000/user/login", {
                method: "POST",
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const token = await response.text();
                localStorage.setItem("username", username);
                login(token); // stores token & redirects to “/”
            } else {
                const text = await response.text();
                setLoginMessage("Login failed: " + text);
            }
        } catch {
            setLoginMessage("Error connecting to server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] px-4 py-12">
            <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6 text-[#2575fc]">
                    Login
                </h2>

                {loginMessage && (
                    <div
                        className={`mb-4 p-3 rounded-lg text-center ${
                            loginMessage.startsWith("Login failed")
                                ? "bg-red-100 text-red-800"
                                : "bg-green-100 text-green-800"
                        }`}
                    >
                        {loginMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative">
                        <label htmlFor="username" className="sr-only">
                            Username
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-full px-4 py-3 bg-white focus-within:ring-2 focus-within:ring-[#2575fc]">
                            <span className="mr-2">👤</span>
                            <input
                                id="username"
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-transparent outline-none placeholder-gray-500"
                                required
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <label htmlFor="password" className="sr-only">
                            Password
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-full px-4 py-3 bg-white focus-within:ring-2 focus-within:ring-[#2575fc]">
                            <span className="mr-2">🔐</span>
                            <input
                                id="password"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent outline-none placeholder-gray-500"
                                required
                                autoComplete="current-password"
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
                        {loading ? "Logging in..." : "Log In"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;

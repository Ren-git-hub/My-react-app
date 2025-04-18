import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./auth/AuthContext";
import PrivateRoute from "./assets/components/PrivateRoute";
import Navbar from "./assets/components/Navbar";
import SearchBar from "./assets/components/SearchBar";
import JobList from "./assets/components/JobList";
import JobPostCreateForm from "./assets/components/JobPostCreateForm";
import AboutUS from "./assets/components/AboutUS";
import UserProfile from "./assets/components/UserProfile";
import LoginPage from "./assets/components/LoginPage";
import RegisterPage from "./assets/components/RegisterPage";
import ContactUs from "./assets/components/ContactUs";

function App() {
    const [searchKeyword, setSearchKeyword] = useState("");

    const handleSearch = (keyword) => setSearchKeyword(keyword);

    return (
        <Router>
            <AuthProvider>
                <Navbar title="Husband 4 Hire" />
                <SearchBar onSearch={handleSearch} />

                <Routes>
                    {/* Public */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/about" element={<AboutUS />} />
                    <Route path="/contact" element={<ContactUs />} />

                    {/* Protected */}
                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <JobList searchKeyword={searchKeyword} />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/create"
                        element={
                            <PrivateRoute>
                                <JobPostCreateForm />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <PrivateRoute>
                                <UserProfile />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;

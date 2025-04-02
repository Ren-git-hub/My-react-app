import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

    const handleSearch = (keyword) => {
        setSearchKeyword(keyword);
    };

    return (
        <Router>
            <Navbar title="Husband 4 Hire" />
            <SearchBar onSearch={handleSearch} />
            <Routes>
                <Route path="/" element={<JobList searchKeyword={searchKeyword} />} />
                <Route path="/create" element={<JobPostCreateForm />} />
                <Route path="/about" element={<AboutUS />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/contact" element={<ContactUs />} />
            </Routes>
        </Router>
    );
}

export default App;

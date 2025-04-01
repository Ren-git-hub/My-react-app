import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./assets/components/Navbar";
import SearchBar from "./assets/components/SearchBar";
import JobList from "./assets/components/JobList";
import ContactUs from "./assets/components/ContactUs";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JobPostCreateForm from "./assets/components/JobPostCreateForm";
import AboutUS from "./assets/components/AboutUS";
import UserProfile from "./assets/components/UserProfile";
import LoginPage from "./assets/components/LoginPage";
import RegisterPage from "./assets/components/RegisterPage";

function App() {
  const [count, setCount] = useState(0);

  return (
      <Router>
        <Navbar title="Husband 4 Hire" />
        <SearchBar />
        <div className="Content">
          <Routes>
            <Route path="/" element={<JobList />} />
            <Route path="/create" element={<JobPostCreateForm />} />
            <Route path="/about" element={<AboutUS />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
              <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;


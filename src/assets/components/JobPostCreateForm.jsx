import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function JobPostCreateForm() {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    hours: "",
    wage: "",
    note: "",
    userId: 1 // Simulated logged-in user
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:8000/jobpost/createjobpost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    navigate("/"); // Redirect after creation
  };

  return (
      <div className="container mt-5">
        <h2 className="text-primary fw-bold">📝 Create a Job Post</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-3">
            <input
                className="form-control"
                name="title"
                placeholder="Job Title"
                onChange={handleChange}
                required
            />
          </div>
          <div className="mb-3">
            <input
                className="form-control"
                name="location"
                placeholder="Location"
                onChange={handleChange}
                required
            />
          </div>
          <div className="mb-3">
            <input
                className="form-control"
                name="hours"
                type="number"
                placeholder="Hours"
                onChange={handleChange}
                required
            />
          </div>
          <div className="mb-3">
            <input
                className="form-control"
                name="wage"
                type="number"
                placeholder="Hourly Wage"
                onChange={handleChange}
                required
            />
          </div>
          <div className="mb-3">
          <textarea
              className="form-control"
              name="note"
              placeholder="Special Note"
              onChange={handleChange}
              rows={3}
          />
          </div>
          <button className="btn btn-primary">Post Job</button>
        </form>
      </div>
  );
}

export default JobPostCreateForm;

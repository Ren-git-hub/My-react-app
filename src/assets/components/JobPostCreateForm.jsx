import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { apiFetch } from "../../api";

function JobPostCreateForm() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    province: "",
    city: "",
    hours: "",
    salary: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const provinceOptions = [
    { label: "Ontario", value: "ON" },
    { label: "Quebec", value: "QC" },
    { label: "British Columbia", value: "BC" },
    { label: "Alberta", value: "AB" },
    { label: "Manitoba", value: "MB" },
    { label: "Nova Scotia", value: "NS" },
  ];

  const cityOptions = {
    ON: ["Toronto", "Ottawa", "Mississauga", "Brampton", "Hamilton", "Kitchener", "London", "Markham", "Vaughan", "Windsor"],
    QC: ["Montreal", "Quebec City", "Laval", "Gatineau", "Longueuil", "Sherbrooke", "Saguenay", "Trois-Rivières", "Levis", "Terrebonne"],
    BC: ["Vancouver", "Victoria", "Surrey", "Burnaby", "Richmond", "Abbotsford", "Coquitlam", "Kelowna", "Langley", "Saanich"],
    AB: ["Calgary", "Edmonton", "Red Deer", "Lethbridge", "St. Albert", "Medicine Hat", "Grande Prairie", "Airdrie", "Spruce Grove", "Lethbridge"],
    MB: ["Winnipeg", "Brandon", "Steinbach", "Thompson", "Portage la Prairie", "Morden", "Selkirk", "Dauphin", "Flin Flon", "Winkler"],
    NS: ["Halifax", "Sydney", "Truro", "New Glasgow", "Glace Bay", "Bridgewater", "Amherst", "Kentville", "Berwick", "Digby"],
  };

  // Update formData state when any input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, // overwrite only the changed field
    }));
  };

// Submit the job post form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // build payload from formData
    const payload = {
      title: formData.title,
      description: formData.description,
      location: `${formData.city}, ${formData.province}`,
      salary: parseFloat(formData.salary),
      hours: parseInt(formData.hours, 10),
      employer: { userID: user.userID },
    };

    try {
      // send POST request to create job post
      const res = await apiFetch(
          "http://localhost:8000/jobpost/createjobpost",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
      );
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Error ${res.status}`);
      }

      setSuccess("Job posted successfully! Redirecting...");
      // reset form fields
      setFormData({
        title: "",
        province: "",
        city: "",
        hours: "",
        salary: "",
        description: "",
      });
      // navigate home after brief delay
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
      <div className="container mt-5">
        <h2 className="text-primary fw-bold">📝 Create a Job Post</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <div className="mb-3">
            <input
                className="form-control"
                name="title"
                value={formData.title}
                placeholder="Job Title"
                onChange={handleChange}
                required
            />
          </div>

          <div className="mb-3">
            <select
                className="form-select"
                name="province"
                value={formData.province}
                onChange={handleChange}
                required
            >
              <option value="">Select Province</option>
              {provinceOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <input
                className="form-control"
                list="city-list"
                name="city"
                value={formData.city}
                placeholder="City"
                onChange={handleChange}
                required
            />
            <datalist id="city-list">
              {formData.province &&
                  cityOptions[formData.province].map((c) => (
                      <option key={c} value={c} />
                  ))}
            </datalist>
          </div>

          <div className="mb-3">
            <input
                className="form-control"
                name="hours"
                type="number"
                value={formData.hours}
                placeholder="Hours"
                onChange={handleChange}
                required
            />
          </div>

          <div className="mb-3">
            <input
                className="form-control"
                name="salary"
                type="number"
                step="0.01"
                value={formData.salary}
                placeholder="Hourly Wage"
                onChange={handleChange}
                required
            />
          </div>

          <div className="mb-3">
          <textarea
              className="form-control"
              name="description"
              value={formData.description}
              placeholder="Job Description"
              onChange={handleChange}
              rows={4}
          />
          </div>

          <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
          >
            {loading ? "Posting..." : "Post Job"}
          </button>
        </form>
      </div>
  );
}

export default JobPostCreateForm;

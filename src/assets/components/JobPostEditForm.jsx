import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiFetch } from "../../api";
import { useAuth } from "../../auth/AuthContext";

export default function JobPostEditForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

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

  const [formData, setFormData] = useState({
    jobPostID: id,
    title: "",
    description: "",
    province: "",
    city: "",
    salary: "",
    hours: "",
    employer: { userID: user.userID },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchJob() {
      try {
        const res = await apiFetch(`http://localhost:8000/jobpost/${id}`);
        if (!res.ok) throw new Error(`Failed to load job (${res.status})`);
        const data = await res.json();
        // parse location into city and province
        let [city = "", province = ""] = data.location.split(",").map(s => s.trim());
        setFormData({
          jobPostID: data.jobPostID,
          title: data.title,
          description: data.description,
          province,
          city,
          salary: data.salary,
          hours: data.hours,
          employer: { userID: data.employer.userID },
        });
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // build payload with combined location
      const payload = {
        ...formData,
        location: `${formData.city}, ${formData.province}`
      };
      const res = await apiFetch("http://localhost:8000/jobpost/upadatjobpost", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Error ${res.status}`);
      }
      navigate("/profile");
    } catch (e) {
      setError(e.message);
    }
  };

  if (loading) return <p>Loading job details…</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
      <div className="container mt-5">
        <h2 className="text-warning fw-bold">✏️ Edit Job Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
                className="form-control"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Location</label>
            <div className="d-flex gap-2">
              <select
                  className="form-select"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  required
              >
                <option value="">Select Province</option>
                {provinceOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                ))}
              </select>
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
                {formData.province && cityOptions[formData.province].map(c => (
                    <option key={c} value={c} />
                ))}
              </datalist>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Hours</label>
            <input
                type="number"
                className="form-control"
                name="hours"
                value={formData.hours}
                onChange={handleChange}
                required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Hourly Wage</label>
            <input
                type="number"
                step="0.01"
                className="form-control"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
                className="form-control"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
            />
          </div>

          <button type="submit" className="btn btn-success">
            Update
          </button>
        </form>
      </div>
  );
}

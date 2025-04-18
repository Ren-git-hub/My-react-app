import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import { apiFetch } from "../../api";

// Mapping from full province names (lowercase) to their abbreviations (lowercase)
const provinceMap = {
  "ontario": "on",
  "quebec": "qc",
  "british columbia": "bc",
  "alberta": "ab",
  "manitoba": "mb",
  "nova scotia": "ns",
};

// eslint-disable-next-line react/prop-types
const JobList = ({ searchKeyword }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all job posts from the backend with auth
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        console.log("Fetching job listings...");
        const response = await apiFetch("http://localhost:8000/jobpost/alljobpost");
        console.log("Job listings response status:", response.status);
        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Failed to fetch job listings: ${response.status} ${text}`);
        }
        const data = await response.json();
        console.log("Job listings data:", data);
        setJobs(data);
      } catch (err) {
        console.error("Error fetching job listings:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs locally based on search parameters
  let filteredJobs = jobs;
  if (searchKeyword && typeof searchKeyword === 'object') {
    const { keyword, location } = searchKeyword;

    // Filter by keyword (if provided)
    if (keyword && keyword.trim() !== "") {
      filteredJobs = filteredJobs.filter(
          (job) =>
              job.title.toLowerCase().includes(keyword.toLowerCase()) ||
              (job.description && job.description.toLowerCase().includes(keyword.toLowerCase()))
      );
    }

    // Filter by location (if provided)
    if (location && location.trim() !== "") {
      let searchParts = location.toLowerCase().split(",").map((s) => s.trim());

      if (searchParts[0] !== "any" && provinceMap[searchParts[0]]) {
        searchParts[0] = provinceMap[searchParts[0]];
      }

      filteredJobs = filteredJobs.filter((job) => {
        const jobParts = job.location.toLowerCase().split(",").map((s) => s.trim());
        return searchParts.every((part) => jobParts.includes(part));
      });
    }
  }

  if (loading) return <p className="text-center my-3">Loading job listings...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;

  return (
      <div className="container mt-4">
        <h2 className="fw-bold text-center text-primary">Available Jobs</h2>
        <div className="row g-4">
          {filteredJobs.map((job) => (
              <div key={job.jobPostID} className="col-lg-4 col-md-6">
                <JobCard {...job} />
              </div>
          ))}
        </div>
      </div>
  );
};

export default JobList;

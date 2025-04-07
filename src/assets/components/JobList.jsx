import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";

// Mapping from full province names (lowercase) to their abbreviations (lowercase)
const provinceMap = {
  "ontario": "on",
  "quebec": "qc",
  "british columbia": "bc",
  "alberta": "ab",
  "manitoba": "mb",
  "nova scotia": "ns",
};

const JobList = ({ searchKeyword }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Always fetch all job posts from the backend
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8000/jobpost/alljobpost");
        if (!response.ok) {
          throw new Error("Failed to fetch job listings");
        }
        const data = await response.json();
        setJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs locally based on search parameters
  let filteredJobs = jobs;
  if (searchKeyword) {
    const { keyword, location } = searchKeyword;

    // Filter by keyword (if provided)
    if (keyword && keyword.trim() !== "") {
      filteredJobs = filteredJobs.filter(
          (job) =>
              job.title.toLowerCase().includes(keyword.toLowerCase()) ||
              job.description.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    // Filter by location (if provided)
    if (location && location.trim() !== "") {
      // Split the search location string (e.g., "Ontario, Toronto")
      let searchParts = location.toLowerCase().split(",").map((s) => s.trim());

      // Map the province part to its abbreviation if applicable
      if (searchParts[0] !== "any" && provinceMap[searchParts[0]]) {
        searchParts[0] = provinceMap[searchParts[0]];
      }

      filteredJobs = filteredJobs.filter((job) => {
        // Assume job.location is stored as "City, ProvinceAbbr"
        const jobParts = job.location.toLowerCase().split(",").map((s) => s.trim());
        // Check that every part of the search is included in the job's location (order independent)
        return searchParts.every((part) => jobParts.includes(part));
      });
    }
  }

  if (loading)
    return <p className="text-center my-3">Loading job listings...</p>;
  if (error)
    return <p className="text-center text-danger">{error}</p>;

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

import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Use the updated endpoint from the backend
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

  if (loading)
    return <p className="text-center my-3">Loading job listings...</p>;
  if (error)
    return <p className="text-center text-danger">{error}</p>;

  return (
      <div className="container mt-4">
        <h2 className="fw-bold text-center text-primary">Available Jobs</h2>
        <div className="row g-4">
          {jobs.map((job) => (
              <div key={job.jobPostID} className="col-lg-4 col-md-6">
                <JobCard {...job} />
              </div>
          ))}
        </div>
      </div>
  );
};

export default JobList;

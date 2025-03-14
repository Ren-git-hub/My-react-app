import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:2025/job/joblist");
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

  if (loading) return <p>Loading job listings...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container my-3">
      <h2>Job Posts</h2>
      <div className="row">
        {jobs.map((job, index) => (
          <div key={index} className="col-md-4 my-4">
            <JobCard {...job} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;

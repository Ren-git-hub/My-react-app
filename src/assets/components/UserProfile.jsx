import React, { useEffect, useState } from "react";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [userJobs, setUserJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = 1; // Static user for now
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      await fetch(`http://localhost:2025/jobs/${id}`, {
        method: "DELETE"
      });
      setUserJobs(userJobs.filter(job => job.id !== id));
    }
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [userRes, jobsRes] = await Promise.all([
          fetch(`http://localhost:2025/users/${userId}`),
          fetch(`http://localhost:2025/jobs?userId=${userId}`),
        ]);

        const userData = await userRes.json();
        const jobsData = await jobsRes.json();

        setUser(userData);
        setUserJobs(jobsData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div className="text-center my-5">Loading...</div>;

  return (
    <div className="container my-5">
      {/* Profile */}
      <div className="row mb-4">
        <div className="col-lg-8 offset-lg-2 text-center">
          <h2 className="fw-bold text-primary">👤 User Profile</h2>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-lg-6 offset-lg-3">
          <div className="card shadow-sm border-0 p-4 rounded-4">
            <h4 className="fw-bold mb-3">{user.name}</h4>
            <p className="mb-1 text-muted">📧 {user.email}</p>
            <p className="mb-1 text-muted">📍 {user.city}, {user.province}</p>
            <p className="mt-3">{user.bio}</p>
          </div>
        </div>
      </div>

      {/* Job Posts */}
      <div className="row mb-4">
        <div className="col-lg-8 offset-lg-2">
          <h3 className="text-primary fw-bold mb-3">🛠 Jobs You've Posted</h3>
        </div>
        {userJobs.map((job) => (
          <div key={job.id} className="col-lg-8 offset-lg-2 mb-3">
            <div className="card shadow-sm border-0 p-3 rounded-4">

              <h5 className="fw-bold text-dark">{job.title}</h5>
              <p className="text-muted mb-1">📍 {job.location}</p>
              <p className="text-muted mb-1">
                ⏱ {job.hours} hours • 💵 ${job.wage}/hr
              </p>
              <p className="text-warning mb-0">📝 {job.note}</p>
              <button className="btn btn-outline-danger btn-sm mt-2" onClick={() => handleDelete(job.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;

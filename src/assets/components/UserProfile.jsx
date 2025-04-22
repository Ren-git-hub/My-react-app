import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../api";

function UserProfile() {
    const [profile, setProfile] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            try {
                // 1) Fetch user profile
                const respProfile = await apiFetch("http://localhost:8000/user/me");
                if (!respProfile.ok) throw new Error(`Could not load profile (${respProfile.status})`);
                const userData = await respProfile.json();
                setProfile(userData);

                // 2) Fetch all jobs, filter to those posted by this user
                const respJobs = await apiFetch("http://localhost:8000/jobpost/alljobpost");
                if (!respJobs.ok) throw new Error(`Could not load jobs (${respJobs.status})`);
                const allJobs = await respJobs.json();
                const myJobs = allJobs.filter(j => j.employer?.userID === userData.userID);
                setJobs(myJobs);
            } catch (e) {
                console.error("UserProfile error:", e);
                setError(e.message);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this job?")) return;
        try {
            const res = await apiFetch(
                `http://localhost:8000/jobpost/deletejobpost/${id}`,
                { method: "DELETE" }
            );
            if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
            setJobs(jobs.filter(job => job.jobPostID !== id));
        } catch (e) {
            console.error("Error deleting job:", e);
            alert(e.message);
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    if (loading) return <p className="text-center my-5">Loading profile...</p>;
    if (error) return <p className="text-center text-danger">{error}</p>;

    return (
        <div className="container my-5">
            {/* Profile Info */}
            <div className="card p-4 mb-5 shadow-sm rounded-4">
                <h2 className="fw-bold text-primary mb-3">
                    👤 {profile.fullName || profile.username}
                </h2>
                <p className="mb-1"><strong>Username:</strong> {profile.username}</p>
                <p className="mb-1"><strong>Email:</strong> {profile.email}</p>
                {profile.phone && <p className="mb-1"><strong>Phone:</strong> {profile.phone}</p>}
            </div>

            {/* User's Jobs */}
            <h3 className="fw-bold text-secondary mb-3">🛠 Jobs You’ve Posted</h3>
            {jobs.length === 0 ? (
                <p>No jobs posted yet.</p>
            ) : (
                jobs.map(job => (
                    <div key={job.jobPostID} className="card p-3 mb-3 shadow-sm rounded-4">
                        <h4 className="fw-bold">{job.title}</h4>
                        <p className="text-muted mb-1">Location: {job.location}</p>
                        <p className="text-muted mb-1">Wage: ${job.salary}</p>
                        <p className="text-muted mb-1">
                            Posted: {new Date(job.postDate).toLocaleDateString()}
                        </p>
                        <div className="mt-2">
                            <button
                                className="btn btn-sm btn-outline-primary me-2"
                                onClick={() => handleEdit(job.jobPostID)}
                            >
                                Edit
                            </button>
                            <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDelete(job.jobPostID)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default UserProfile;

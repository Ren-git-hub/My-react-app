import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

function JobPostEditForm() {
  const { id } = useParams();
  const [formData, setFormData] = useState(null);
  const history = useHistory();

  useEffect(() => {
    fetch(`http://localhost:8000/jobs/${id}`)
      .then(res => res.json())
      .then(data => setFormData(data));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:8000/jobs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    history.push("/profile"); // or redirect elsewhere
  };

  if (!formData) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <h2 className="text-warning fw-bold">✏️ Edit Job Post</h2>
      <form onSubmit={handleUpdate}>
        <input className="form-control mb-3" name="title" value={formData.title} onChange={handleChange} />
        <input className="form-control mb-3" name="location" value={formData.location} onChange={handleChange} />
        <input className="form-control mb-3" name="hours" value={formData.hours} onChange={handleChange} />
        <input className="form-control mb-3" name="wage" value={formData.wage} onChange={handleChange} />
        <textarea className="form-control mb-3" name="note" value={formData.note} onChange={handleChange} />
        <button className="btn btn-success">Update</button>
      </form>
    </div>
  );
}

export default JobPostEditForm;

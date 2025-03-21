import React from "react";
import PropTypes from "prop-types";

const JobCard = ({ title, hours, wage, specialNote, email }) => {
  return (
    <div
      className="card border-0 shadow-sm p-4 rounded-4"
      style={{
        background: "#fff",
        transition: "transform 0.3s ease-in-out",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <div className="card-body">
        <h5 className="fw-bold text-primary">{title} Wanted</h5>
        <p className="text-muted">
          <strong>{hours} hours</strong> | Hourly wage:{" "}
          <span className="fw-bold text-success">${wage}</span>
        </p>
        <p className="text-warning fw-semibold">{specialNote}</p>
        <p className="text-muted small">📧 {email}</p>

        <div className="d-flex gap-3 mt-3">
          <button
            className="btn"
            style={{
              background: "linear-gradient(135deg, #6a11cb, #2575fc)",
              color: "white",
              borderRadius: "25px",
              padding: "8px 20px",
              fontWeight: "bold",
            }}
          >
            Accept
          </button>
          <button
            className="btn btn-outline-secondary"
            style={{
              borderRadius: "25px",
              padding: "8px 20px",
            }}
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

JobCard.propTypes = {
  title: PropTypes.string.isRequired,
  hours: PropTypes.number.isRequired,
  wage: PropTypes.number.isRequired,
  specialNote: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default JobCard;

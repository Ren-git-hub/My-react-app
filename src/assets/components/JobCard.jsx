import React from "react";
import PropTypes from "prop-types";

const JobCard = ({ title, description, location, salary, post_date, employer }) => {
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
          <h5 className="fw-bold text-primary">{title}</h5>
          <p className="text-muted">{description}</p>
          <p className="text-secondary">Location: {location}</p>
          <p className="text-success fw-bold">Salary: ${salary}</p>
          <p className="text-muted small">
            Posted on: {new Date(post_date).toLocaleDateString()}
          </p>
          {employer && (
              <p className="text-muted small">
                Employer: {employer.fullName || employer.username}
              </p>
          )}
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
  description: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  salary: PropTypes.number.isRequired,
  post_date: PropTypes.string.isRequired,
  employer: PropTypes.object,
};

export default JobCard;

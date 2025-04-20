import React, { useState } from "react";
import PropTypes from "prop-types";

const JobCard = ({ title, description, location, salary, postDate, hours, employer }) => {
    const [showContact, setShowContact] = useState(false);

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
                <p className="text-success fw-bold">Hourly Wage: ${salary}</p>
                <p className="text-muted small">
                    Posted on: {new Date(postDate).toLocaleDateString()}
                </p>
                <p className="text-muted small">Hours: {hours}</p>
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
                        onClick={() => setShowContact(!showContact)}
                    >
                        Contact Employer
                    </button>
                </div>

                {showContact && employer && (
                    <div className="mt-3 text-muted small">
                        {employer.email && <p>Email: {employer.email}</p>}
                        {employer.phone && <p>Phone: {employer.phone}</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

JobCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    salary: PropTypes.number.isRequired,
    postDate: PropTypes.string.isRequired,
    hours: PropTypes.number.isRequired,
    employer: PropTypes.shape({
        fullName: PropTypes.string,
        username: PropTypes.string,
        email: PropTypes.string,
        phone: PropTypes.string,
    }),
};

export default JobCard;

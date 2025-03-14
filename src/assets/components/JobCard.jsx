import React from "react";

const JobCard = ({ title, hours, wage, specialNote, email }) => {
  return (
    <>
      <div className="bg-gray-800 p-4 rounded-2xl shadow-lg text-white w-64">
        <h3 className="mt-4 text-primary font-semibold">{title} Wanted</h3>
        <p className="text-secondary">{hours} hours</p>
        <p className="text-secondary">Hourly wage: ${wage}</p>
        <p className="text-secondary text-warning">
          Special specialNote: {specialNote}
        </p>
        <p className="text-secondary">Email: {email}</p>

        <div>
          <button type="button" className="btn btn-primary mx-2">
            Accept
          </button>
          <button type="button" className="btn btn-secondary mx-2">
            Read more
          </button>
        </div>
      </div>
    </>
  );
};

export default JobCard;

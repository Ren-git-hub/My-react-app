import React from "react";
import JobCard from "./JobCard";

const JobList = () => {
  const jobs = [
    {
      jobName: "Snow cleaner",
      hours: 40,
      hourlyWage: 50,
      note: "Please do salting too",
      email: "UncleBob@test.com",
    },
    {
      jobName: "Lown care / Landscaping",
      hours: 30,
      hourlyWage: 35,
      note: "Do not forget leaf blowing",
      email: "Xyz@test.com",
    },
    {
      jobName: "Roof cleaner",
      hours: 25,
      hourlyWage: 30,
      note: "Thank you in advance",
      email: "Tom@test.com",
    },
    {
      jobName: "Handyman",
      hours: 15,
      hourlyWage: 25,
      note: "tools will be provided, experience in drywall preffered",
      email: "John@test.com",
    },
    {
      jobName: "Beby sitting",
      hours: 25,
      hourlyWage: 20,
      note: "female preffred",
      email: "Zack@test.com",
    },
    {
      jobName: "Dog walking",
      hours: 2,
      hourlyWage: 18,
      note: "must be friendly with pet",
      email: "PetFriend@test.com",
    },
  ];

  return (
    <>
      <div className="container my-3">
        <h2>Job Posts</h2>
        <div className="row">
          {jobs.map((job, index) => (
            <div className="col-md-4 my-4">
              <JobCard key={index} {...job} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default JobList;

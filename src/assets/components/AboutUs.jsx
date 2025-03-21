import React from "react";

const AboutUS = () => {
  return (
    <div className="container mt-5">
      {/* Intro */}
      <div className="row justify-content-center">
        <div className="col-lg-8 text-center">
          <h2 className="fw-bold text-primary">About Us</h2>
          <p className="text-muted">
            Welcome to <strong>Husband 4 Hire</strong>, your trusted platform for hiring skilled freelancers
            for short-term and gig-based jobs. Our mission is to connect job seekers with employers
            seamlessly while ensuring secure transactions and quality work.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="row mt-5">
        <div className="col-md-6">
          <div className="card shadow-sm border-0 p-4 rounded-4">
            <h4 className="text-primary fw-bold">🎯 Our Mission</h4>
            <p className="text-muted">
              We aim to create a user-friendly and secure job-seeking platform where
              freelancers and businesses can connect effortlessly.
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm border-0 p-4 rounded-4">
            <h4 className="text-primary fw-bold">🚀 Our Vision</h4>
            <p className="text-muted">
              To become the go-to marketplace for skilled workers and employers
              worldwide, making hiring faster, easier, and more reliable.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="row mt-5 text-center">
        <div className="col-md-12">
          <h3 className="fw-bold text-primary">Why Choose Us?</h3>
        </div>
        <div className="col-md-4 mt-4">
          <div className="card shadow-sm border-0 p-4 rounded-4">
            <h5 className="text-success fw-bold">✅ Secure Payments</h5>
            <p className="text-muted">
              We ensure all transactions are secure and protected, providing peace of mind.
            </p>
          </div>
        </div>
        <div className="col-md-4 mt-4">
          <div className="card shadow-sm border-0 p-4 rounded-4">
            <h5 className="text-success fw-bold">🌎 Global Reach</h5>
            <p className="text-muted">
              Connect with freelancers and employers from all over the world.
            </p>
          </div>
        </div>
        <div className="col-md-4 mt-4">
          <div className="card shadow-sm border-0 p-4 rounded-4">
            <h5 className="text-success fw-bold">🕒 Fast Hiring Process</h5>
            <p className="text-muted">
              Our platform streamlines job posting and applications for quick hiring.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="row mt-5">
        <div className="col-md-12 text-center">
          <h3 className="fw-bold text-primary">💬 What Our Users Say</h3>
        </div>

        <div className="col-md-4 mt-4">
          <div className="card border-0 shadow-sm p-4 rounded-4 h-100">
            <p className="text-muted fst-italic">
              "I found a last-minute handyman through Husband 4 Hire and it saved my day.
              The process was seamless and secure!"
            </p>
            <h6 className="fw-bold mt-3 mb-0 text-secondary">— Jessica M.</h6>
            <small className="text-muted">Homeowner, Ottawa</small>
          </div>
        </div>

        <div className="col-md-4 mt-4">
          <div className="card border-0 shadow-sm p-4 rounded-4 h-100">
            <p className="text-muted fst-italic">
              "As a freelancer, I love how easy it is to find short gigs and get paid quickly. This platform changed my career."
            </p>
            <h6 className="fw-bold mt-3 mb-0 text-secondary">— Ahmed B.</h6>
            <small className="text-muted">Plumber, Montreal</small>
          </div>
        </div>

        <div className="col-md-4 mt-4">
          <div className="card border-0 shadow-sm p-4 rounded-4 h-100">
            <p className="text-muted fst-italic">
              "This is one of the most efficient platforms we've used to find temporary staff. Highly recommended!"
            </p>
            <h6 className="fw-bold mt-3 mb-0 text-secondary">— Clara S.</h6>
            <small className="text-muted">Business Owner, Toronto</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUS;

import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext"; 
import "../styles/Jobs.css";

const jobListings = [
  {
    id: 1,
    title: "Construction Engineer",
    location: "Tirana, Albania",
    description:
      "We are looking for a construction engineer to lead new projects and ensure the quality of work.",
    link: "/jobs/construction-engineer",
  },
  {
    id: 2,
    title: "Construction Worker",
    location: "Tirana, Albania",
    description:
      "We are seeking qualified workers to work on various construction projects.",
    link: "/jobs/construction-worker",
  },
  {
    id: 3,
    title: "Construction Foreman",
    location: "Tirana, Albania",
    description:
      "We need a construction foreman to lead the construction team and manage materials.",
    link: "/jobs/construction-foreman",
  },
  {
    id: 4,
    title: "Construction Archaeologist",
    location: "Tirana, Albania",
    description:
      "We are looking for an archaeologist to monitor construction projects and ensure the preservation of cultural heritage.",
    link: "/jobs/construction-archaeologist",
  },
  {
    id: 5,
    title: "Architectural Designer",
    location: "Tirana, Albania",
    description:
      "We need an architectural designer to draft plans and sketches for construction projects.",
    link: "/jobs/architectural-designer",
  },
  {
    id: 6,
    title: "Project Coordinator",
    location: "Tirana, Albania",
    description:
      "We are looking for a project coordinator to manage and organize resources for construction projects.",
    link: "/jobs/project-coordinator",
  },
  {
    id: 7,
    title: "Structural Engineer",
    location: "Tirana, Albania",
    description:
      "We are looking for a structural engineer to develop plans and calculations for various construction structures.",
    link: "/jobs/structural-engineer",
  },
  {
    id: 8,
    title: "Installation Foreman",
    location: "Tirana, Albania",
    description:
      "We are seeking an installation foreman to manage and carry out installation work on construction projects.",
    link: "/jobs/installation-foreman",
  },
];


function Jobs() {
  const { user } = useContext(AuthContext); 
  const [searchTerm, setSearchTerm] = useState("");
  const [applications, setApplications] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  const filteredJobs = jobListings.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (filteredJobs.length === 0) setShowMessage(true);
    else setShowMessage(false);
  }, [searchTerm, filteredJobs]);

  useEffect(() => {
    const fetchApplications = async () => {
      if (!user || user.email === "erahidaj@gmail.com") return; 

      try {
        const response = await fetch(
          `http://localhost/kompani-ndertimi/api/get-application.php?email=${user.email}`
        );
        const data = await response.json();
        if (data.success) setApplications(data.applications);
        else setApplications([]);
      } catch (error) {
        console.error("Error fetching applications:", error);
        setApplications([]);
      }
    };

    fetchApplications();
  }, [user]);

  const handleApplyNow = (jobTitle) => {
    navigate("/application", { state: { jobTitle } });
  };

  return (
    <div>
      <Header />

      <div className="search-container">
        <input
          type="text"
          placeholder="Build Your Future: Explore Exciting Construction Careers"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <h2>Available Construction Jobs</h2>
      <div className="job-listings">
        {filteredJobs.map((job) => (
          <div className="job-card" key={job.id}>
            <h3>{job.title}</h3>
            <p>{job.location}</p>
            <p>{job.description}</p>
            <button
              onClick={() => handleApplyNow(job.title)}
              className="apply-button"
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>

      {showMessage && (
        <div className="no-jobs-message">
          <p>No jobs found for your search term.</p>
        </div>
      )}
      {user?.email !== "erahidaj@gmail.com" && (
        <div className="applications-section">
          <h2>Your Applications:</h2>
          {applications.length > 0 ? (
            applications.map((app, index) => {
              const differenceInDays = Math.floor(
                (new Date() - new Date(app.created_at)) / (1000 * 3600 * 24)
              );
              const status = differenceInDays <= 30 ? "Pending" : "Closed";
              const statusClass = status === "Pending" ? "pending" : "closed";

              return (
                <div key={index} className="application-card">
                  <h3><strong>{app.name || "N/A"}</strong></h3>
                  <p><strong>Job Title:</strong> {app.jobTitle || "N/A"}</p>
                  <p>
                    <strong>Applied on:</strong>{" "}
                    {app.created_at
                      ? new Date(app.created_at).toLocaleDateString()
                      : "N/A"}
                  </p>
                  <p className={`status ${statusClass}`}>
                    <strong>Status:</strong> {status}
                  </p>
                </div>
              );
            })
          ) : (
            <p>You have not applied to any jobs yet.</p>
          )}
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Jobs;
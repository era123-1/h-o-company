import React from "react";
import Header from "../../components/Header";  
import Footer from "../../components/Footer";
import "../../styles/Projects.css";              
import tiranaCielo from "../../assets/images/project-image1.png";
import samiFrasheri from "../../assets/images/project-image2.png";
import lakeView from "../../assets/images/project-image3.png";
import deltaResidence from "../../assets/images/project-image4.png";
import katedraljaRingjallja from "../../assets/images/project-image5.png";
import hotelLuaniArte from "../../assets/images/project-image6.png";
import spaWellness from "../../assets/images/project-image7.png";
import aeroportiNeneTereza from "../../assets/images/project-image8.png";

const projects = [
  {
    id: 1,
    title: "TIRANA CIELO",
    description: "Residential Complex in Mjull Bathore near TEG.",
    image: tiranaCielo,
  },
  {
    id: 2,
    title: "SAMI FRASHERI",
    description: "Renovation near the center of Tirana.",
    image: samiFrasheri,
  },
  {
    id: 3,
    title: "LAKE VIEW",
    description: "High-standard building in Tirana.",
    image: lakeView,
  },
  {
    id: 4,
    title: "DELTA RESIDENCE",
    description: "High-standard building in Tirana.",
    image: deltaResidence,
  },
  {
    id: 5,
    title: "KATEDRALJA RINGJALLJA E KRISHTIT",
    description: "New Orthodox Church in the center of Tirana.",
    image: katedraljaRingjallja,
  },
  {
    id: 6,
    title: "HOTEL LUANI ARTE",
    description:
      "The 5-story hotel was built in the city of Shkodra with high standards...",
    image: hotelLuaniArte,
  },
  {
    id: 7,
    title: "“LUANI A” SPA & WELLNESS CENTER",
    description:
      "The building is located in the city of Shkodra, with high standards...",
    image: spaWellness,
  },
  {
    id: 8,
    title: "AEROPORTI NENE TEREZA",
    description:
      'The international airport "Nënë Tereza" is the airport of ...',
    image: aeroportiNeneTereza,
  },
];

function Projects() {
  return (
    <div>
      {/* Header Section */}
      <Header />

      {/* Content */}
      <section className="projects-section">
        <h2>OUR PROJECTS</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <img
                src={project.image}
                alt={project.title}
                className="project-image"
              />
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <button className="see-more-button">See More</button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Projects;
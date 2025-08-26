import React from "react";
import "../../styles/Materials.css";
import woodImage from "../../assets/images/wood.jpg";
import concreteImage from "../../assets/images/concrete.jpg";
import steelImage from "../../assets/images/steel.jpg";
import glassImage from "../../assets/images/glass.jpg";
import tilesImage from "../../assets/images/tiles.jpg";
import graniteImage from "../../assets/images/granite.jpg";
import brickImage from "../../assets/images/brick.jpg";
import marbleImage from "../../assets/images/marble.jpg";
import aluminumImage from "../../assets/images/aluminum.jpg";
import pvcImage from "../../assets/images/pvc.jpg";
import sandImage from "../../assets/images/sand.jpg";
import cementImage from "../../assets/images/cement.jpg";
import plasterboardImage from "../../assets/images/plasterboard.jpg";
import asphaltImage from "../../assets/images/asphalt.jpg";
import insulationImage from "../../assets/images/insulation.jpg";
import roofingImage from "../../assets/images/roofing.jpg";
import adhesivesImage from "../../assets/images/adhesives.jpg";
import ceramicsImage from "../../assets/images/ceramics.jpg";
import gypsumImage from "../../assets/images/gypsum.jpg";
import paintsImage from "../../assets/images/paints.jpg";
import pipesImage from "../../assets/images/pipes.jpg";
import electricalImage from "../../assets/images/electrical.jpg";
import timberImage from "../../assets/images/timber.jpg";
import stoneImage from "../../assets/images/stone.jpg";
import metalSheetsImage from "../../assets/images/metal-sheets.jpg";
import compositeImage from "../../assets/images/composite.jpg";
import fiberCementImage from "../../assets/images/fiber-cement.jpg";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
const Materials = () => {
  const materials = [
    {
      name: "Wood",
      image: woodImage,
      description:
        "Premium quality wood for construction and design, offering durability and aesthetic appeal.",
    },
    {
      name: "Concrete",
      image: concreteImage,
      description:
        "High-grade concrete for strong foundations and sustainable structures.",
    },
    {
      name: "Steel",
      image: steelImage,
      description:
        "Robust and corrosion-resistant steel for architectural and industrial applications.",
    },
    {
      name: "Glass",
      image: glassImage,
      description:
        "Crystal-clear glass for modern and sleek designs, ensuring durability and style.",
    },
    {
      name: "Tiles",
      image: tilesImage,
      description:
        "Elegant tiles with diverse patterns, perfect for interior and exterior spaces.",
    },
    {
      name: "Granite",
      image: graniteImage,
      description:
        "Durable and elegant granite for countertops, flooring, and other construction needs.",
    },
    {
      name: "Brick",
      image: brickImage,
      description:
        "Reliable and affordable bricks for traditional and modern building projects.",
    },
    {
      name: "Marble",
      image: marbleImage,
      description:
        "Luxurious marble for sophisticated interiors and exteriors.",
    },
    {
      name: "Aluminum",
      image: aluminumImage,
      description:
        "Lightweight and versatile aluminum for construction and design.",
    },
    {
      name: "PVC",
      image: pvcImage,
      description:
        "Cost-effective and durable PVC for pipes, windows, and more.",
    },
    {
      name: "Sand",
      image: sandImage,
      description: "Clean and fine sand ideal for masonry and plastering.",
    },
    {
      name: "Cement",
      image: cementImage,
      description: "High-quality cement for strong and durable structures.",
    },
    {
      name: "Plasterboard",
      image: plasterboardImage,
      description:
        "Efficient and easy-to-install plasterboard for walls and ceilings.",
    },
    {
      name: "Asphalt",
      image: asphaltImage,
      description:
        "Reliable asphalt for durable and smooth roads and pavements.",
    },
    {
      name: "Insulation Materials",
      image: insulationImage,
      description:
        "Thermal and acoustic insulation for energy-efficient buildings.",
    },
    {
      name: "Roofing Materials",
      image: roofingImage,
      description:
        "Durable and weather-resistant roofing materials for all building types.",
    },
    {
      name: "Adhesives & Sealants",
      image: adhesivesImage,
      description:
        "High-quality adhesives and sealants for secure bonding and sealing.",
    },
    {
      name: "Ceramics",
      image: ceramicsImage,
      description:
        "Aesthetic and durable ceramics for interior and exterior applications.",
    },
    {
      name: "Gypsum",
      image: gypsumImage,
      description:
        "Versatile gypsum for walls, ceilings, and decorative applications.",
    },
    {
      name: "Paints & Coatings",
      image: paintsImage,
      description:
        "Wide range of paints and coatings for protective and decorative finishes.",
    },
    {
      name: "Pipes & Plumbing Materials",
      image: pipesImage,
      description:
        "Durable pipes and fittings for water supply and drainage systems.",
    },
    {
      name: "Electrical Materials",
      image: electricalImage,
      description:
        "Cables, switches, and other electrical materials for residential and industrial use.",
    },
    {
      name: "Timber",
      image: timberImage,
      description:
        "Natural and engineered timber for construction and furniture.",
    },
    {
      name: "Stone",
      image: stoneImage,
      description: "Natural stone for landscaping, paving, and structural use.",
    },
    {
      name: "Metal Sheets",
      image: metalSheetsImage,
      description:
        "High-quality metal sheets for roofing and industrial applications.",
    },
    {
      name: "Composite Materials",
      image: compositeImage,
      description:
        "Innovative composite materials for strength and lightweight construction.",
    },
    {
      name: "Fiber Cement Boards",
      image: fiberCementImage,
      description:
        "Durable and fire-resistant fiber cement boards for walls and cladding.",
    },
  ];

  return (
    <div>
      <Header />
      <div className="materials-container">
        <h1 className="materials-title">Explore Our Materials</h1>
        <p className="materials-intro">
          Discover the finest materials designed to meet the highest standards
          of quality and innovation. Choose materials that make your projects
          exceptional.
        </p>
        <div className="materials-grid">
          {materials.map((material, index) => (
            <div key={index} className="material-card">
              <img
                src={material.image}
                alt={material.name}
                className="material-image"
              />
              <div className="material-details">
                <h2 className="material-name">{material.name}</h2>
                <p className="material-description">{material.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Materials;
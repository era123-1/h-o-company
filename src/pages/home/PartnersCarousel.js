import React, { useEffect, useRef } from "react";
import image1p from "../../assets/images/image1p.png";
import image2p from "../../assets/images/image2p.png";
import image3p from "../../assets/images/image3p.png";
import image4p from "../../assets/images/image4p.png";
import image5p from "../../assets/images/image5p.png";
import image6p from "../../assets/images/image6p.png";

const images = [
  { src: image1p, alt: "Partner 1" },
  { src: image2p, alt: "Partner 2" },
  { src: image3p, alt: "Partner 3" },
  { src: image4p, alt: "Partner 4" },
  { src: image5p, alt: "Partner 5" },
  { src: image6p, alt: "Partner 6" },
];

const PartnersCarousel = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let scrollPos = 0;

    const scroll = () => {
      scrollPos += 1; // control speed
      if (scrollPos >= container.scrollWidth / 2) scrollPos = 0;
      container.scrollLeft = scrollPos;
      requestAnimationFrame(scroll);
    };

    const animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId); // cleanup
  }, []);

  return (
    <section className="partners-section">
      <div className="partners-container-wrapper" ref={containerRef}>
        <div className="partners-container">
          {images.concat(images).map((img, index) => (
            <div className="partner-item" key={index}>
              <img src={img.src} alt={img.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersCarousel;

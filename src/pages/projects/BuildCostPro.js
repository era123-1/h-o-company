import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../../styles/BuildCostPro.css";
import BuildCostImage from "../../assets/images/buildcostimage.png";

const objectTypes = [
  { id: 1, type: "Residential", qualityPrices: { first: 100, second: 90, third: 80 }, workerCost: 20, transportCost: 10, discount: 5, tax: 18 },
  { id: 2, type: "House", qualityPrices: { first: 120, second: 110, third: 100 }, workerCost: 25, transportCost: 12, discount: 7, tax: 20 },
  { id: 3, type: "Commercial", qualityPrices: { first: 150, second: 140, third: 130 }, workerCost: 30, transportCost: 15, discount: 10, tax: 22 },
  { id: 4, type: "Industrial", qualityPrices: { first: 200, second: 180, third: 170 }, workerCost: 35, transportCost: 20, discount: 12, tax: 25 },
];

const BuildCostPro = () => {
  const [objectType, setObjectType] = useState("");
  const [area, setArea] = useState("");
  const [selectedQuality, setSelectedQuality] = useState("first");
  const navigate = useNavigate();

  // Options për react-select
  const objectOptions = objectTypes.map(obj => ({ value: obj.type, label: obj.type }));
  const qualityOptions = [
    { value: "first", label: "First Quality" },
    { value: "second", label: "Second Quality" },
    { value: "third", label: "Third Quality" },
  ];

  const selectedObject = objectTypes.find(obj => obj.type === objectType);
  const selectedPrice = selectedObject ? selectedObject.qualityPrices[selectedQuality] : 0;
  const workerCost = selectedObject ? selectedObject.workerCost * Number(area || 0) : 0;
  const transportCost = selectedObject ? selectedObject.transportCost * Number(area || 0) : 0;
  const discount = selectedObject ? selectedObject.discount : 0;
  const tax = selectedObject ? selectedObject.tax : 0;

  const totalCost = useMemo(() => {
    if (!selectedObject || !area || area <= 0) return null;
    let subtotal = Number(area) * selectedPrice + workerCost + transportCost;
    subtotal += (subtotal * tax) / 100;
    subtotal -= (subtotal * discount) / 100;
    return subtotal;
  }, [selectedPrice, workerCost, transportCost, discount, tax, area, selectedObject]);

  const handlePurchase = () => {
    if (!localStorage.getItem("user")) {
      alert("You need to be logged in to make a purchase.");
      navigate("/reviews");
      return;
    }
    localStorage.setItem("totalCost", totalCost);
    localStorage.setItem("objectType", objectType);
    localStorage.setItem("area", area);
    navigate("/payments", { state: { totalCost, objectType, area } });
  };

  return (
    <div className="page-wrap">
      <Header />
      <main className="container-section">
        <section className="intro-section" aria-labelledby="intro-title">
          <div className="intro-tagline">
            <h2 id="intro-title">🏗️ Plan smarter, build better.</h2>
            <p>Estimate your construction costs in seconds – transparent, easy, and reliable.</p>
          </div>

          <div className="fact-card">
            <div className="fact-box">
              <h4>💡 Did you know?</h4>
              <p>On average, construction costs can vary up to <strong>30%</strong> depending on quality and location.</p>
            </div>

            <div className="card">
              <h3>Welcome to BuildCostPro</h3>
              <ul>
                <li><strong>Step 1:</strong> Choose the object type.</li>
                <li><strong>Step 2:</strong> Enter the area.</li>
                <li><strong>Step 3:</strong> Select the quality and review auto-filled costs.</li>
                <li><strong>Step 4:</strong> Calculate the total cost.</li>
              </ul>
            </div>
          </div>

          <img src={BuildCostImage} alt="Project example" className="buildcostimage" />
        </section>

        <aside className="container-cost" aria-labelledby="calc-title">
          <h2 id="calc-title" className="title">BuildCostPro</h2>

          <div className="formGroup">
            <label className="label">Object Type:</label>
            <Select
              value={objectOptions.find(opt => opt.value === objectType)}
              onChange={option => setObjectType(option.value)}
              options={objectOptions}
              menuPlacement="auto"
              menuPortalTarget={document.body}
              styles={{
                menuPortal: base => ({ ...base, zIndex: 9999 }),
                control: base => ({ ...base, borderRadius: 8, borderColor: "#e6e7ea" }),
              }}
            />
          </div>

          <div className="formGroup">
            <label htmlFor="area" className="label">Area (m²):</label>
            <input
              type="number"
              id="area"
              className="input"
              value={area}
              onChange={e => setArea(e.target.value)}
              placeholder="Enter total area"
              min="0"
            />
          </div>

          <div className="formGroup">
            <label className="label">Quality:</label>
            <Select
              value={qualityOptions.find(opt => opt.value === selectedQuality)}
              onChange={option => setSelectedQuality(option.value)}
              options={qualityOptions}
              menuPlacement="auto"
              menuPortalTarget={document.body}
              styles={{
                menuPortal: base => ({ ...base, zIndex: 9999 }),
                control: base => ({ ...base, borderRadius: 8, borderColor: "#e6e7ea",  background: "#f5f5f5", }),
      
              }}
            />
          </div>

          <div className="grid-2">
            <div className="formGroup small">
              <label>Price / m² (€):</label>
              <input type="number" className="input" value={selectedPrice} readOnly />
            </div>
            <div className="formGroup small">
              <label>Worker / m² (€):</label>
              <input type="number" className="input" value={selectedObject?.workerCost || 0} readOnly />
            </div>
          </div>

          <div className="grid-2">
            <div className="formGroup small">
              <label>Transport / m² (€):</label>
              <input type="number" className="input" value={selectedObject?.transportCost || 0} readOnly />
            </div>
            <div className="formGroup small">
              <label>Discount (%):</label>
              <input type="number" className="input" value={discount} readOnly />
            </div>
          </div>

          <div className="formGroup">
            <label>Tax (%):</label>
            <input type="number" className="input" value={tax} readOnly />
          </div>

          {totalCost !== null && (
            <div className="result">
              <h3>Total Estimated Cost</h3>
              <p className="big">€{totalCost.toFixed(2)}</p>
              <button onClick={handlePurchase} className="button primary">Buy Project</button>
            </div>
          )}
        </aside>
      </main>
      <Footer />
    </div>
  );
};

export default BuildCostPro;
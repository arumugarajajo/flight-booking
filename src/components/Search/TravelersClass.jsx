import React, { useEffect, useState } from "react";
import "./Travelers.css";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

const TravelersClass = ({
  setTravelerClassVisible,
  adultsCount: initialAdultsCount,
  childsCount: initialChildsCount,
  infantsCount: initialInfantsCount,
  setAdultsCount,
  setChildsCount,
  setInfantsCount,
  setClassType,
}) => {
  const [adultsCount, setLocalAdultsCount] = useState(initialAdultsCount);
  const [childsCount, setLocalChildsCount] = useState(initialChildsCount);
  const [infantsCount, setLocalInfantsCount] = useState(initialInfantsCount);
  const [warning, setWarning] = useState(false);

  useEffect(() => {
    const totalCount = adultsCount + childsCount + infantsCount;
    if (totalCount >= 9) {
      setWarning(true);
    } else {
      setWarning(false);
    }
  }, [adultsCount, childsCount, infantsCount]);

  const handleDoneClick = () => {
    setAdultsCount(adultsCount);
    setChildsCount(childsCount);
    setInfantsCount(infantsCount);
    setTravelerClassVisible(false);
  };

  const handleIncrement = (setState, count) => {
    if (count < 9) {
      setState(count + 1);
    }
  };

  const handleDecrement = (setState, count) => {
    if (count > 0) {
      setState(count - 1);
    }
  };

  const handleAdultIncrement = () => {
    if (!warning) {
      handleIncrement(setLocalAdultsCount, adultsCount);
    }
  };

  const handleAdultDecrement = () => {
    handleDecrement(setLocalAdultsCount, adultsCount);
  };

  const handleChildIncrement = () => {
    if (!warning) {
      handleIncrement(setLocalChildsCount, childsCount);
    }
  };

  const handleChildDecrement = () => {
    handleDecrement(setLocalChildsCount, childsCount);
  };

  const handleInfantIncrement = () => {
    if (!warning) {
      handleIncrement(setLocalInfantsCount, infantsCount);
    }
  };

  const handleInfantDecrement = () => {
    handleDecrement(setLocalInfantsCount, infantsCount);
  };
  return (
    <div className="travelers">
      <div className="top">
        <div className="adults classCategory">
          <h4>Adults</h4>
          <p>(Aged 12+ yrs)</p>
          <div className={!warning ? "counts" : "counts counts_warning"}>
            <span>
              <FaMinus onClick={handleAdultDecrement} />
            </span>
            <span className="countChange">{adultsCount}</span>
            <span>
              <FaPlus onClick={handleAdultIncrement} />
            </span>
          </div>
        </div>
        <div className="children classCategory">
          <h4>Children</h4>
          <p>(Aged 2-12 yrs)</p>
          <div className={!warning ? "counts" : "counts counts_warning"}>
            <span>
              <FaMinus onClick={handleChildDecrement} />
            </span>
            <span className="countChange">{childsCount}</span>
            <span>
              <FaPlus onClick={handleChildIncrement} />
            </span>
          </div>
        </div>
        <div className="infants classCategory">
          <h4>Infants Count</h4>
          <p>(Below 2 yrs)</p>
          <div className={!warning ? "counts" : "counts counts_warning"}>
            <span>
              <FaMinus onClick={handleInfantDecrement} />
            </span>
            <span className="countChange">{infantsCount}</span>
            <span>
              <FaPlus onClick={handleInfantIncrement} />
            </span>
          </div>
        </div>
      </div>
      <div className="bottoms-Section">
        <h4>Travel Class</h4>
        <div className="classType-btns">
          <button
            id="activeClass"
            className="classtype-btn"
            onClick={() => setClassType("Economy")}
          >
            Economy
          </button>
          <button
            className="classtype-btn"
            onClick={() => setClassType("Business")}
          >
            Business
          </button>
          <button
            className="classtype-btn"
            onClick={() => setClassType("Premium-Economy")}
          >
            Premium-Economy
          </button>
          <button
            className="classtype-btn"
            onClick={() => setClassType("First Class")}
          >
            First Class
          </button>
        </div>
      </div>
      <div className="button-section">
        <button id="cancel" onClick={() => setTravelerClassVisible(false)}>
          Cancel
        </button>
        <button id="done" onClick={handleDoneClick}>
          Done
        </button>
      </div>
    </div>
  );
};

export default TravelersClass;

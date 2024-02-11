import React, { useState } from "react";
import "./Travelers.css";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

const TravelersClass = ({ setTravelerClassVisible }) => {
  const [adultsCount, setAdultsCount] = useState(1);
  const [childsCount, setChildsCount] = useState(0);
  const [infantsCount, setInfantsCount] = useState(0);

  const adultIncreament = () => {
    if (adultsCount < 9) {
      setAdultsCount(adultsCount + 1);
    }
  };

  const adultDecrement = () => {
    if (adultsCount > 1) {
      setAdultsCount(adultsCount - 1);
    }
  };

  const childIncreament = () => {
    if (childsCount < 9) {
      setChildsCount(childsCount + 1);
    }
  };

  const childDecrement = () => {
    if (childsCount > 0) {
      setChildsCount(childsCount - 1);
    }
  };
  const infantIncreament = () => {
    if (infantsCount < 9) {
      setInfantsCount(infantsCount + 1);
    }
  };

  const infantDecrement = () => {
    if (infantsCount > 0) {
      setInfantsCount(infantsCount - 1);
    }
  };
  return (
    <div className="travelers">
      <div className="top">
        <div className="adults classCategory">
          <h4>Adults</h4>
          <p>(Aged 12+ yrs)</p>
          <div className="counts">
            <span>
              <FaMinus onClick={adultDecrement} />
            </span>
            <span className="countChange">{adultsCount}</span>
            <span>
              <FaPlus onClick={adultIncreament} />
            </span>
          </div>
        </div>
        <div className="children classCategory">
          <h4>Children</h4>
          <p>(Aged 2-12 yrs)</p>
          <div className="counts">
            <span>
              <FaMinus onClick={childDecrement} />
            </span>
            <span className="countChange">{childsCount}</span>
            <span>
              <FaPlus onClick={childIncreament} />
            </span>
          </div>
        </div>
        <div className="infants classCategory">
          <h4>Infants Count</h4>
          <p>(Below 2 yrs)</p>
          <div className="counts">
            <span>
              <FaMinus onClick={infantDecrement} />
            </span>
            <span className="countChange">{infantsCount}</span>
            <span>
              <FaPlus onClick={infantIncreament} />
            </span>
          </div>
        </div>
      </div>
      <div className="bottoms-Section">
        <h4>Travel Class</h4>
        <div className="classType-btns">
          <button id="activeClass" className="classtype-btn">
            Economy
          </button>
          <button className="classtype-btn">Business</button>
          <button className="classtype-btn">Premium-Economy</button>
          <button className="classtype-btn">First Class</button>
        </div>
      </div>
      <div className="button-section">
        <button id="cancel" onClick={() => setTravelerClassVisible(false)}>
          Cancel
        </button>
        <button id="done">Done</button>
      </div>
    </div>
  );
};

export default TravelersClass;

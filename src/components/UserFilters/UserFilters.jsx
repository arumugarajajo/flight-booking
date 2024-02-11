import React, { useState } from "react";
import "./UserFilters.css";
import { MdFlight } from "react-icons/md";
import PriceRangeFilter from "../Filters/PriceFilter/PriceRangeFilter";

function UserFilters() {
  const [flightCount, setFlightCount] = useState(0);
  return (
    <div className="userFilters">
      <div className="filterContent">
        <div className="filters">
          <div className="top">
            <p>Filters</p>
            <p id="resetall">Reset All</p>
          </div>
          <div className="bottom">
            <p>showing {flightCount} flights</p>
          </div>
        </div>
        <div className="departure">
          <p>Departure</p>
          <div className="spans">
            <span>Before 6AM</span>
            <span>6AM - 12PM</span>
            <span>12PM - 6PM</span>
            <span>After 6PM</span>
          </div>
        </div>
        <div className="stops">
          <p>Stops</p>
          <div className="spans">
            <span>Direct</span>
            <span>1 Stop</span>
            <span>2+ Stops</span>
          </div>
        </div>
        <div className="price">
          <PriceRangeFilter />
        </div>
        <div className="onwardDuration"></div>
        <div className="preferredAirlines">
          <div className="top">
            <p>Preferred Airlines</p>
            <p id="reset">Reset</p>
          </div>
          <div className="airlineLists">
            <div className="left">
              <input type="checkbox" name="mark" id={"key"} />
              <MdFlight className="flight-icon" />
              <p>AirLine Name</p>
            </div>
            <div className="right">$ 1223</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserFilters;

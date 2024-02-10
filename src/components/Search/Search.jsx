import React from "react";
import "./Search.css";
import { FaExchangeAlt } from "react-icons/fa";

function Search() {
  return (
    <div className="search">
      <section className="searchArea">
        <div className="travel-type">
          <ul>
            <ul class="travel-type">
              <li>
                <span class="radio-container">
                  <input
                    type="radio"
                    name="travel-type"
                    class="type"
                    id="oneWay"
                  />
                </span>
                <label for="oneWay">One-way</label>
              </li>
              <li>
                <span class="radio-container">
                  <input
                    type="radio"
                    name="travel-type"
                    class="type"
                    id="roundTrip"
                  />
                </span>
                <label for="roundTrip">Round Trip</label>
              </li>
              <li>
                <span class="radio-container">
                  <input
                    type="radio"
                    name="travel-type"
                    class="type"
                    id="multiCity"
                  />
                </span>
                <label for="multiCity">Multi-City</label>
              </li>
            </ul>
          </ul>
        </div>
        <div className="userSearchSection">
          <div className="leftFromTo">
            <div className="fromTo">
              <span className="textlabel">From</span>
              <input type="text" />
            </div>
            <span className="searchFilterIcon">
              <FaExchangeAlt />
            </span>
            <div className="fromTo">
              <span className="textlabel">To</span>
              <input type="text" />
            </div>
          </div>
          <div className="rightDepartureTravelersClass">
            <div className="fromTo">
              <span className="textlabel">Departure</span>
              <input type="text" />
            </div>
            <div className="fromTo">
              <span className="textlabel">Travelers Class</span>
              <input type="text" />
            </div>
          </div>
        </div>
      </section>
      <button id="SearchFlight-btn">Search Fligths</button>
    </div>
  );
}

export default Search;

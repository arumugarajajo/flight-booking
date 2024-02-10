import React from "react";
import "./Search.css";
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
          <div className="from">
            <span className="textlabel">From</span>
          </div>
          <div className="from">
            <span className="textlabel">From</span>
          </div>
          <div className="from">
            <span className="textlabel">From</span>
          </div>
          <div className="from">
            <span className="textlabel">From</span>
          </div>
          <div className="from">
            <span className="textlabel">From</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Search;

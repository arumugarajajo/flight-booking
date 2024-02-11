import React, { useState, useRef, useEffect } from "react";
import "./Search.css";
import { FaExchangeAlt } from "react-icons/fa";
import FromSearchFilter from "./FromSearchFilter";
import useAirportData from "./useAirportData";
import ToSearchFilter from "./ToSearchFilter";
import DepartureCalendar from "./DepartureCalender";
import TravelersClass from "./TravelersClass";
function Search() {
  const {
    airportData: fromAirportData,
    filteredAirports: fromFilteredAirports,
    setFilteredAirports: setFromFilteredAirports,
  } = useAirportData("from");
  const {
    airportData: toAirportData,
    filteredAirports: toFilteredAirports,
    setFilteredAirports: setToFilteredAirports,
  } = useAirportData("to");
  const [searchInputFrom, setSearchInputFrom] = useState("");
  const [showResultsFrom, setShowResultsFrom] = useState(false);
  const [selectedAirportIndexFrom, setSelectedAirportIndexFrom] =
    useState(null);
  const [searchInputTo, setSearchInputTo] = useState("");
  const [showResultsTo, setShowResultsTo] = useState(false);
  const [selectedAirportIndexTo, setSelectedAirportIndexTo] = useState(null);
  const inputRefFrom = useRef(null);
  const inputRefTo = useRef(null);
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [isTravelerClassVisible, setTravelerClassVisible] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        inputRefFrom.current &&
        !inputRefFrom.current.contains(e.target) &&
        inputRefTo.current &&
        !inputRefTo.current.contains(e.target)
      ) {
        setShowResultsFrom(false);
        setShowResultsTo(false);
        setCalendarVisible(false);
        setTravelerClassVisible(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleInputChangeFrom = (e) => {
    const input = e.target.value;
    setSearchInputFrom(input);
    setShowResultsFrom(input.length > 0);
    setSelectedAirportIndexFrom(null);
    setFromFilteredAirports(
      fromAirportData.filter((airport) =>
        airport.cityName.toLowerCase().includes(input.toLowerCase())
      )
    );
  };

  const handleResultClickFrom = (airport) => {
    setSearchInputFrom(`${airport.cityName}, ${airport.countryName}`);
    setShowResultsFrom(false);
    setSelectedAirportIndexFrom(null);
  };

  const handleInputChangeTo = (e) => {
    const input = e.target.value;
    setSearchInputTo(input);
    setShowResultsTo(input.length > 0);
    setSelectedAirportIndexTo(null);
    setToFilteredAirports(
      toAirportData.filter((airport) =>
        airport.cityName.toLowerCase().includes(input.toLowerCase())
      )
    );
  };

  const handleResultClickTo = (airport) => {
    setSearchInputTo(`${airport.cityName}, ${airport.countryName}`);
    setShowResultsTo(false);
    setSelectedAirportIndexTo(null);
  };

  return (
    <div className="search">
      <section className="searchArea">
        <div className="travel-type">
          <ul>
            <ul className="travel-type">
              <li>
                <span className="radio-container">
                  <input
                    type="radio"
                    name="travel-type"
                    className="type"
                    id="oneWay"
                  />
                </span>
                <label htmlFor="oneWay">One-way</label>
              </li>
              <li>
                <span className="radio-container">
                  <input
                    type="radio"
                    name="travel-type"
                    className="type"
                    id="roundTrip"
                  />
                </span>
                <label htmlFor="roundTrip">Round Trip</label>
              </li>
              <li>
                <span className="radio-container">
                  <input
                    type="radio"
                    name="travel-type"
                    className="type"
                    id="multiCity"
                  />
                </span>
                <label htmlFor="multiCity">Multi-City</label>
              </li>
            </ul>
          </ul>
        </div>
        <div className="userSearchSection">
          <div className="leftFromTo">
            <FromSearchFilter
              ref={inputRefFrom}
              searchInput={searchInputFrom}
              handleInputChange={handleInputChangeFrom}
              showResults={showResultsFrom}
              setShowResults={setShowResultsFrom}
              filteredAirports={fromFilteredAirports}
              selectedAirportIndex={selectedAirportIndexFrom}
              handleResultClick={handleResultClickFrom}
            />
            <span className="searchFilterIcon">
              <FaExchangeAlt />
            </span>
            <ToSearchFilter
              ref={inputRefTo}
              searchInput={searchInputTo}
              handleInputChange={handleInputChangeTo}
              showResults={showResultsTo}
              setShowResults={setShowResultsTo}
              filteredAirports={toFilteredAirports}
              selectedAirportIndex={selectedAirportIndexTo}
              handleResultClick={handleResultClickTo}
            />
          </div>
          <div className="rightDepartureTravelersClass">
            <div className="fromTo">
              <span className="textlabel">Departure</span>
              {isCalendarVisible ? (
                <DepartureCalendar className="departureCalendar" />
              ) : (
                <input type="text" onFocus={() => setCalendarVisible(true)} />
              )}
            </div>
            <div className="fromTo">
              <span className="textlabel">Travelers Class</span>
              <input
                type="text"
                value={"1-Adult"}
                style={{ fontWeight: "600" }}
                onFocus={() => setTravelerClassVisible(true)}
              />
            </div>
            {isTravelerClassVisible && (
              <TravelersClass
                ref={inputRefTo}
                setTravelerClassVisible={setTravelerClassVisible}
              />
            )}
          </div>
        </div>
      </section>
      <button id="SearchFlight-btn">Search Flights</button>
    </div>
  );
}

export default Search;

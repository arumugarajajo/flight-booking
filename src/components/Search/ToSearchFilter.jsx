import React, { useRef, useEffect } from "react";
import { MdFlight } from "react-icons/md";

const ToSearchFilter = ({
  searchInput,
  handleInputChange,
  showResults,
  setShowResults,
  filteredAirports,
  selectedAirportIndex,
  handleResultClick,
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!inputRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [setShowResults]);

  // Filter out duplicate airports based on airportCode
  const uniqueAirports = filteredAirports.filter(
    (airport, index, self) =>
      index === self.findIndex((a) => a.airportCode === airport.airportCode)
  );

  return (
    <div className="fromTo" ref={inputRef}>
      <span className="textlabel">To</span>
      <input
        type="text"
        autoComplete="off"
        value={searchInput}
        onChange={handleInputChange}
        onFocus={() => setShowResults(true)}
      />

      {showResults && (
        <div className="searchResults">
          {uniqueAirports.length > 0 ? (
            uniqueAirports.map((airport, index) => (
              <div
                key={index}
                className={`fromSearchResults resultItem ${
                  selectedAirportIndex === index ? "selected" : ""
                }`}
                onClick={() => handleResultClick(airport)}
              >
                <div className="left">
                  <MdFlight />
                </div>
                <div className="mid">
                  <div className="top">
                    <span>{airport.cityName},</span>
                    <span>{airport.countryName}</span>
                    <span>[{airport.airportCode}]</span>
                  </div>
                  <div className="bottom">
                    <p>{airport.airportName}</p>
                  </div>
                </div>
                <div className="right">
                  <p>{airport.countryCode}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="noResultFound">No result found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ToSearchFilter;

import React, { useEffect, useState } from "react";
import "./UserFilters.css";
import { MdFlight } from "react-icons/md";
import PriceRangeFilter from "../Filters/PriceFilter/PriceRangeFilter";

function UserFilters({ flights, flightsCount, preferredAirlines }) {
  const [flightCount, setFlightCount] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState({
    departure: [],
    stops: [],
    price: null,
    onwardDuration: null,
    preferredAirlines: [],
  });

  const handleResetAll = () => {
    setSelectedFilters({
      departure: [],
      stops: [],
      price: null,
      onwardDuration: null,
      preferredAirlines: [],
    });
    setFlightCount(0);
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };

  const handleFilterChange = (filterCategory, selectedValues) => {
    setSelectedFilters({
      ...selectedFilters,
      [filterCategory]: selectedValues,
    });
    onFiltersChange({
      ...selectedFilters,
      [filterCategory]: selectedValues,
    });
  };

  const handlePreferredAirlineChange = (airlineName) => {
    setSelectedFilters((prevFilters) => {
      let updatedPreferredAirlines;
      if (prevFilters.preferredAirlines.includes(airlineName)) {
        updatedPreferredAirlines = prevFilters.preferredAirlines.filter(
          (name) => name !== airlineName
        );
      } else {
        updatedPreferredAirlines = Array.from(
          new Set([...prevFilters.preferredAirlines, airlineName])
        );
      }

      const filteredFlights = flights
        ? flights.filter((flight) =>
            updatedPreferredAirlines.includes(
              flight.displayData.airlines[0].airlineName
            )
          )
        : [];

      const filteredData = {
        ...prevFilters,
        preferredAirlines: updatedPreferredAirlines,
      };
      onFiltersChange(
        filteredData,
        filteredFlights.length,
        updatedPreferredAirlines
      );

      return {
        ...prevFilters,
        preferredAirlines: updatedPreferredAirlines,
      };
    });
  };

  useEffect(() => {
    setFlightCount(flightsCount);
  }, [flightsCount]);

  const onFiltersChange = (filters, count, preferredAirlines) => {
    setFlightCount(count);
    console.log("Filters changed:", filters);
    console.log("Flight count:", count);
    console.log("Preferred airlines:", preferredAirlines);
  };

  const handleReset = () => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      preferredAirlines: [],
    }));

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });

    onFiltersChange(
      { ...selectedFilters, preferredAirlines: [] },
      flightsCount,
      []
    );
  };

  const uniqueAirlines = Array.from(new Set(preferredAirlines));

  return (
    <div className="userFilters">
      <div className="filterContent">
        <div className="filters">
          <div className="top">
            <p>Filters</p>
            <p id="resetall" onClick={handleResetAll}>
              Reset All
            </p>
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
          <PriceRangeFilter
            onChange={(selectedValues) =>
              handleFilterChange("price", selectedValues)
            }
          />
        </div>
        <div className="onwardDuration"></div>
        <div className="preferredAirlines">
          <div className="top">
            <p>Preferred Airlines</p>
            <p id="reset" onClick={handleReset}>
              Reset
            </p>
          </div>
          {uniqueAirlines.length > 0 ? (
            uniqueAirlines.map((airlineName, index) => (
              <div key={index} className="airlineItem">
                <label
                  htmlFor={`airlineCheckbox_${index}`}
                  className="airlineLabel"
                >
                  <input
                    type="checkbox"
                    id={`airlineCheckbox_${index}`}
                    onChange={() => handlePreferredAirlineChange(airlineName)}
                    checked={selectedFilters.preferredAirlines.includes(
                      airlineName
                    )}
                  />
                  <MdFlight className="flight-icon" />
                  <span>{airlineName}</span>
                </label>
              </div>
            ))
          ) : (
            <p className="noAirlinesText">No airlines available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserFilters;

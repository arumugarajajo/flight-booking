import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FlightListing.css";
import { MdFlight } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";

function FlightListing({ fromLocation, toLocation, filters, onUpdate }) {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");

  // Function to get the departure category based on depTime
  const getDepartureCategory = (flight) => {
    const depTime = new Date(flight.displayData.source.depTime);
    const hours = depTime.getHours();
    if (hours < 6) {
      return "Before 6AM";
    } else if (hours >= 6 && hours < 12) {
      return "6AM - 12PM";
    } else if (hours >= 12 && hours < 18) {
      return "12PM - 6PM";
    } else {
      return "After 6PM";
    }
  };

  // Function to get the stops category based on stopInfo
  const getStopsCategory = (flight) => {
    const stops = flight.displayData.stopInfo
      ? flight.displayData.stopInfo.split(" ").length
      : 0;
    if (stops === 0) {
      return "Direct";
    } else if (stops === 1) {
      return "1 Stop";
    } else {
      return "2+ Stops";
    }
  };

  // Function to check if flight price is within the selected range
  const checkPriceInRange = (flight, priceRange) => {
    return flight.fare >= priceRange.min && flight.fare <= priceRange.max;
  };

  // Function to check if flight duration is within the selected range
  const checkDurationInRange = (flight, durationRange) => {
    const [hours, minutes] = flight.displayData.totalDuration.split(" ");
    const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
    return (
      totalMinutes >= durationRange.min && totalMinutes <= durationRange.max
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.npoint.io/4829d4ab0e96bfab50e7/data/result"
        );

        const filteredFlights = response.data.filter(
          (flight) =>
            flight.displayData.source.airport.cityName.toLowerCase() ===
              fromLocation.toLowerCase() &&
            flight.displayData.destination.airport.cityName.toLowerCase() ===
              toLocation.toLowerCase()
        );

        if (filters) {
          // Apply departure filter
          if (filters.departure.length > 0) {
            filteredFlights = filteredFlights.filter((flight) =>
              filters.departure.includes(getDepartureCategory(flight))
            );
          }
          // Apply stops filter
          if (filters.stops.length > 0) {
            filteredFlights = filteredFlights.filter((flight) =>
              filters.stops.includes(getStopsCategory(flight))
            );
          }
          // Apply price filter
          if (filters.price) {
            filteredFlights = filteredFlights.filter((flight) =>
              checkPriceInRange(flight, filters.fare)
            );
          }
          // Apply onward duration filter
          if (filters.onwardDuration) {
            filteredFlights = filteredFlights.filter((flight) =>
              checkDurationInRange(flight, filters.onwardDuration)
            );
          }
          // Apply preferred airlines filter
          if (filters.preferredAirlines.length > 0) {
            filteredFlights = filteredFlights.filter((flight) =>
              filters.preferredAirlines.includes(
                flight.displayData.airlines[0].airlineName
              )
            );
          }
        }

        setFlights(filteredFlights);
        setLoading(false);
        onUpdate(
          filteredFlights.length,
          filteredFlights.map(
            (flight) => flight.displayData.airlines[0].airlineName
          )
        );
      } catch (error) {
        console.error("Error fetching flights:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [fromLocation, toLocation, filters, onUpdate]);

  // Sort flights by departure time
  const sortByDeparture = () => {
    const sortedFlights = [...flights].sort((a, b) =>
      a.displayData.source.depTime.localeCompare(b.displayData.source.depTime)
    );
    setFlights(sortedFlights);
  };

  // Sort flights by total duration
  const sortByDuration = () => {
    const sortedFlights = [...flights].sort((a, b) =>
      a.displayData.totalDuration.localeCompare(b.displayData.totalDuration)
    );
    setFlights(sortedFlights);
  };

  // Sort flights by arrival time
  const sortByArrival = () => {
    const sortedFlights = [...flights].sort((a, b) =>
      a.displayData.destination.arrTime.localeCompare(
        b.displayData.destination.arrTime
      )
    );
    setFlights(sortedFlights);
  };

  // Function to handle sorting by price
  const sortByPrice = () => {
    const sortedFlights = [...flights].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.fare - b.fare;
      } else {
        return b.fare - a.fare;
      }
    });

    setFlights(sortedFlights);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Sort flights by best combination of duration and stops
  const sortByBest = () => {
    const sortedFlights = [...flights].sort(
      (a, b) =>
        a.displayData.totalDuration.localeCompare(
          b.displayData.totalDuration
        ) || a.displayData.stopInfo.localeCompare(b.displayData.stopInfo)
    );
    setFlights(sortedFlights);
  };

  return (
    <section className="flightListContainer">
      <div className="Sortby">
        <ul>
          <li onClick={sortByDeparture}>
            <p className="p-top">
              <span>Departure </span>
              <span>
                <FaAngleDown className="down-icon" />
              </span>
            </p>
            <p className="p-bottom">earliest @ 02:30</p>
          </li>
          <li onClick={sortByDuration}>
            <p className="p-top">
              <span>DURATION </span>
              <span>
                <FaAngleDown className="down-icon" />
              </span>
            </p>
            <p className="p-bottom">fastest @ 2hrs 40m</p>
          </li>
          <li onClick={sortByArrival}>
            <p className="p-top">
              <span>ARRIVAL </span>
              <span>
                <FaAngleDown className="down-icon" />
              </span>
            </p>
            <p className="p-bottom">Wed, 14 Feb @ 05:20</p>
          </li>
          <li onClick={sortByPrice}>
            <p className="p-top">
              <span>PRICE </span>
              <span>
                <FaAngleDown className="down-icon" />
              </span>
            </p>
            <p className="p-bottom">cheapest @ 6,382</p>
          </li>
          <li onClick={sortByBest}>
            <p className="p-top">
              <span>BEST </span>
              <span>
                <FaAngleDown className="down-icon" />
              </span>
            </p>
            <p className="p-bottom">3hrs 00m, 0 stops - 6,382</p>
          </li>
        </ul>
      </div>
      {loading ? (
        <p>Loading flights...</p>
      ) : (
        <div className="flightResults">
          {flights.length > 0 ? (
            <div className="flightResultListContainer">
              {flights.map((flight, index) => (
                <div key={index} className="flightItem">
                  <div className="flightItemContent">
                    <div className="logoAndAirline">
                      <MdFlight className="flight-icon" />
                      <p>{flight.displayData.airlines[0].airlineName}</p>
                    </div>
                    <div className="fromLocation_Duration_toLocation_fare_btn">
                      <div className="fromLocation">
                        <p className="code">
                          {flight.displayData.source.airport.cityCode},{" "}
                        </p>
                        <p>{flight.displayData.source.airport.cityName}, </p>
                        <p>{flight.displayData.source.airport.countryName}</p>
                      </div>
                      <div className="toLocation">
                        <p className="code">
                          {flight.displayData.destination.airport.cityCode},{" "}
                        </p>
                        <p>
                          {flight.displayData.destination.airport.cityName},{" "}
                        </p>
                        <p>
                          {flight.displayData.destination.airport.countryName}
                        </p>
                      </div>
                    </div>
                    <div className="durationAndFare">
                      <p>{flight.displayData.destination.arrTime}</p>
                      <p>{flight.displayData.source.depTime}</p>
                      <p>{flight.displayData.totalDuration}</p>
                      <p>${flight.fare}</p>
                    </div>
                    <div className="bottom_stop_mealinfo">
                      {flight.displayData.stopInfo && (
                        <div className="stopInfo">
                          {flight.displayData.stopInfo}
                        </div>
                      )}
                      <div className="mealInfo">
                        {flight.displayData.mealInfo && (
                          <p>Free Meal: {flight.displayData.mealInfo}</p>
                        )}
                      </div>
                      <div className="offerInfo">
                        <p>
                          Get Rs 400 off using HIREME; Extra INR 25 off on UPI
                          payments
                        </p>
                      </div>
                    </div>
                  </div>
                  <button className="book-btn">Book</button>
                </div>
              ))}
            </div>
          ) : (
            <p>
              No flights available from {fromLocation} to {toLocation}.
            </p>
          )}
        </div>
      )}
    </section>
  );
}

export default FlightListing;

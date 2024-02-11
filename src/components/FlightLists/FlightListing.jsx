import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FlightListing.css";
import { MdFlight } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";

function FlightListing({ fromLocation, toLocation }) {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

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

        setFlights(filteredFlights);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching flights:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [fromLocation, toLocation]);

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

  // Sort flights by fare price
  const sortByPrice = () => {
    const sortedFlights = [...flights].sort((a, b) => a.fare - b.fare);
    setFlights(sortedFlights);
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
                  <button className="book-btn">Book</button>
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
                      <p>{flight.displayData.destination.airport.cityName}, </p>
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

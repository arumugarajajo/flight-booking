import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Search from "../../components/Search/Search";
import Banner from "../../components/Banner/Banner";
import FlightListing from "../../components/FlightLists/FlightListing";
import UserFilters from "../../components/UserFilters/UserFilters";
import axios from "axios";
import "./Home.css";

function Home() {
  const [searchData, setSearchData] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [flights, setFlights] = useState([]);
  const [filteredFlightsCount, setFilteredFlightsCount] = useState(0);
  const [preferredAirlines, setPreferredAirlines] = useState([]);

  const handleSearch = (data) => {
    setSearchData(data);
    console.log(data);
    setShowResults(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.npoint.io/4829d4ab0e96bfab50e7/data/result"
        );
        setFlights(response.data);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home">
      <section className="navbar-home">
        <Navbar />
      </section>
      <section className="bannerAndSearch">
        <Banner className="banner-home" />
        <Search onSearch={handleSearch} />
      </section>
      <section className="content">
        {showResults && searchData && (
          <div className="vertical-container">
            <UserFilters
              flightsCount={filteredFlightsCount}
              preferredAirlines={preferredAirlines}
              className="userfilters_home"
            />
            <FlightListing
              className="flightListing_home"
              fromLocation={searchData.fromLocation}
              toLocation={searchData.toLocation}
              onUpdate={(count, airlines) => {
                setFilteredFlightsCount(count);
                setPreferredAirlines(airlines);
              }}
            />
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;

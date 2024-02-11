// Home.jsx

import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Search from "../../components/Search/Search";
import Banner from "../../components/Banner/Banner";
import FlightListing from "../../components/FlightLists/FlightListing";
import UserFilters from "../../components/UserFilters/UserFilters";
import "./Home.css";

function Home() {
  const [searchData, setSearchData] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (data) => {
    setSearchData(data);
    console.log(data);
    setShowResults(true);
  };

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
            <UserFilters className="userfilters_home" />
            <FlightListing
              className="flightListing_home"
              fromLocation={searchData.fromLocation}
              toLocation={searchData.toLocation}
            />
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;

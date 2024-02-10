import React from "react";
// import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import Search from "../../components/Search/Search";
import Banner from "../../components/Banner/Banner";
function Home() {
  return (
    <div className="home">
      <section className="navbar-home">
        <Navbar />
      </section>
      <section className="bannerAndSearch">
        <Banner className="banner-home" />
        <Search className="search-home" />
      </section>
    </div>
  );
}

export default Home;

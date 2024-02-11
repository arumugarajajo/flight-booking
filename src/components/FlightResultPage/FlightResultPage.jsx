import React, { useState } from "react";

function FlightResultPage() {
  const [searchData, setSearchData] = useState(null);

  const handleSearchData = (data) => {
    setSearchData(data);
  };
  return <div>FlightResultPage</div>;
}

export default FlightResultPage;

import { useEffect, useState } from "react";

function useAirportData(airportType) {
  const [airportData, setAirportData] = useState([]);
  const [filteredAirports, setFilteredAirports] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.npoint.io/4829d4ab0e96bfab50e7/data/result/"
        );
        const data = await response.json();

        const airportSet = new Set();
        const airports = data.map((item) => ({
          cityName:
            airportType === "from"
              ? item.displayData.source.airport.cityName
              : item.displayData.destination.airport.cityName,
          countryName:
            airportType === "from"
              ? item.displayData.source.airport.countryName
              : item.displayData.destination.airport.countryName,
          airportName:
            airportType === "from"
              ? item.displayData.source.airport.airportName
              : item.displayData.destination.airport.airportName,
          airportCode:
            airportType === "from"
              ? item.displayData.source.airport.airportCode
              : item.displayData.destination.airport.airportCode,
          countryCode:
            airportType === "from"
              ? item.displayData.source.airport.countryCode
              : item.displayData.destination.airport.countryCode,
        }));

        airports.forEach((airport) => {
          if (!airportSet.has(airport.cityName)) {
            airportSet.add(airport.cityName);
          }
        });

        setAirportData(airports);
        setFilteredAirports(airports);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [airportType]);

  return { airportData, filteredAirports, setFilteredAirports };
}

export default useAirportData;

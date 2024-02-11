import React from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import "./PriceRangeFilter.css";
function PriceRangeFilter({ onFilter }) {
  const [value, setValue] = React.useState([2000, 10000]);

  const rangeSelector = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
  };

  return (
    <div className="priceRangeFilterContainer">
      <p className="priceRangeFilterTitle">Price</p>
      <Typography id="range-slider" gutterBottom></Typography>
      <Slider
        className="priceRangeSlider"
        value={value}
        onChange={rangeSelector}
        valueLabelDisplay="auto"
        min={1000}
        max={100000}
      />
      <div className="priceRangeBar">
        <span className="priceRangeValue">${value[0]}</span>
        <span className="priceRangeValue">${value[1]}</span>
      </div>
    </div>
  );
}

export default PriceRangeFilter;

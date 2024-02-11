import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function DepartureCalendar() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        slotProps={{
          textField: {
            size: "small",
            style: { border: "none", outline: "none" },
            InputProps: {
              style: { border: "none", outline: "none" },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
}

export default DepartureCalendar;

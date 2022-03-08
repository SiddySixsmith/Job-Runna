import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import styles from "../../styles/form.module.css";

export default function MaterialUIPickers(props) {
  const { label } = props;
  const [value, setValue] = useState(new Date());

  const handleChange = (newValue) => {
    setValue(newValue);

    if (props.onValue) {
      props.onValue(newValue);
    }
  };

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <MobileDatePicker
        label={label}
        id="dateOfBirth"
        inputFormat="DD/MM/yyyy"
        value={value}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            className={styles.content}
            variant="standard"
          />
        )}
      />
    </LocalizationProvider>
  );
}

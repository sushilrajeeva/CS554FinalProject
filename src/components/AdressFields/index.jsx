import React from "react";
import { Stack, TextField, MenuItem } from "@mui/material";

const stateList = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

const AdressFields = ({
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
}) => {
  return (
    <>
      <TextField
        variant="standard"
        label="Street"
        name="street"
        value={values.street}
        onInput={(e) => {
          handleChange(e);
          setTimeout(() => handleBlur(e), 0);
        }}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.street && Boolean(errors.street)}
        helperText={touched.street && errors.street}
        fullWidth
        required
      />
      <TextField
        variant="standard"
        label="City"
        name="city"
        value={values.city}
        onInput={(e) => {
          handleChange(e);
          setTimeout(() => handleBlur(e), 0);
        }}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.city && Boolean(errors.city)}
        helperText={touched.city && errors.city}
        fullWidth
        required
      />
      <Stack
        direction="row"
        spacing={2}
        sx={{
          width: "100%",
        }}
      >
        <TextField
          select
          variant="standard"
          label="State"
          name="state"
          value={values.state}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.state && Boolean(errors.state)}
          helperText={touched.state && errors.state}
          fullWidth
          required
        >
          {stateList.map((state) => (
            <MenuItem key={state} value={state}>
              {state}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          variant="standard"
          label="Country"
          name="country"
          value="United States"
          fullWidth
          required
          disabled
        />
      </Stack>

      <TextField
        sx={{ marginBottom: "15px" }}
        variant="standard"
        label="Pincode"
        name="pincode"
        value={values.pincode}
        onInput={(e) => {
          handleChange(e);
          setTimeout(() => handleBlur(e), 0);
        }}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.pincode && Boolean(errors.pincode)}
        helperText={touched.pincode && errors.pincode}
        fullWidth
        required
      />
    </>
  );
};

export default AdressFields;

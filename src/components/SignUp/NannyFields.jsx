import React from "react";

import { TextField, TextareaAutosize, Typography } from "@mui/material";

const NannyFields = ({
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
  setFieldValue,
}) => {
  return (
    <>
      <TextField
        variant="standard"
        label="Experience"
        name="experience"
        value={values.experience}
        onInput={(e) => {
          handleChange(e);
          setTimeout(() => handleBlur(e), 0);
        }}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.experience && Boolean(errors.experience)}
        helperText={touched.experience && errors.experience}
        fullWidth
        required
      />
      <TextField
        variant="standard"
        label="SSN"
        name="ssn"
        value={values.ssn}
        onChange={(e) => {
          let ssn = e.target.value;
          ssn = ssn.replace(/\D/g, "");
          ssn = ssn.replace(/[()-\s]/g, "");
          console.log(ssn, ssn.length);
          if (ssn.length > 9) {
            return;
          }
          const firstThree = ssn.substring(0, 3);
          const secondTwo = ssn.substring(3, 5);
          const lastFour = ssn.substring(5);
          let formattedNumber = "";
          if (ssn.length > 3) {
            formattedNumber += `${firstThree}-${secondTwo}`;
            if (ssn.length > 5) formattedNumber += `-${lastFour}`;
          } else formattedNumber = firstThree;
          setFieldValue("ssn", formattedNumber);
        }}
        onBlur={handleBlur}
        error={touched.ssn && Boolean(errors.ssn)}
        helperText={touched.ssn && errors.ssn}
        fullWidth
        required
      />
      <TextareaAutosize
        label="Bio"
        minRows={6}
        name="bio"
        placeholder="Enter your bio here..."
        value={values.bio}
        onInput={(e) => {
          handleChange(e);
          setTimeout(() => handleBlur(e), 0);
        }}
        onChange={handleChange}
        onBlur={handleBlur}
        required
        style={{ width: "100%", marginTop: "16px", border: "1px solid black" }}
      />

      {touched.bio && errors.bio && (
        <Typography variant="caption" color="error" textAlign="left">
          {errors.bio}
        </Typography>
      )}
    </>
  );
};

export default NannyFields;

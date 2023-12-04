import React, { useState, useContext } from "react";
import AdressFields from "./AdressFields";
import { Typography, InputAdornment, Stack, TextField } from "@mui/material";
import moment from "moment";

const DisplayProfileField = ({ label, value }) => {
  return (
    <Stack
      direction="column"
      sx={{
        width: "100%",
        alignItems: "flex-start",
      }}
    >
      <Typography
        sx={{
          fontSize: "0.75rem",
          color: "rgba(0, 0, 0, 0.6)",
          fontFamily: "sans-serif",
          fontWeight: "400",
          lineHeight: "1.4375em",
          letterSpacing: "0.00938em",
        }}
        variant="subtitle1"
      >
        {label}
      </Typography>
      <Typography variant="body1">{value}</Typography>
    </Stack>
  );
};

const formatSSN = (ssn) => {
  const cleanedSSN = ssn.replace(/\D/g, "");
  return cleanedSSN.replace(/(\d{3})(\d{2})(\d{4})/, "$1-$2-$3");
};

const ProfileFields = ({
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
  setFieldValue,
  userRole,
}) => {
  return (
    <>
      <DisplayProfileField label="Email" value={values.email} />

      <DisplayProfileField
        label="Date of Birth"
        value={moment(values.dob).format("MMMM DD, YYYY")}
      />

      {userRole === "nanny" && (
        <>
          <DisplayProfileField label="ssn" value={formatSSN(values.ssn)} />
        </>
      )}

      <TextField
        variant="standard"
        label="Display name"
        name="displayName"
        value={values.displayName}
        onInput={(e) => {
          handleChange(e);
          setTimeout(() => handleBlur(e), 0);
        }}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.displayName && Boolean(errors.displayName)}
        helperText={touched.displayName && errors.displayName}
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
          variant="standard"
          label="First Name"
          name="firstName"
          value={values.firstName}
          onInput={(e) => {
            handleChange(e);
            setTimeout(() => handleBlur(e), 0);
          }}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.firstName && Boolean(errors.firstName)}
          helperText={touched.firstName && errors.firstName}
          fullWidth
          required
        />
        <TextField
          variant="standard"
          label="Last Name"
          name="lastName"
          value={values.lastName}
          onInput={(e) => {
            handleChange(e);
            setTimeout(() => handleBlur(e), 0);
          }}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.lastName && Boolean(errors.lastName)}
          helperText={touched.lastName && errors.lastName}
          fullWidth
          required
        />
      </Stack>

      <TextField
        variant="standard"
        label="Phone Number"
        name="phoneNumber"
        value={values.phoneNumber}
        onChange={(e) => {
          let number = e.target.value;
          if (number.length > 10) return;
          setFieldValue("phoneNumber", number);
        }}
        onInput={(e) => {
          handleChange(e);
          setTimeout(() => handleBlur(e), 0);
        }}
        onBlur={handleBlur}
        error={touched.phoneNumber && Boolean(errors.phoneNumber)}
        helperText={touched.phoneNumber && errors.phoneNumber}
        fullWidth
        InputProps={{
          startAdornment: <InputAdornment position="start">+1</InputAdornment>,
        }}
        required
      />

      <AdressFields
        values={values}
        handleChange={handleChange}
        handleBlur={handleBlur}
        touched={touched}
        errors={errors}
      />
    </>
  );
};

export default ProfileFields;
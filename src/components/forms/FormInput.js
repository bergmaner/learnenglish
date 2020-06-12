import React from "react";
import { TextField } from "@material-ui/core";
import styled from "styled-components";

const BaseInput = styled(TextField)`
  .MuiOutlinedInput-root {
    margin-bottom: 20px;
    color: #a5a5a5;
    fieldset {
      border-color: palevioletred;
      font-size: 18px;
    }
    &:hover fieldset {
      border: 2px solid palevioletred;
    }
    &.Mui-focused fieldset {
      border-color: palevioletred;
    }
  }
  .MuiFormLabel-root {
    color: #a5a5a5;
  }
  .MuiFormLabel-root.Mui-focused {
    color: palevioletred;
  }
`;

const FormInput = ({ label, type, onChange, value, name }) => {
  return (
    <BaseInput
      required
      name={name}
      value={value}
      onChange={onChange}
      label={label}
      type={type}
      variant="outlined"
    />
  );
};

export default FormInput;

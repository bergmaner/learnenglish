import React, { useState } from "react";
import { FaFacebook, FaGithub, FaGooglePlus } from "react-icons/fa";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { fbAuth, ghAuth, googleAuth, auth } from "../../services/firebase";
import FormInput from "../../components/forms/FormInput";
import Submit from "../../components/forms/Submit";
import { breakpoint } from "../../helpers/mediaQueries";

const Register = styled(Link)`
  color: #a5a5a5;
  text-decoration: none;
  transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  &:hover {
    color: #727272;
  }
`;

const SocialMedia = styled.div`
  svg {
    font-size: 100px;
    margin: 10px;
    cursor: pointer;
    transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    @media ${breakpoint.md} {
      font-size: 60px;
      margin: 10px 5px;
    }
  }
  .facebook {
    &:hover {
      color: #4267b2;
    }
    @media ${breakpoint.md} {
      color: #4267b2;
    }
  }
  .google {
    &:hover {
      color: #dd4b39;
    }
    @media ${breakpoint.md} {
      color: #dd4b39;
    }
  }
  .github {
    &:hover {
      color: #211f1f;
    }
    @media ${breakpoint.md} {
      color: #211f1f;
    }
  }
`;

export default () => {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    auth()
      .signInWithEmailAndPassword(formValues.email, formValues.password)
      .catch((err) => {
        setError(err.message);
      });
  }

  function handleInputChange(e) {
    e.persist();
    setError("");
    setFormValues((currentValues) => ({
      ...currentValues,
      [e.target.name]: e.target.value,
    }));
  }

  const handleFbLogin = async () => {
    await fbAuth();
  };

  const handleGhLogin = async () => {
    await ghAuth();
  };

  const handleGoogleLogin = async () => {
    await googleAuth();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", width: "50vw" }}
      >
        <FormInput
          name="email"
          onChange={handleInputChange}
          label="Email"
          type="email"
        />
        <FormInput
          name="password"
          onChange={handleInputChange}
          label="Password"
          type="password"
        />
        <Submit>Login</Submit>
        {error && <div style={{ color: "red", fontSize: "12px" }}>{error}</div>}
        {!error && <div style={{ height: "30px" }}></div>}
      </form>
      <SocialMedia>
        <FaFacebook
          className="facebook"
          onClick={() => handleFbLogin()}
        ></FaFacebook>
        <FaGooglePlus
          className="google"
          onClick={() => handleGoogleLogin()}
        ></FaGooglePlus>
        <FaGithub className="github" onClick={() => handleGhLogin()}></FaGithub>
      </SocialMedia>
      <Register to="/register">
        Do you have an account ? If not go Register
      </Register>
    </div>
  );
};

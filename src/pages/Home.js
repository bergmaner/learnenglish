import React from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { useHistory, Link } from "react-router-dom";
import { selectCurrentUser } from "../features/auth/authSlice";
import { useSelector } from "react-redux";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #c7c7c7;
`;

const MainButton = styled(Button)`
  && {
    width: 50vw;
    display: block;
    padding: 15px;
    border: 2px solid #db7093;
    color: #db7093;
    font-weight: 700;
    margin: 5px 0;
    border-radius: 9px;
    &:hover {
      background: #db7093;
      color: #fff;
    }
  }
`;

const Home = () => {
  const history = useHistory();
  const user = useSelector(selectCurrentUser);
  const historyPush = (path) => {
    history.push(path);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {!user && (
        <div style={{ paddingBottom: "100px" }}>
          <StyledLink to="/login">
            By uzyskać dostęp do większej ilośći opcji zaloguj się
          </StyledLink>
        </div>
      )}
      <MainButton onClick={() => historyPush("/education")}>Educate</MainButton>

      {user && user.level === -1 && (
        <>
          <MainButton onClick={() => historyPush("/excercise")}>
            Check Your Level
          </MainButton>
        </>
      )}
      {user && user.level !== -1 && (
        <>
          <MainButton onClick={() => historyPush("/excercise")}>
            Excercise
          </MainButton>
        </>
      )}
    </div>
  );
};

export default Home;

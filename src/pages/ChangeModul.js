import React from "react";
import styled from "styled-components";
import { Button, Tooltip } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Icon from "@material-ui/core/Icon";
import { restart } from "../features/excercise/excerciseSlice";
import { breakpoint } from "../helpers/mediaQueries";

const Header = styled.div`
  font-size: 30px;
  color: #db7093;
  padding-top: 100px;
  font-weight: 700;
  @media ${breakpoint.sm} {
    font-size: 30px;
  }
`;

const CircleButton = styled(Button)`
  && {
    padding: 50px;
    border: 2px solid #db7093;
    color: #db7093;
    font-weight: 700;
    margin: 10px;
    border-radius: 100%;
    transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    &:hover {
      background: #db7093;
      color: #fff;
    }
    @media ${breakpoint.md} {
      padding: 45px;
    }
    @media ${breakpoint.sm} {
      padding: 35px;
    }
  }
`;

const ModulsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row wrap;
  justify-content: space-around;
  margin-bottom: 100px;
`;

const ChangeModul = ({ navLinks, type }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const historyPush = (path) => {
    history.push(path);
  };
  return (
    <div
      style={{
        height: "calc(100vh - 60px)",
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "column",
      }}
    >
      <Header>
        Choose modul to {type === "education" ? "educate" : "excercise"}
      </Header>
      <ModulsContainer>
        {navLinks.map((link, index) => (
          <Tooltip title={link.text}>
            <CircleButton
              key={index}
              onClick={() => (
                historyPush(`/${type}/${link.text}`), dispatch(restart())
              )}
            >
              <Icon alt="Transport" style={{ fontSize: "50px" }}>
                {link.icon}
              </Icon>
            </CircleButton>
          </Tooltip>
        ))}
      </ModulsContainer>
    </div>
  );
};

export default ChangeModul;

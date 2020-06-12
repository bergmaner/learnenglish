import React from "react";
import styled from "styled-components";

const Progressbar = styled.div`
  background-color: #d8d8d8;
  border-radius: 20px;
  margin: 10px 0;
  height: 16px;
  width: 100%;
`;

const ProgressDone = styled.div`
  background: #ca6082;
  transition: all 0.4s;
  box-shadow: 0 1px 1px -3px palevioletred, 0 1px 3px #333;
  border-radius: 20px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const ProgressBar = ({style}) => {
  return (
    <Progressbar>
      <ProgressDone style={style}></ProgressDone>
    </Progressbar>
  );
}

export default ProgressBar;

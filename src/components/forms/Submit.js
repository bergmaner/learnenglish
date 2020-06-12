import styled from "styled-components";

const Submit = styled.button`
  border: 1px solid palevioletred;
  border-radius: 5px;
  color: #a5a5a5;
  padding: 18.5px 14px;
  outline: none;
  font-size: 18px;
  transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  &:hover {
    cursor: pointer;
    background: palevioletred;
    color: white;
  }
`;

export default Submit;

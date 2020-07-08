import React from "react";
import styled from "styled-components";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { breakpoint } from "../helpers/mediaQueries";

const CirclePagination = styled(Pagination)`
&&
{
  padding: 0 50px;
  @media ${breakpoint.md}
    {
      padding: 10px 0px;
    }
  ul{
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    @media ${breakpoint.md}
    {
      display: flex;
      flex-direction: row;
      align-items: center; 
    }
  }
  
  & .MuiPaginationItem-ellipsis
  {
    color : palevioletred;
    opacity : 1;
    font-weight:700;
    font-size : 18px;
  }
  
  & .Mui-selected
  {
    opacity:1;
    background:palevioletred;
    div {
      color: #a7a7a7;
    }
    &:hover
    {
      cursor : default;
      background:palevioletred;
    }
  }
 
 button
  {
   cursor: pointer;
   background: palevioletred;
   color: #fff;
   opacity: 0.2;
   
  }
  li{
    cursor:pointer;
  }
 li:hover div button{
   opacity: 1;
 }
  }
  .Mui-selected + div{
    color: #727272;
  }
  li > div 
  {
    color: #a5a5a5;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    font-weight : 700;
    font-size : 18px; 
    &:hover{
      color: #727272;
    }
  }
}`;

const PaginationText = styled.div`
  margin: 0 5px;
  text-align: left;
  @media ${breakpoint.md} {
    display: none;
  }
`;
const StyledPaginationItem = styled.div`
  margin: 2px 10px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  @media ${breakpoint.md} {
    width: auto;
    margin: 0;
  }
`;

const CircularPagination = ({ handleClick, words, activeWord }) => {
  return (
    <CirclePagination
      renderItem={(item) => (
        <StyledPaginationItem onClick={() => handleClick(item.page - 1)}>
          <PaginationItem {...item} />
          <PaginationText>
            {item.page - 1 !== -1 ? words[item.page - 1].translation : ""}
          </PaginationText>
        </StyledPaginationItem>
      )}
      page={activeWord + 1}
      count={words.length}
      hidePrevButton
      hideNextButton
    />
  );
};
export default CircularPagination;

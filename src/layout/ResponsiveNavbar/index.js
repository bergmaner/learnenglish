import React from 'react';
import Icon from '@material-ui/core/Icon';
import styled from 'styled-components';

const ResponsiveToolbar = styled.nav`
background:#333333;
height:60px;
width:100%;

`;
const NavList =  styled.ul`
display:flex;
margin-block-start:0;
margin-block-end:0;
margin-inline-start:0;
height:100%;
align-items:center;
`;

const ListItem = styled.li`
list-style-type:none;
margin:20px 10px;
`;
//in Future it will be Link
const StyledLink = styled.div`
  color: palevioletred;
  font-weight: bold;
  text-decoration:none;
  display:flex;
  flex-direction:row-reverse;
  align-items:center;
`;
function ResponsiveNavbar({navLinks,background,hoverBackground,linkColor,logo}) {
  console.log(navLinks);
    return (
        <ResponsiveToolbar>
            <NavList>
    {navLinks.map((link,key) => <ListItem>
        <StyledLink key={key}>{link.text }<Icon style={{fontSize:20,marginRight:10}}>{link.icon}</Icon></StyledLink>
    </ListItem>)}
            </NavList>
        </ResponsiveToolbar>
        
       
    )
}
export default ResponsiveNavbar;
import React,{useState} from 'react';
import Icon from '@material-ui/core/Icon';
import styled from 'styled-components';

const ResponsiveToolbar = styled.nav`
background:#333333;
height:60px;
width:100%;
position:fixed;

`;
const NavList =  styled.ul`
background:#333333;
display: flex;
margin-block-start:0;
margin-block-end:0;
padding-inline-start:0;
height: 100%;
align-items: center;
@media screen and (max-width: 759px)
{
  height: 100%;
  width: 300px;
  position: fixed;
  left: 0;
  top: 0;
  flex-direction:column;
}
`;
const MenuIcon = styled.div`
margin-block-start:0;
margin-block-end:0;
padding-inline-start: 10px;
padding: 10px;
cursor:pointer;
`;
const Menu = styled.div`
display:flex;
align-items: center;
justify-content: flex-end;
width:96%;
@media screen and (max-width: 759px)
{
 flex-direction:column;
}
`;

const ListItem = styled.li`
list-style-type:none;
padding: 10px 20px;
cursor:pointer;
@media screen and (max-width: 759px)
{
 padding-left: 0;
 padding-right: 0;
 width:100%;
}
`;
//in Future it will be Link
const StyledLink = styled.div`
  color: palevioletred;
  font-weight: bold;
  text-decoration:none;
  display: flex;
  flex-direction:row-reverse;
  align-items: center;
  font-size: 22px;
  @media screen and (max-width: 759px)
{
 flex-direction:row;
 justify-content:space-between;
 margin-left: 20px;
 margin-right: 13px;
}
`;

function ResponsiveNavbar({navLinks,background,hoverBackground,linkColor,logo}) {

  const [ hoverIndex, setHoverIndex ] = useState(-1);
  const [ navOpen, setNavOpen ] = useState(false);

    return (
        <ResponsiveToolbar>
            <NavList>

            <MenuIcon onClick = {() => setNavOpen(!navOpen)} className = {navOpen ? 'active' : ''}>
              <Icon style={{color:'palevioletred'}}>menu</Icon>
            </MenuIcon>
            <Menu>
    {navLinks.map((link,index) => 
    <ListItem
     key={index}
     onMouseEnter = {()=> setHoverIndex(index)}
     onMouseLeave = {() => setHoverIndex(-1)}
     style = {{background: hoverIndex === index ? '#888' : '',cursor:'pointer'}}>
        <StyledLink>{link.text }<Icon style={{fontSize:22,marginRight:10}}>{link.icon}</Icon></StyledLink>
    </ListItem>)}
    </Menu>
            </NavList>
        </ResponsiveToolbar>
        
       
    )
}
export default ResponsiveNavbar;
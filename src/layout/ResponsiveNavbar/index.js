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
display: flex;
margin-block-start:0;
margin-block-end:0;
margin-inline-start:0;
height: 100%;
align-items:center;
`;

const ListItem = styled.li`
list-style-type:none;
padding: 10px 20px;
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

  const [ hoverIndex, setHoverIndex ] = useState(-1);
  const [ navOpen, setNavOpen ] = useState(false);
console.log(navOpen);
    return (
        <ResponsiveToolbar>
            <NavList>

            <figure onClick = {() => setNavOpen(!navOpen)} className = {navOpen ? 'active' : ''}>
              <Icon style={{color:'palevioletred'}}>menu</Icon>
            </figure>
            
    {navLinks.map((link,index) => 
    <ListItem
     key={index}
     onMouseEnter = {()=> setHoverIndex(index)}
     onMouseLeave = {() => setHoverIndex(-1)}
     style = {{background: hoverIndex === index ? '#888' : '',cursor:'pointer'}}>
        <StyledLink>{link.text }<Icon style={{fontSize:20,marginRight:10}}>{link.icon}</Icon></StyledLink>
    </ListItem>)}
            </NavList>
        </ResponsiveToolbar>
        
       
    )
}
export default ResponsiveNavbar;
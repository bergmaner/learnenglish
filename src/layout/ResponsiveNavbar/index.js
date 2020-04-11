import React,{useState, useEffect} from 'react';
import Icon from '@material-ui/core/Icon';
import {useSelector, useDispatch} from 'react-redux';
import {changeActiveModul} from '../../features/education/educationSlice';
import {changeActivModul} from '../../features/excercise/excerciseSlice';
import styled from 'styled-components';

const ResponsiveToolbar = styled.nav`
height: 60px;
width: 100%;
position: fixed;
box-shadow: 2px 2px 2px #ccc;
z-index:5;
user-select: none;
`;
const NavList =  styled.ul`
box-shadow: 2px 2px 2px #ccc;
display: flex;
margin-block-start:0;
margin-block-end:0;
padding-inline-start:0;
height: 100%;
align-items: center;
transition: 0.3s ease all;
@media screen and (max-width: 759px)
{
  height: 100%;
  width: 300px;
  position: fixed;
  left: -240px;
  top: 60px;
  flex-direction:column;
  &.active {
    left: 0px;
}
}
`;
const MenuIcon = styled.div`
margin-block-start:0;
margin-block-end:0;
padding-inline-start: 10px;
padding: 10px;
cursor:pointer;
visibility:hidden;
@media screen and (max-width: 759px)
{
visibility:visible;
  position:fixed;
  left: 5px;
  top: 10px;
}
`;
const Menu = styled.div`
display:flex;
align-items: center;
justify-content: flex-end;
width:96%;
@media screen and (max-width: 759px)
{
 flex-direction:column;
 width:100%;
 
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

function ResponsiveNavbar({navLinks,background,hoverBackground,linkColor}) {

  const [ hoverIndex, setHoverIndex ] = useState(-1);
  const [ navOpen, setNavOpen ] = useState(false);
  const dispatch = useDispatch();
 console.log(hoverIndex);

 const onClick = (index) =>
 {
  dispatch(changeActiveModul(Number(index)));
  dispatch(changeActivModul(Number(index)))
 }

    return (
        <ResponsiveToolbar style={{ background: background }}>
            <NavList style={{ background: background }} className = {navOpen ? 'active' : ''}>
             <MenuIcon onClick = {() => setNavOpen(!navOpen)} >
               <Icon style={{color:linkColor}}>menu</Icon>
             </MenuIcon>
            <Menu>
    {navLinks.map((link,index) => 
    <ListItem
     key = {index}
     onClick = { () => onClick(index) }
     onMouseEnter = {()=> setHoverIndex(index)}
     onMouseLeave = {() => setHoverIndex(-1)}
     style = {{background: hoverIndex === index ? hoverBackground : '', cursor:'pointer'}}>
        <StyledLink style = {{color:linkColor}}>{link.text }<Icon style={{fontSize:22,marginRight:10}}>{link.icon}</Icon></StyledLink>
    </ListItem>)}
    </Menu>
            </NavList>
        </ResponsiveToolbar>
        
       
    )
}
export default ResponsiveNavbar;
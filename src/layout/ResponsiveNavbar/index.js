import React,{ useState, useEffect } from 'react';
import { Icon, Tooltip } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import useAuthUser from '../../hooks/useAuthUser';
import { auth } from '../../services/firebase';
import { IoMdLogIn, IoMdLogOut } from 'react-icons/io';
import { TiClipboard } from "react-icons/ti";
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

const SiteName = styled(Link)`
font-size: 22px;
font-weight:bold;
text-decoration: none;
margin-block-start:0;
margin-block-end:0;
padding-inline-start: 30px;
padding: 10px;
@media screen and (max-width: 759px)
{
  padding: 10px 0px;
  text-align : center;
  position: fixed;
  width: 130px;
  left: calc(50% - 30px);
  top: 5px;
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
padding:  ${ props => props.log ? '11px 20px' : '15px 20px' };
transition: all 0.4s;
@media screen and (max-width: 759px)
{
 padding: 0px;
 width:100%;
}
`;

const StyledLink = styled(Link)`
  svg{
    margin-right: ${ props => props.account ? '0px' : '10px' };
    margin-left: ${ props => props.account ? '10px' : '0px' };
    font-size: 22px;
    @media screen and (max-width: 759px)
    {
      margin-right: ${ props => props.account || props.log ? '10px' : '0px' };
      margin-left:  ${ props => props.account || props.log ? '0px' : '10px' };

    }
  }
  font-weight: bold;
  text-decoration: none;
  display: flex;
  flex-direction: ${ props => props.log ? 'row' : 'row-reverse' };
  align-items: center;
  justify-content: space-between;
  font-size: ${ props => props.log ? '14px' : '22px' };
  @media screen and (max-width: 759px)
{
 flex-direction:row;
 justify-content:space-between;
 font-size: 22px;
 padding: 15px 13px 15px 20px;
 transition: all 0.4s;
 &:hover{
   background: ${ props => props.log ? 'rgba(219, 112, 147,0.2)' : '' };
 }
}
`;

function ResponsiveNavbar({navLinks,background,hoverBackground,linkColor}) {

  const [ hoverIndex, setHoverIndex ] = useState(-1);
  const [ navOpen, setNavOpen ] = useState(false); 
  const currentUser = useAuthUser();
  const dispatch = useDispatch();

  const handleLogOut = () =>
  {
    auth().signOut();
  }
    return (
        <ResponsiveToolbar style = {{ background: background }}>
            <NavList style = {{ background: background }} className = {navOpen ? 'active' : ''}>
             <MenuIcon onClick = {() => setNavOpen(!navOpen)} >
               <Icon style = {{ color: linkColor }}>menu</Icon>
             </MenuIcon>
      <Tooltip title = "LearnEnglish">
        <SiteName style = {{ color: linkColor }} to = {`/`}>LearnEnglish</SiteName>
      </Tooltip>     
            <Menu>
    { navLinks.map(( link, index ) => 
    <Tooltip title = { link.text }>
    <ListItem
     key = { index }
     onMouseEnter = { ()=> setHoverIndex(index) }
     onMouseLeave = { () => setHoverIndex(-1) }
     style = {{ background: hoverIndex === index ? hoverBackground : '' }}>
        <StyledLink style = {{ color: linkColor }} to = { `/education/${ link.text }` }>{ link.text }
        <Icon style={{ fontSize:22,marginRight:10 }}>{ link.icon }</Icon></StyledLink>
    </ListItem>
    </Tooltip>)}
    <ListItem log>
      { currentUser ?
    <Tooltip title = "Account">
       <StyledLink account to = '/account' style = {{ color:linkColor, flexDirection: 'row' }}>
         Account<IoMdLogOut onClick = { () => handleLogOut() }/></StyledLink > 
    </Tooltip>
       : <div>
        <Tooltip title = "Login">
         <StyledLink log to = '/login' style = {{ color:linkColor,textDecoration: 'none' }}>
           Login<IoMdLogIn/></StyledLink>
        </Tooltip>
        <Tooltip title = "Register"> 
         <StyledLink log to = '/register' style = {{ color:linkColor,textDecoration: 'none' }}>
           Register<TiClipboard/></StyledLink>
        </Tooltip> 
         </div> }
       </ListItem>
    </Menu>
            </NavList>
        </ResponsiveToolbar>
        
       
    )
}
export default ResponsiveNavbar;
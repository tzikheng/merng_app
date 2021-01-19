import { useDispatch, useSelector } from 'react-redux'
import React, { useContext, useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Icon, Menu } from 'semantic-ui-react'
import { AuthContext } from '../context/auth'
import { reduxLogout } from '../utility/actions'

function NavBar(){
  const { user, logout } = useContext(AuthContext)
  const color = (user? (user.color || 'black') : 'black')
  const pathname = window.location.pathname
  const dispatch = useDispatch()
  const reduxCart = useSelector(state => state.cart)
  let path 
  if (pathname === '/' || pathname.includes('/posts/')){
    path = 'home'
  } else if (pathname.includes('/products/')){
    path = 'market'
  } else {path = pathname.substr(1)} 
  const [activeItem, setActiveItem] = useState(path)
  useEffect(()=>{
    setActiveItem(path) 
  },[user, path, pathname])
  const handleItemClick = (e, { name }) => setActiveItem(name)
  
  function logoutAndRedirect(){
    if (pathname==='/cart' || pathname==='/profile'){
      setActiveItem('/')
    } else {
      setActiveItem(path)
    }
    // dispatch(reduxLogout)
    logout()
  }

  const NavBar = 
    <Menu 
      pointing 
      secondary 
      size='massive' 
      color={color}>
      <Menu.Item
        name={user ? user.username : 'home'}
        active={activeItem === 'home'}
        onClick={()=>{setActiveItem('home')}}
        as={Link}
        to='/'
      />
      <Menu.Item
        name='market'
        active={activeItem === 'market'}
        onClick={()=>{setActiveItem('market')}}
        as={Link}
        to='/market'
      />
      <Menu.Menu position='right'>
        { user
        ? (
          <>
            <Menu.Item
              name='cart'
              active={activeItem === 'cart'}
              onClick={handleItemClick}
              as={Link}
              to='/cart'>
                <Icon name='shopping cart'/>
                {/* <Label circular size='tiny' color={color} floating>
                  {countItems}
                </Label> */}
            </Menu.Item>
            <Menu.Item
              name='profile'
              active={activeItem === 'profile'}
              onClick={handleItemClick}
              as={Link}
              to='/profile'>
                <Icon name='user circle'/>
              </Menu.Item>
            <Menu.Item
              name='logout'
              onClick={logoutAndRedirect}>
              <Icon name='sign out'/>
            </Menu.Item>
          </>
        )
        : (
          <>
            <Menu.Item
              name='login'
              active={activeItem === 'login'}
              onClick={handleItemClick}
              as={Link}
              to='/login'/>
            <Menu.Item
              name='register'
              active={activeItem === 'register'}
              onClick={handleItemClick}
              as={Link}
              to='/register'/>
          </>
        )
      }
      </Menu.Menu>
    </Menu>
  return NavBar
}

export default withRouter(NavBar)
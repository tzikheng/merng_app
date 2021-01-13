import React, { useContext, useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import { AuthContext } from '../context/auth'

function NavBar(){
  const { user, logout } = useContext(AuthContext)
  const color = (user? (user.color || 'black') : 'black')
  const pathname = window.location.pathname
  let path 
  if (pathname === '/' || pathname.includes('/posts/')){
    path = 'home'
  } else if (pathname.includes('/products/')){
    path = 'marketplace'
  } else {path = pathname.substr(1)} 
  const [activeItem, setActiveItem] = useState(path)
  useEffect(()=>{
    setActiveItem(path) 
  },[user, path, pathname])
  const handleItemClick = (e, { name }) => setActiveItem(name)
  
  function logoutAndRedirect(){
    setActiveItem(path)
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
        name='marketplace'
        active={activeItem === 'marketplace'}
        onClick={()=>{setActiveItem('marketplace')}}
        as={Link}
        to='/marketplace'
      />
      <Menu.Menu position='right'>
        { user
        ? (<>
          <Menu.Item
            name='profile'
            active={activeItem === 'profile'}
            onClick={handleItemClick}
            as={Link}
            to='/profile'
          />
          <Menu.Item
            name='cart'
            active={activeItem === 'cart'}
            onClick={handleItemClick}
            as={Link}
            to='/cart'
          />
          <Menu.Item
            name='logout'
            onClick={logoutAndRedirect}
          />
          </>)
        : (<>
          <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={handleItemClick}
            as={Link}
            to='/login'
          />
          <Menu.Item
            name='register'
            active={activeItem === 'register'}
            onClick={handleItemClick}
            as={Link}
            to='/register'
          />
          <Menu.Item
            name='cart'
            active={activeItem === 'cart'}
            onClick={handleItemClick}
            as={Link}
            to='/cart'
          />
          </>)  
      }
      </Menu.Menu>
    </Menu>
  return NavBar
}

export default withRouter(NavBar)
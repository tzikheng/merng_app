import React, { useContext, useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth';

// export default class MenuExampleSecondaryPointing extends Component {
function MenuBar(){
  const { user, logout } = useContext(AuthContext)
  const color = localStorage.getItem('color') || 'black'
  const pathname = window.location.pathname
  const path = pathname === '/' ? 'home' : pathname.substr(1)
  const [activeItem, setActiveItem] = useState(path)

  const handleItemClick = (e, { name }) => setActiveItem(name)
  function logoutAndRedirect(){
    setActiveItem('home')
    logout()
  }

  const menuBar = user ? (
    <Menu pointing secondary size='massive' color={color}>
      <Menu.Item
        name={user.username}
        active={activeItem === 'home'}
        onClick={()=>{setActiveItem('home')}}
        as={Link}
        to='/'
      />
      <Menu.Menu position='right'>
        <Menu.Item
          name='profile'
          active={activeItem === 'profile'}
          onClick={handleItemClick}
          as={Link}
          to='/profile'
        />
        <Menu.Item
          name='logout'
          onClick={logoutAndRedirect}
          as={Link}
          to='/'
        />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size='massive' color={color}>
      <Menu.Item
        name='home'
        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={Link}
        to='/'
      />
      <Menu.Menu position='right'>
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
      </Menu.Menu>
    </Menu>
  )
  return menuBar
}


export default MenuBar;
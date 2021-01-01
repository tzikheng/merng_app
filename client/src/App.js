import { createBrowserHistory } from 'history'
import React from 'react'
import { Route, Router } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react'
import './App.css'
import NavBar from './components/NavBar'
import { AuthProvider } from './context/auth.js'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Register from './pages/Register'
import SinglePost from './pages/SinglePost'
import Marketplace from './pages/Marketplace'
import AuthRoute from './utility/AuthRoute.js'


function App(){
  const history = createBrowserHistory()
  
  return (
    <AuthProvider>
      <Router history={history}>
        <Container textAlign='left'>
          <NavBar/>
          <Route exact path='/' component={Home}/>
          <Route exact path='/marketplace' component={Marketplace}/>
          <AuthRoute exact path='/login' component={Login}/>
          <AuthRoute exact path='/register' component={Register}/>
          <Route exact path='/profile' component={Profile}/>
          <Route exact path='/posts/:postId' component={SinglePost}/>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;

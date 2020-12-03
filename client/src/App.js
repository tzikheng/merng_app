import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import { AuthProvider } from './context/auth.js'
import AuthRoute from './utility/AuthRoute.js'
import 'semantic-ui-css/semantic.min.css'
import './App.css'

import MenuBar from './components/MenuBar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import SinglePost from './pages/SinglePost'

function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <Container textAlign='left'>
          <MenuBar />
          <Route exact path='/' component={Home}/>
          <AuthRoute exact path='/login' component={Login}/>
          <AuthRoute exact path='/register' component={Register}/>
          <Route exact path='/posts/:postId' component={SinglePost}/>
        </Container>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

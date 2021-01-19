import { createBrowserHistory } from 'history'
import React from 'react'
import { Route, Router } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react'
import './App.css'
import NavBar from './components/NavBar'
import { AuthProvider } from './context/auth.js'
import Cart from './pages/Cart'
import Home from './pages/Home'
import Login from './pages/Login'
import Market from './pages/Market'
import Profile from './pages/Profile'
import Register from './pages/Register'
import SinglePost from './pages/SinglePost'
import SingleProduct from './pages/SingleProduct'
import AuthRoute from './utility/AuthRoute.js'

function App(){
  const history = createBrowserHistory()
  
  return (
    <AuthProvider>
      <Router history={history}>
        <Container textAlign='left'>
          <NavBar/>
          <Route exact path='/' component={Home}/>
          <Route exact path='/market' component={Market}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/register' component={Register}/>
          <AuthRoute exact path='/profile' component={Profile}/>
          <AuthRoute exact path='/cart' component={Cart}/>
          <Route exact path='/posts/:postId' component={SinglePost}/>
          <Route exact path='/products/:productId' component={SingleProduct}/>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;

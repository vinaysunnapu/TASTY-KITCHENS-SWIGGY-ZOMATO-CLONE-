import {Route, Switch, Redirect} from 'react-router-dom'

import './App.css'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import FoodItems from './components/FoodItems'
import Cart from './components/Cart'
import PaymentSuccessful from './components/PaymentSuccessful'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/home/:id" component={FoodItems} />
    <ProtectedRoute exact path="/cart" component={Cart} />
    <ProtectedRoute exact path="/success" component={PaymentSuccessful} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App

import {Route, Switch, Redirect} from 'react-router-dom'

import './App.css'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import FoodItems from './components/FoodItems'
import Cart from './components/Cart'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <Route exact path="/" component={Home} />
    <Route exact path="/home/:id" component={FoodItems} />
    <Route exact path="/cart" component={Cart} />
  </Switch>
)

export default App

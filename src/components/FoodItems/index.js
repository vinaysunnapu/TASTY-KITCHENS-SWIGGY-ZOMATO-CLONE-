import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'
import {AiFillStar} from 'react-icons/ai'

import Header from '../Header'
import Footer from '../Footer'
import FoodItemCard from '../FoodItemCard'

class FoodItems extends Component {
  state = {
    cartList: [],
    foodItems: [],
    restData: {},
  }

  componentDidMount() {
    this.getFoodItems()
    this.getCartDataFromLocalStorage()
    // localStorage.clear()
  }

  getCartDataFromLocalStorage = () => {
    const cartData = localStorage.getItem('cartData')
    if (cartData === null) {
      return
    }
    try {
      const parsedCartData = JSON.parse(cartData)
      this.setState({cartList: parsedCartData})
    } catch (error) {
      console.error(error)
    }
  }

  addCartItem = product => {
    // console.log(product)
    const {cartList} = this.state
    const productObject = cartList.find(
      eachCartItem => eachCartItem.foodId === product.foodId,
    )
    // console.log(productObject)
    if (productObject) {
      this.setState(
        prevState => ({
          cartList: prevState.cartList.map(eachCartItem => {
            if (eachCartItem.foodId === product.foodId) {
              const updatedQuantity = eachCartItem.quantity + product.quantity
              return {...eachCartItem, quantity: updatedQuantity}
            }
            return eachCartItem
          }),
        }),
        this.addToLocalStorage,
      )
    } else {
      this.setState({cartList: [...cartList, product]}, this.addToLocalStorage)
    }
  }

  addToLocalStorage = () => {
    const {cartList} = this.state

    localStorage.setItem('cartData', JSON.stringify(cartList))
  }

  getFoodItems = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const restrauntId = id
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list/${restrauntId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data)

    const formattedRestData = {
      costForTwo: data.cost_for_two,
      restId: data.id,
      restImageUrl: data.image_url,
      location: data.location,
      name: data.name,
      rating: data.rating,
      reviewCount: data.reviews_count,
    }
    const formattedFoodItems = data.food_items.map(each => ({
      cost: each.cost,
      foodId: each.id,
      foodImageUrl: each.image_url,
      foodName: each.name,
      foodRating: each.rating,
    }))

    this.setState({restData: formattedRestData, foodItems: formattedFoodItems})
  }

  renderRestaurantDetails = () => {
    const {restData, foodItems} = this.state
    return (
      <div className="rest-banner-container">
        <img
          src={restData.restImageUrl}
          alt="restaurant"
          className="rest-banner-image"
        />
        <div className="rest-details-container">
          <h1 className="rest-heading">{restData.name}</h1>
          <p className="rest-location">{restData.location}</p>
          <div className="rating-container">
            <div>
              <span>
                <AiFillStar />
                {restData.rating}
              </span>
              <p>{restData.reviewCount}+ Ratings</p>
            </div>
            <div>
              <p>Rs {restData.costForTwo}</p>
              <p>Cost for two</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {restData, foodItems, cartList} = this.state
    // console.log(restData)
    // console.log(foodItems)
    console.log(cartList)

    return (
      <>
        <Header />
        {this.renderRestaurantDetails()}
        <ul className="food-items-container">
          {foodItems.map(eachItem => (
            <FoodItemCard
              foodItemDetails={eachItem}
              key={eachItem.foodId}
              addCartItem={this.addCartItem}
            />
          ))}
        </ul>
        <Footer />
      </>
    )
  }
}
export default FoodItems

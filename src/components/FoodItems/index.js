import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'
import {AiFillStar} from 'react-icons/ai'

import Header from '../Header'
import Footer from '../Footer'
import FoodItemCard from '../FoodItemCard'

class FoodItems extends Component {
  state = {
    foodItems: [],
    restData: {},
    cartData: JSON.parse(localStorage.getItem('cartData')),
  }

  componentDidMount() {
    this.getFoodItems()
  }

  cartItems = foodItemDetails => {
    const {cartData} = this.state
    this.setState(
      prevState => ({
        cartData: [...prevState.cartData, foodItemDetails],
      }),
      this.storingLocalStorage,
    )
  }

  storingLocalStorage = () => {
    const {cartData} = this.state
    localStorage.setItem('cartData', JSON.stringify(cartData))
    console.log(cartData)
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
    console.log(data)

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
    const {restData, foodItems, cartData} = this.state
    // console.log(restData)
    // console.log(foodItems)

    return (
      <>
        <Header />
        {this.renderRestaurantDetails()}
        <ul className="food-items-container">
          {foodItems.map(eachItem => (
            <FoodItemCard
              foodItemDetails={eachItem}
              key={eachItem.foodId}
              cartItems={this.cartItems}
            />
          ))}
        </ul>
        <Footer />
      </>
    )
  }
}
export default FoodItems

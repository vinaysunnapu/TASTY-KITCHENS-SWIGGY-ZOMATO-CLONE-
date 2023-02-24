import {Component} from 'react'

import './index.css'

let itemQuantity

class CartItem extends Component {
  state = {cartList: []}

  componentDidMount() {
    this.getDataFromLocalStorage()
  }

  getDataFromLocalStorage = () => {
    const cartList = JSON.parse(localStorage.getItem('cartData'))
    this.setState({cartList})
  }

  storingLocalStorage = () => {
    const {getCartDetails} = this.props
    const {cartList} = this.state
    localStorage.setItem('cartData', JSON.stringify(cartList))
    this.getDataFromLocalStorage()
    getCartDetails(cartList)
  }

  onDecreaseQuantity = () => {
    // const {cartList} = this.state
    // console.log(cartList, foodId)

    // itemQuantity -= 1
    const {cartItemDetails} = this.props
    const {foodId, quantity} = cartItemDetails
    // itemQuantity = quantity

    this.setState(
      prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (eachCartItem.foodId === foodId) {
            if (eachCartItem.quantity > 0) {
              const updatedQuantity = eachCartItem.quantity - 1
              // itemQuantity = updatedQuantity
              return {...eachCartItem, quantity: updatedQuantity}
            }
          }
          return eachCartItem
        }),
      }),
      this.storingLocalStorage,
    )
  }

  onIncreaseQuantity = () => {
    // itemQuantity += 1
    const {cartItemDetails} = this.props
    const {foodId, quantity} = cartItemDetails
    // itemQuantity = quantity

    this.setState(
      prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (foodId === eachCartItem.foodId) {
            const updatedQuantity = eachCartItem.quantity + 1
            // itemQuantity = updatedQuantity
            return {...eachCartItem, quantity: updatedQuantity}
          }
          return eachCartItem
        }),
      }),
      this.storingLocalStorage,
    )
  }

  getCartItemsView = () => {
    const {cartItemDetails} = this.props
    const {
      cost,
      foodId,
      foodImageUrl,
      foodName,
      foodRating,
      quantity,
    } = cartItemDetails

    // itemQuantity = quantity

    const cartList = JSON.parse(localStorage.getItem('cartData'))
    // console.log(cartList)

    const res = cartList.filter(each => each.foodId === foodId)
    itemQuantity = res[0].quantity

    return (
      <>
        <li className="cart-list-item-container">
          <img src={foodImageUrl} alt="cart" className="cart-image" />
          <div className="cart-list-details-container">
            <h1 className="cart-heading">{foodName}</h1>
            <div className="counter-container">
              <button type="button" onClick={this.onDecreaseQuantity}>
                -
              </button>
              <div>{itemQuantity}</div>
              <button type="button" onClick={this.onIncreaseQuantity}>
                +
              </button>
            </div>
            <p className="cost-style">RS {cost * itemQuantity}</p>
          </div>
        </li>
        <li className="cart-list-item-desktop-container">
          <div className="desktop-food-image-container">
            <img src={foodImageUrl} alt="cart" className="cart-image" />
            <h1 className="cart-heading">{foodName}</h1>
          </div>
          <div className="counter-container">
            <button type="button" onClick={this.onDecreaseQuantity}>
              -
            </button>
            <div>{itemQuantity}</div>
            <button type="button" onClick={this.onIncreaseQuantity}>
              +
            </button>
          </div>
          <p className="cost-style">RS {cost * itemQuantity}</p>
        </li>
      </>
    )
  }

  render() {
    return <>{this.getCartItemsView()}</>
  }
}
export default CartItem

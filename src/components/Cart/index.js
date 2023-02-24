import {Link} from 'react-router-dom'
import {useState} from 'react'
import './index.css'
import Header from '../Header'
import Footer from '../Footer'
import CartItem from '../CartItem'

let cartItems

// let totalList = []

const Cart = () => {
  let price = 0
  const cartList = JSON.parse(localStorage.getItem('cartData'))
  if (cartList === null) {
    cartItems = []
  } else {
    cartItems = cartList
  }

  const [cart, setCart] = useState(cartItems)
  // console.log(cartItems)

  const showNoOrders = cartItems.length > 0

  //   if (cartItems !== null) {
  //     cartItems.map(each => {
  //       price += each.price * each.quantity
  //       return price
  //     })
  //     return price
  //   }

  const getCartDetails = items => {
    setCart(items)
  }

  const totalCost = cart.map(each => {
    price += each.cost * each.quantity

    return price
  })

  return (
    <>
      <Header />
      {!showNoOrders ? (
        <div className="no-orders-container">
          <img
            src="https://res.cloudinary.com/dcauubpq9/image/upload/v1676266397/Layer_2_cs8nm8.png"
            alt="empty cart"
          />
          <h1 className="no-order-heading">No Orders Yet!</h1>
          <p className="no-orders-para">
            Your cart is empty. Add something from the menu
          </p>
          <Link to="/">
            <button type="button" className="order-now-button">
              Order Now
            </button>
          </Link>
        </div>
      ) : (
        <>
          <ul className="cart-list-container">
            {cartItems.map(eachCart => (
              <CartItem
                cartItemDetails={eachCart}
                key={eachCart.foodId}
                getCartDetails={getCartDetails}
              />
            ))}
          </ul>
          <hr className="cart-hor-line" />
          <div className="order-total-main-container">
            <div className="order-container">
              <p className="order-text">Order Total:</p>
              <p className="order-cost">RS {price}</p>
            </div>
            <Link to="/success">
              <button type="button" className="place-order-button">
                Place Order
              </button>
            </Link>
          </div>
        </>
      )}

      <Footer />
    </>
  )
}

export default Cart

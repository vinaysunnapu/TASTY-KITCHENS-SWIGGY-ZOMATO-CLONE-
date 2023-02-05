import './index.css'
import Header from '../Header'
import Footer from '../Footer'
import CartItem from '../CartItem'

const Cart = () => {
  const cartList = JSON.parse(localStorage.getItem('cart'))
  console.log(cartList)
  return (
    <>
      <Header />
      <ul className="cart-list-container">
        {cartList.map(eachCart => (
          <CartItem cartItemDetails={eachCart} key={eachCart.foodId} />
        ))}
      </ul>

      <Footer />
    </>
  )
}

export default Cart

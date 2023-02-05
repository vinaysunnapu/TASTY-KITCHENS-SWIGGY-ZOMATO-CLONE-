import './index.css'

const CartItem = props => {
  const {cartItemDetails} = props
  const {cost, foodId, foodImageUrl, foodName, foodRating} = cartItemDetails

  return (
    <li className="cart-list-item-container">
      <img src={foodImageUrl} alt="cart" className="cart-image" />
      <div className="cart-list-details-container">
        <h1 className="cart-heading">{foodName}</h1>
        <div className="counter-container">
          <button type="button">-</button>
          <div>0</div>
          <button type="button">+</button>
        </div>
        <p className="cost-style">RS {cost}</p>
      </div>
    </li>
  )
}
export default CartItem

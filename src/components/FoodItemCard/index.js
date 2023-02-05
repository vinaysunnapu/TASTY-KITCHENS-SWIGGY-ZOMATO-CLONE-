import './index.css'
import {AiFillStar} from 'react-icons/ai'

const FoodItemCard = props => {
  const {foodItemDetails, cartItems} = props
  const {cost, foodId, foodImageUrl, foodName, foodRating} = foodItemDetails
  const onClickAddToAddCart = () => {
    cartItems(foodItemDetails)
  }

  return (
    <li className="food-item-container">
      <img src={foodImageUrl} alt="foodItem" className="food-image" />
      <div className="item-details-container">
        <h1 className="heading">{foodName}</h1>
        <p>Rs {cost}</p>
        <span>
          <AiFillStar color="#FFCC00" />
          {foodRating}
        </span>
        <br />
        <div className="add-container">
          <button
            type="button"
            className="add-button"
            onClick={onClickAddToAddCart}
          >
            ADD
          </button>
          <div className="counter-container">
            <button type="button">-</button>
            <div>0</div>
            <button type="button">+</button>
          </div>
        </div>
      </div>
    </li>
  )
}
export default FoodItemCard

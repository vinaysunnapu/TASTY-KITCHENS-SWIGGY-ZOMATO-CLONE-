import {useState} from 'react'
import './index.css'
import {AiFillStar} from 'react-icons/ai'
// import Counter from '../Counter'

const FoodItemCard = props => {
  const [quantity, setQuantity] = useState(1)

  const {foodItemDetails, addCartItem} = props
  const {cost, foodId, foodImageUrl, foodName, foodRating} = foodItemDetails

  const onIncrementQuantity = () => {
    setQuantity(prevState => prevState + 1)
  }

  const onDecrementQuantity = () => {
    setQuantity(prevState => prevState - 1)
  }

  const onClickAddToAddCart = () => {
    addCartItem({...foodItemDetails, quantity})
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
            <button type="button" onClick={onDecrementQuantity}>
              -
            </button>
            <div>{quantity}</div>
            <button type="button" onClick={onIncrementQuantity}>
              +
            </button>
          </div>
        </div>
      </div>
    </li>
  )
}
export default FoodItemCard

import './index.css'
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'

const RestaurantCard = props => {
  const {restCard} = props
  const {id, imageUrl, name, rating, totalReviews} = restCard
  return (
    <li className="rest-list-item">
      <Link to={`/home/${id}`}>
        <img src={imageUrl} alt="restaurant" className="rest-image" />
      </Link>
      <div className="rest-content-container">
        <h1 className="rest-name">{name}</h1>
        <p>Fast Food</p>
        <div className="rating-container">
          <AiFillStar color="#FFCC00" />
          <p>
            {rating} ({totalReviews} ratings)
          </p>
        </div>
      </div>
    </li>
  )
}
export default RestaurantCard

import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

import Slider from 'react-slick'
import {MdSort} from 'react-icons/md'
import {FaLessThan, FaGreaterThan} from 'react-icons/fa'

import RestaurantCard from '../RestaurantCard'
import Footer from '../Footer'
import Header from '../Header'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const settings = {
  dots: true,
}

const restApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    restData: [],
    offersData: [],
    restApiStatus: restApiStatusConstants.initial,
    sortByValue: sortByOptions[0].value,
  }

  componentDidMount() {
    this.getOffersData()
    this.getRestaurantsData()
  }

  onChangeSortByOptions = event => {
    this.setState({sortByValue: event.target.value}, this.sortByRestaurantsData)
  }

  sortByRestaurantsData = () => {
    this.getRestaurantsData()
  }

  getRestaurantsData = async () => {
    const {sortByValue} = this.state
    this.setState({restApiStatus: restApiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=0&limit=9&sort-by-rating=${sortByValue}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const restformattedData = data.restaurants.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
        name: each.name,
        rating: each.user_rating.rating,
        totalReviews: each.user_rating.total_reviews,
      }))
      console.log(restformattedData)
      this.setState({
        restData: restformattedData,
        restApiStatus: restApiStatusConstants.success,
      })
    } else {
      this.state({restApiStatus: restApiStatusConstants.failure})
    }
  }

  getOffersData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    const offersData = await response.json()
    const formattedOffersData = offersData.offers.map(each => ({
      imageUrl: each.image_url,
      id: each.id,
    }))

    console.log(formattedOffersData)
    this.setState({offersData: formattedOffersData})
  }

  renderRestaurantsListView = () => {
    const {restData} = this.state
    return (
      <ul className="restaurant-list-container">
        {restData.map(eachRest => (
          <RestaurantCard restCard={eachRest} key={eachRest.id} />
        ))}
      </ul>
    )
  }

  renderRestaurantsLoadingView = () => (
    <div className="rest-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderRestaurantsDetails = () => {
    const {restApiStatus} = this.state

    switch (restApiStatus) {
      case restApiStatusConstants.success:
        return this.renderRestaurantsListView()
      case restApiStatusConstants.failure:
        return this.renderRestaurantsFailureView()
      case restApiStatusConstants.inProgress:
        return this.renderRestaurantsLoadingView()
      default:
        return null
    }
  }

  render() {
    const {offersData, sortByValue} = this.state
    console.log(sortByValue)
    return (
      <>
        <Header />
        <div className="home-container">
          <Slider {...settings}>
            {offersData.map(eachOffer => (
              <div key={eachOffer.id}>
                <img
                  src={eachOffer.imageUrl}
                  alt="offer"
                  className="offer-image"
                />
              </div>
            ))}
          </Slider>
          <div className="Popular-Restaurants-container">
            <h1 className="Popular-Restaurants-heading">Popular Restaurants</h1>
            <div className="para-sort-container">
              <p className="home-paragraph">
                Select Your favourite restaurant special dish and make your day
                happy...
              </p>
              <div className="sort-by-container">
                <MdSort />
                <p className="sort-by-para">Sort by</p>
                <select
                  name="sortBy"
                  onChange={this.onChangeSortByOptions}
                  value={sortByValue}
                >
                  {sortByOptions.map(eachOption => (
                    <option
                      key={eachOption.id}
                      value={eachOption.displayText}
                      className="select-option"
                    >
                      {eachOption.displayText}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {this.renderRestaurantsDetails()}
          <div className="pagination-container">
            <button type="button" className="page-button">
              <FaLessThan />
            </button>
            <p className="pagination-style">
              <span>1</span>of 4
            </p>
            <button type="button" className="page-button">
              <FaGreaterThan />
            </button>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default Home

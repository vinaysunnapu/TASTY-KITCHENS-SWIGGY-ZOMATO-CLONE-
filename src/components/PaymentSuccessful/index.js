import './index.css'
import {Link} from 'react-router-dom'

import {AiFillCheckCircle} from 'react-icons/ai'
import Header from '../Header'

const PaymentSuccessful = props => {
  const onGotoHomePage = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <>
      <Header />
      <div className="payment-container">
        <AiFillCheckCircle size="50" color="#22C55E" />
        <h1 className="payment-success">Payment Successful</h1>
        <p className="success-para">
          Thank you for ordering Your payment is successfully completed.
        </p>

        <button
          type="button"
          className="success-view-button"
          onClick={onGotoHomePage}
        >
          Go To Home Page
        </button>
      </div>
    </>
  )
}
export default PaymentSuccessful

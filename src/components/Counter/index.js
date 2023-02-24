import {Component} from 'react'

import './index.css'

class Counter extends Component {
  state = {quantity: 1}

  onClickIncreaseQuantity = () => {
    this.setState(
      prevState => ({quantity: prevState.quantity + 1}),
      this.passingQuantity,
    )
  }

  onClickDecreaseQuantity = () => {
    this.setState(
      prevState => ({quantity: prevState.quantity - 1}),
      this.passingQuantity,
    )
  }

  passingQuantity = () => {
    const {passedQuantityValue} = this.props
    const {quantity} = this.state
    passedQuantityValue(quantity)
  }

  render() {
    // console.log(cartList)
    const {quantity} = this.state

    return (
      <div className="counter-container">
        <button type="button" onClick={this.onClickDecreaseQuantity}>
          -
        </button>
        <div>{quantity}</div>
        <button type="button" onClick={this.onClickIncreaseQuantity}>
          +
        </button>
      </div>
    )
  }
}

export default Counter

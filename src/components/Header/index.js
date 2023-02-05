import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'
import Popup from 'reactjs-popup'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'

class Header extends Component {
  render() {
    return (
      <nav className="nav-container">
        <div className="header-container">
          <div className="header-logo-container">
            <img
              src="https://res.cloudinary.com/dcauubpq9/image/upload/v1674875356/Group_7420_tjlrcp.png"
              alt="website logo"
              className="header-logo-image"
            />
            <h1 className="header-heading">Tasty Kitchens</h1>
          </div>
          <ul className="header-items-container">
            <Link to="/" className="link-item">
              <li className="header-home">Home</li>
            </Link>
            <Link to="/cart" className="link-item">
              <li className="header-cart">Cart</li>
            </Link>
            <li>
              <button type="button" className="logout-button">
                Logout
              </button>
            </li>
          </ul>
        </div>
        <div className="mobile-header-container">
          <div className="mobile-logo-container">
            <img
              src="https://res.cloudinary.com/dcauubpq9/image/upload/v1674875356/Group_7420_tjlrcp.png"
              alt="website logo"
              className="mobile-header-logo-image"
            />
            <h1 className="mobile-header-heading">Tasty Kitchens</h1>
          </div>
          <div className="popup-container">
            <Popup
              modal
              trigger={
                <button type="button" className="trigger-button">
                  <GiHamburgerMenu />
                </button>
              }
              position="bottom left"
            >
              {close => (
                <div className="nav-list-bg-container">
                  <ul className="mobile-nav-list-container">
                    <Link to="/" className="link-item">
                      <li className="mobile-nav-home">Home</li>
                    </Link>
                    <Link to="/cart" className="link-item">
                      <li className="mobile-nav-cart">Cart</li>
                    </Link>
                    <li>
                      <button type="button" className="mobile-logout-button">
                        Logout
                      </button>
                    </li>
                  </ul>
                  <button
                    type="button"
                    className="close-button"
                    onClick={() => close()}
                  >
                    <AiFillCloseCircle />
                  </button>
                </div>
              )}
            </Popup>
          </div>
        </div>
      </nav>
    )
  }
}
export default Header

import './index.css'
import {FaPinterestP, FaTwitter, FaFacebookSquare} from 'react-icons/fa'
import {BsInstagram} from 'react-icons/bs'

const Footer = () => (
  <div className="footer-container">
    <div className="footer-logo-container">
      <img
        src="https://res.cloudinary.com/dcauubpq9/image/upload/v1675139156/Group_7420_mhgait.png"
        alt="website-footer-logo"
        className="footer-logo-image"
      />
      <h1 className="Footer-heading">Tasty Kitchens</h1>
    </div>
    <p className="footer-para">
      The only thing we are serious about is food. Contact us on
    </p>
    <div className="social-icons-container">
      <FaPinterestP color="#ffffff" />
      <BsInstagram color="#ffffff" />
      <FaTwitter color="#ffffff" />
      <FaFacebookSquare color="#ffffff" />
    </div>
  </div>
)
export default Footer

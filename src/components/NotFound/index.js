import './index.css'

const NotFound = props => {
  const onClickHome = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dcauubpq9/image/upload/v1676350343/Group_1_lentsn.png"
        alt="not found"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-para">
        We are sorry, the page you requested could not be found. Please go back
        to the homepage
      </p>
      <button type="button" className="not-found-button" onClick={onClickHome}>
        Home Page
      </button>
    </div>
  )
}
export default NotFound

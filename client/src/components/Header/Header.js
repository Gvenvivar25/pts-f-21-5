import { Component } from '../../react/newVersion/Component'
import { Link } from '../../react/react'

class Header extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <header>
        <div className="header_content">
          <Link href="/">
            <h1>PREMIUM SHOP</h1>
          </Link>

          <ul className="header_menu">
            <li className="header_menu_item">
              <Link href="/wishlist" className="wish">
                <span className="text">Wishlist</span>
                <span className="index">({JSON.parse(localStorage.getItem('wishlist')).length})</span>
              </Link>
            </li>
            <li className="header_menu_item">
              <Link href="/shopping-card" className="cart">
                <span className="text">Shopping cart</span>
                <span className="index">({JSON.parse(localStorage.getItem('cart')).length})</span>
              </Link>
            </li>
            <li className="header_menu_item">
              <Link href="/" classNameName="login">
                <span className="text">Login</span>
              </Link>
              <span className="or text">or</span>
              <Link href="/">
                <span className="text">Create account</span>
              </Link>
            </li>
          </ul>
        </div>
      </header>
    )
  }
}

export default Header

import { Component } from '../../react/newVersion/Component'
import { Link } from '../../react/react'

class Header extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <header>
        <div class="header_content">
          <Link href="/">
            <h1>PREMIUM SHOP</h1>
          </Link>

          <ul class="header_menu">
            <li class="header_menu_item">
              <Link href="/wishlist" className="wish">
                <span class="text">Wishlist</span>
                <span class="index">(0)</span>
              </Link>
            </li>
            <li class="header_menu_item">
              <Link href="/cart" className="cart">
                <span class="text">Shopping card</span>
                <span class="index">(0)</span>
              </Link>
            </li>
            <li class="header_menu_item">
              <Link href="/" className="login">
                <span class="text">Login</span>
              </Link>
              <span class="or text">or</span>
              <Link href="/">
                <span class="text">Create account</span>
              </Link>
            </li>
          </ul>
        </div>
      </header>
    )
  }
}

export default Header

import { Component } from '/react/newVersion/Component'
import { Link } from '/react/react'

class Menu extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="nav_container">
        <div className="logoWoT"></div>
        <nav>
          <div className="content-wh content-wh-end">
            <ul className="nav_menu">
              <li className="nav_menu_item">
                <Link href="/" classActive="active_itm">
                  All
                </Link>
              </li>
              <li className="nav_menu_item">
                <Link href="/" classActive="active_itm" search="?type=vehicles">
                  Vehicles
                </Link>
              </li>
              <li className="nav_menu_item">
                <Link href="/" classActive="active_itm" search="?type=gold">
                  Gold
                </Link>
              </li>
              <li className="nav_menu_item">
                <Link
                  href="/"
                  classActive="active_itm"
                  search="?type=premiun-account"
                >
                  Premium account
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

export default Menu

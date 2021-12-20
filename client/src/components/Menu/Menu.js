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
                <Link href="/?type=vehicles" classActive="active_itm">
                  Vehicles
                </Link>
              </li>
              <li className="nav_menu_item">
                <Link href="/?type=gold" classActive="active_itm">
                  Gold
                </Link>
              </li>
              <li className="nav_menu_item">
                <Link href="/?type=premiun-account" classActive="active_itm">
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

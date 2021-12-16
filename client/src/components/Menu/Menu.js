import { Component } from '/react/newVersion/Component'
import { Link } from '/react/react'

class Menu extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div class="nav_container">
        <div class="logoWoT"></div>
        <nav>
          <div class="content-wh content-wh-end">
            <ul class="nav_menu">
              <li class="nav_menu_item">
                <Link href="/?type=all" classActive="active_itm">
                  All
                </Link>
              </li>
              <li class="nav_menu_item">
                <Link href="/?type=vehicles" classActive="active_itm">
                  Vehicles
                </Link>
              </li>
              <li class="nav_menu_item">
                <Link href="/?type=gold" classActive="active_itm">
                  Gold
                </Link>
              </li>
              <li class="nav_menu_item">
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

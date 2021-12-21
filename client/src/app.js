// import router from './route/route'
// import dynamic from './middleware/dynamic'
// import getPathLink from './middleware/pathLink'
import { Component } from './react/newVersion/Component'
// import { NestedApp, NestedApp2 } from './test'
import { Route, BrowserRouter as Router } from './react/react'
import Header from './components/Header/Header'
import Menu from './components/Menu/Menu'
import Main from './pages/main'
import Wishlist from './pages/wishlist'
import ShoppingCart from './pages/shoppingCart'
import ProductPage from './pages/productPage'
import { setAllWishlist } from './redux/wishlist-reducer'
import { dispatch, subscriberStore } from './redux/redux-store'
import { getWishlist } from './redux/wishlist-selectors'
import { setAllShoppingCart } from './redux/shoppingCart-reducer'
import { getShoppingCart } from './redux/shoppingCart-selectors'
// import vehiclesType from '/client/src/modules/main/VehiclesType/vehiclesType'

class App extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     wishlistLength: getWishlist().length,
  //   }
  // }

  componentDidMount() {
    subscriberStore.push(this.updateCopmonent.bind(this))
    dispatch(setAllWishlist())
    dispatch(setAllShoppingCart())
  }

  // componentDidUpdate() {
  //   console.log('UPDATE APP', getWishlist().length)
  // }

  render() {
    return (
      <div className="wrapper">
        <Header
          wishlistLength={getWishlist().length}
          shoppingCartLength={getShoppingCart().length}
        />
        <Menu />
        <main>
          <Router>
            <Route path="/" component={<Main />} />
            <Route path="/wishlist" component={<Wishlist />} />
            <Route path="/shopping-cart" component={<ShoppingCart />} />
            <Route path="/product" component={<ProductPage />} />
          </Router>
        </main>
        {/* <Link href="/test" className="item" classActive={'kek'}>
          TEST LINK
        </Link>
        <Link href="/test2" className="item" classActive={'kek'}>
          TEST LINK2
        </Link>
        <Router>
          <Route
            path="/test"
            // render={dynamicNestedApp}
            component={<NestedApp />}
          />
          <Route
            path="/test2"
            // render={dynamicNestedApp}
            component={<NestedApp2 />}
          />
        </Router> */}
      </div>
    )
  }
}

export default App

// if (module.hot) {
//   module.hot.accept()
// }

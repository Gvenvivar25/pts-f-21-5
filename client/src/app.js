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
import Cart from './pages/cart'

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Header />
        <Menu />
        <main>
          <Router>
            <Route path="/" component={<Main />} />
            <Route path="/wishlist" component={<Wishlist />} />
            <Route path="/cart" component={<Cart />} />
            <Route path="/product" component={<Cart />} />
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

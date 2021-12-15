// import router from './route/route'
import dynamic from './middleware/dynamic'
import getPathLink from './middleware/pathLink'
import { Component } from './react/newVersion/Component'
import { NestedApp, NestedApp2 } from './test'
import router, { Link, Route, BrowserRouter as Router } from './react/react'
import Header from './components/Header/Header'
import Menu from './components/Menu/Menu'
import Main from './pages/main'
import Wishlist from './pages/wishlist'
import Cart from './pages/cart'

// const routers = [
//   ['/', dynamic(() => import('./pages/main'))],
//   ['/wishlist', dynamic(() => import('./pages/wishlist'))],
//   ['/cart', () => 'cart'],
//   ['/404', () => '404'],
// ]
const dynamicNestedApp = dynamic(() => import('./test'))
// router.setRoutes(routers)
// console.log(dynamicNestedApp)
class App extends Component {
  constructor() {
    super()
    // this.state = {
    //   counter: 1,
    // }
  }

  // componentWillUnmount() {
  //   console.log('UNMOUNT')
  //   clearInterval(this.timerID)
  // }

  // tick() {
  //   this.setState({ counter: this.state.counter + 1 })
  // }

  // handleClick = () => {
  //   clearInterval(this.timerID)
  // }

  render() {
    // const { counter } = this.state

    return (
      <div className="wrapper">
        <Header />
        <Menu />
        <Router>
          <Route path="/" component={<Main search={router.query} />} />
          <Route path="/wishlist" component={<Wishlist />} />
          <Route path="/cart" component={<Cart />} />
        </Router>
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

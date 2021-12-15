// import router from './route/route'
import dynamic from './middleware/dynamic'
import getPathLink from './middleware/pathLink'
import { Component } from './react/newVersion/Component'
import NestedApp from './test'
import { Link, Route } from './react/react'

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
    this.state = {
      counter: 1,
    }
  }

  componentDidMount() {
    console.log('MOUNT')
    // this.timerID = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    console.log('UNMOUNT')
    clearInterval(this.timerID)
  }

  componentDidUpdate() {
    console.log('Update')
  }

  tick() {
    this.setState({ counter: this.state.counter + 1 })
    console.log(this.state.counter)
  }

  handleClick = () => {
    clearInterval(this.timerID)
  }

  render() {
    const { counter } = this.state

    return (
      <div
      // style={{
      //   height: `${10 * counter}px`,
      //   background: '#' + Math.floor(Math.random() * 16777215).toString(16),
      // }}
      >
        {/* <p>the counter is {counter}</p>
        <h2
          style={{
            color: '#' + Math.floor(Math.random() * 16777215).toString(16),
          }}
        >
          {'BOOM!!'.repeat(counter)}
        </h2>
        <button id="test" onClick={this.handleClick}>
          Delet
        </button> */}
        <Link href="/test" className="item" classActive={'kek'}>
          TEST LINK
        </Link>
        <Link href="/test2" className="item" classActive={'kek'}>
          TEST LINK2
        </Link>
        <Route path="/test" render={dynamicNestedApp} />
      </div>
    )
  }
}

export default App

// const dynamicCart = dynamic(() => import('./pages/cart'))

// const handleClick = async () => {
//   console.log('test')
//   const cart = await dynamicCart()
//   console.log('click', cart)
// }

// window.header.addEventListener('click', (e) => getPathLink(e, router))

// document.body.addEventListener('click', handleClick)

// const getAllGrid = (store) => {
//   const { data, currency } = store
//   const result = ''
//   data.forEach((el) => result + renderItemGrid(el, currency))
//   return result
// }

// const renderItemGrid = (data, currency) => {
//   return `<article class="item">
//   <input class="checkbox_input" id="checkbox_1" type="checkbox" checked=${
//     data.checked
//   }>
//   <label class="checkbox_label" for="checkbox_1"></label>
//   <a href="/product/${data.id}"><img class="pictureItem"
//       src="${data.src}"
//       alt="${data.title}"></a>
//   <div class="item_conteiner">
//     <div class="description">
//       <span class="flag ussr"></span>
//       <span class="type destroyers"></span>
//       <h2>ИС-6</h2>
//     </div>
//     <span class="price">${currency.mark} ${data.price * currency.rate}</span>
//     <button class="purchase">PURSHACE</button>
//   </div>

// </article>`
// }

// if (module.hot) {
//   module.hot.accept()
// }

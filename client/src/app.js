import main from './pages/main'
import route from './route/route'
// import cart from './pages/cart'
import './styles/style.sass'
import { Component } from './react/newVersion/Component'
import { mount } from './react/newVersion/mounting'
import { createElement } from './react/newVersion/creating'
import NestedApp from './test'
// import { mount } from './react/vdom'

// mount(<Elem name="kek" />, window.root)

class App extends Component {
  constructor() {
    super()
    this.state = {
      counter: 1,
    }
    // setInterval(() => {
    //   this.setState({ counter: this.state.counter + 1 })
    //   console.log('test')
    // }, 1000)
  }

  componentDidMount() {
    console.log('MOUNT')
    this.timerID = setInterval(() => this.tick(), 1000)
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
        <p>the counter is {counter}</p>
        <h2
          style={{
            color: '#' + Math.floor(Math.random() * 16777215).toString(16),
          }}
        >
          {'BOOM!!'.repeat(counter)}
        </h2>
        <button id="test" onClick={this.handleClick}>
          Delet
        </button>
        <NestedApp counter={counter} />
      </div>
    )
  }
}

// const App2 = () => {
//   return (
//     <div>
//       wegeg
//       <h2>BOOM</h2>
//     </div>
//   )
// }

mount(createElement(App), window.root)
// console.log('tets', <Elem name="kek" />)
// console.log('keke', React)
// const dinamic = async () => {
//   const cart = await import('./pages/cart')
//   return cart
// }

// import('./api/REST').then(() => console.log('dinamic rest'))
// console.log('app', elem())
// const handleClick = () => {
//   dinamic().then((cart) => {
//     console.log('click', cart)
//   })
// }
// document.body.addEventListener('click', handleClick)

route()

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

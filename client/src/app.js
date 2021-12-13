import { ReactDOM } from './react/react'

// import kek from './react/react'

import main from './pages/main'
import route from './route/route'
import Elem from './test'
// import cart from './pages/cart'
import './styles/style.sass'
import { mount } from './react/vdom'

mount(<Elem name="kek" />, window.root)

console.log('tets', <Elem name="kek" />)
// console.log('keke', React)
// const dinamic = async () => {
//   const cart = await import('./pages/cart')
//   return cart
// }

// import('./api/REST').then(() => console.log('dinamic rest'))
// console.log('app', elem())
console.log('main app', main)
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

if (module.hot) {
  module.hot.accept()
}

import router from './route/route'
import dynamic from './middleware/dynamic'
import getPathLink from './middleware/pathLink'
import './styles/style.sass'

const routers = [
  ['/', dynamic(() => import('./pages/main'))],
  ['/wishlist', dynamic(() => import('./pages/wishlist'))],
  ['/cart', () => 'cart'],
  ['/404', () => '404'],
]

router.setRoutes(routers)

const dynamicCart = dynamic(() => import('./pages/cart'))

// import('./api/REST').then(() => console.log('dinamic rest'))

const handleClick = async () => {
  console.log('test')
  const cart = await dynamicCart()
  console.log('click', cart)
}

window.header.addEventListener('click', (e) => getPathLink(e, router))

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

if (module.hot) {
  module.hot.accept()
}

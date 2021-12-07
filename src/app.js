import main from './pages/main'
import router from './route/route'
// import cart from './pages/cart'
import './styles/style.sass'

// route()
// console.log(push)
console.log(router)
console.log(router.localPath)

const routers = [
  {
    path: '/',
    component: () => 'main',
  },
  {
    path: '/wishlist',
    component: () => 'wishlist',
  },
  {
    path: '/cart',
    component: () => 'cart',
  },
]

router.setRoutes(routers)

const dynamic = (fn) => {
  return async () => {
    const modul = await fn()
    return modul.default
  }
}

// const dynamic = async () => {
//   const modul = await import('./pages/cart')
//   return modul.default
// }

const dynamicCart = dynamic(() => import('./pages/cart'))

// import('./api/REST').then(() => console.log('dinamic rest'))

const handleClick = async () => {
  console.log('test')
  const cart = await dynamicCart()
  console.log('click', cart)
}

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

// const routes = {
//   '/': 'main',
//   '/wishlist': 'wishlist',
//   '/cart': 'cart',
//   '/product': 'product',
// }
import {ProductCard} from '../components/product/product_card'
const routes = (pathname) => {
  console.log(pathname)
  switch (pathname) {
    case '/': {
      return 'main'
    }
    case '/wishlist': {
      return 'wishlist'
    }
    case '/cart': {
      return 'cart'
    }
    case '/product': {
      return `<product-card></product-card>`
    }
  }
}

const getPathName = () => {
  return window.location.pathname
}

const root = window.root
root.innerHTML = routes(getPathName())

let number = 0

export const onNavigate = (pathname) => {
  number++
  let path = pathname === '/' ? '.' : pathname.slice(1)

  window.history.pushState(
    { empId: number, title: 'test', as: path },
    'test',
    pathname
  )
  root.innerHTML = routes(pathname)
}

window.onpopstate = () => {
  root.innerHTML = routes(getPathName())
}

window.header.addEventListener('click', (e) => {
  const a = e.target.closest('a')
  if (!a || !e.currentTarget.contains(a)) return

  e.preventDefault()
  // console.log(e.currentTarget.contains(a))
  const path = a.getAttribute('href')
  onNavigate(path)
})

const test = () => console.log('ROUTE')
export default test

// const routes = {
//   '/': 'main',
//   '/wishlist': 'wishlist',
//   '/cart': 'cart',
//   '/product': 'product',
// }

const routes = (pathname) => {
  console.log(pathname)
  switch (pathname) {
    case '/': {
      return '<div>main<div>'
    }
    case '/wishlist': {
      return 'wishlist'
    }
    case '/cart': {
      return 'cart'
    }
    case '/product': {
      return 'product'
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

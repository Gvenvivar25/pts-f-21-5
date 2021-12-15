import App from './app'
import { mount } from './react/newVersion/mounting'
import { createElement } from './react/newVersion/creating'
import './styles/style.sass'
import { subscriber } from './react/react'

mount(createElement(App), window.root)

window.onpopstate = (e) => {
  console.log('change route', subscriber)
  for (const item of subscriber) {
    item()
  }
}

// window.addEventListener('popstate', (e) => {
//   console.log('keke')
// })

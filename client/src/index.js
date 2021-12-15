import App from './app'
import { mount } from './react/newVersion/mounting'
import { createElement } from './react/newVersion/creating'
import './styles/style.sass'
import { subscriber } from './react/react'

mount(createElement(App), window.root)

// window.addEventListener('popstate', (e) => {
//   console.log('keke')
// })

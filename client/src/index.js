import App from './app'
import { mount } from './react/newVersion/mounting'
import { createElement } from './react/newVersion/creating'
import './styles/style.css'
// import './components/Product/item.scss'

mount(createElement(App), window.root)

import App from './app'
import { mount } from './react/newVersion/mounting'
import { createElement } from './react/newVersion/creating'
import './styles/style.sass'
import store from './redux/redux-store'

// const rerender = () => {
mount(createElement(App), window.root)
// }

// rerender()

// store.subscribe(rerender)

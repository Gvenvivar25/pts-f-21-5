import '../styles/styleLogin.css'
import {LoginOpenID} from '../api/UsersAPI'

export class LoginComponent extends HTMLElement {
  constructor() {
    super()
    this.innerHTML = this.render()
    console.log(document.body)
    const subBtn = document.getElementById('login')
    subBtn.addEventListener('click', (event) => LoginOpenID(event), false)
  }

  connectedCallback() {

  }
  render () {
    return `<form>
        <span>log in</span>
        <input type="text" name="username" placeholder="Login" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <a href="https://ru.wargaming.net/registration">Create account</a>
        <button type="submit" id="login">login</button>
      </form>`
  }
}



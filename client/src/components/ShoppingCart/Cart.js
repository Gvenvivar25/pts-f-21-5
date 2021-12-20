import { Component } from '/react/newVersion/Component'
import './cart.sass'
import CartItem from './CartItem'


class Cart extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let items = this.props.data
    return (
      <>
        <h2 class="heading_cart">YOUR SHOPPING CART</h2>
        <ul class="cart_list">
          {items ? items.map((elem) => { return <CartItem deleteItem={this.props.deleteItem} data={elem} /> }) : <h2 class="empty_cart">YOUR SHOPPING CART IS EMPTY</h2>}
        </ul>
        { items ?  
        <div class="buying">
          <button class="proceed_bt">proceed to pay</button>
        </div>
        : ''}

      </>
    )
  }
}

export default Cart

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
      <div>
        <h2 class="heading_cart">YOUR SHOPPING CART</h2>
        <ul class="cart_list">
          {items.length !== 0 ? (
            items.map(({ product }) => {
              return (
                <CartItem
                  deleteItem={this.props.deleteItem}
                  product={product}
                />
              )
            })
          ) : (
            <h2 class="empty_cart">YOUR SHOPPING CART IS EMPTY</h2>
          )}
        </ul>
        {items.length !== 0 ? (
          <div class="buying">
            <button class="proceed_bt">proceed to pay</button>
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
}

export default Cart

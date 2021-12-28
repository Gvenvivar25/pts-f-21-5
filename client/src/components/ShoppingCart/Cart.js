import { Component } from '/react/newVersion/Component'
import './cart.sass'
import CartItem from './CartItem'

class Cart extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const items = this.props.data
    return (
      <div>
        <h2 className="heading_cart">YOUR SHOPPING CART</h2>
        <ul className="cart_list">
          {items.length !== 0 ? (
            items.map((product) => {
              return (
                <CartItem
                  deleteItem={this.props.deleteItem}
                  product={product}
                />
              )
            })
          ) : (
            <h2 className="empty_cart">YOUR SHOPPING CART IS EMPTY</h2>
          )}
        </ul>
        {items.length !== 0 ? (
          <div className="buying">
            <h2 className="subtotal">Total price {this.props.totalPrice}</h2>
            <button className="proceed_bt">Proceed to pay</button>
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
}

export default Cart

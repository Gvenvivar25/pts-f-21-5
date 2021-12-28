import { countPrice } from '../../middleware/countPrice'
import { Link } from '../../react/react'
import { Component } from '/react/newVersion/Component'

class CartItem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const product = this.props.product
    return (
      <li className="cart_item">
        <Link href={`/product?id=${product.id}`} className="link_img">
          <img className="cart_img" src={product.image} alt=""></img>
        </Link>
        <div className="cart_content">
          <h3 className="cart_item_name">
            <a href={`/product?id=${product.id}`} className="cart_link_name">
              {product.name}
            </a>
          </h3>
          <span className="cart_price">{countPrice(product.price)}</span>
          <button
            onClick={() => this.props.deleteItem(product.id)}
            className="cart_remove"
          >
            Remove
          </button>
        </div>
      </li>
    )
  }
}

export default CartItem

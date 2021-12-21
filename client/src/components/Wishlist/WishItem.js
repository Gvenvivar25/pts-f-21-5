import { Link } from '../../react/react'
import ButtonAddProductInCart from '../common/ButtonAddProductInCart'
import { Component } from '/react/newVersion/Component'

class WishItem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    // debugger
    const product = this.props.product

    return (
      <li className="wish_item">
        <Link href={`/product?id=${product.id}`} className="link_img">
          <img className="wish_img" src={product.image} alt={product.name} />
        </Link>
        <div className="wish_content">
          <h3 className="wish_item_name">
            <Link href={`/product?id=${product.id}`} className="wish_link_name">
              {product.name}
            </Link>
          </h3>
          <div className="wish_block">
            <div className="wish_price">
              {product.sign} {product.price}
            </div>

            <ButtonAddProductInCart id={product.id} className="wish_add" />
          </div>
          <button
            onClick={() => {
              //   debugger
              this.props.deleteItem(product.id)
            }}
            className="wish_remove"
          >
            remove
          </button>
        </div>
      </li>
    )
  }
}

export default WishItem

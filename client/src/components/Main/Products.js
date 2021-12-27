import { countPrice } from '../../middleware/countPrice'
import { Link } from '../../react/react'
import { dispatch } from '../../redux/redux-store'
import {
  addProductInWishlist,
  deleteProductInWishlist,
} from '../../redux/wishlist-reducer'
import ButtonAddProductInCart from '../common/ButtonAddProductInCart'
import { Component } from '/react/newVersion/Component'

class Products extends Component {
  handleChangeCheckBox = (e) => {
    // debugger
    const productId = this.props.card.id

    e.target.checked
      ? dispatch(addProductInWishlist(productId))
      : dispatch(deleteProductInWishlist(productId))
  }

  shouldComponentUpdate(prevProps) {
    if (prevProps !== this.props) {
      return true
    }
  }

  render() {
    let { image, name, price, id, typeProduct, discPer, discValue } =
      this.props.card
    const tank = typeProduct.find((product) => product.item_type === 'vehicle')
    const { currentCurs, nations, tiers, typesVichels } =
      this.props.additionally

    const isProductInWishlist = this.props.wishlist.includes(id)

    let oldPrice
    let currentPrice

    if (discPer !== 0 || discValue !== 0) {
      oldPrice = countPrice(price, currentCurs)

      discPer = discPer / 100 || 1
      currentPrice = countPrice(price - (price * discPer - discValue))
    } else {
      currentPrice = countPrice(price, currentCurs)
    }

    return (
      <article className="item">
        <input
          className="checkbox_input"
          id={id}
          type="checkbox"
          defaultChecked={isProductInWishlist}
          onChange={this.handleChangeCheckBox}
        />
        <label className="checkbox_label" for={id}></label>
        <Link href={`/product?id=${id}`}>
          <img className="pictureItem" src={image} alt={name} />
        </Link>
        <div className="item_conteiner">
          <div className="description">
            {tank ? (
              <>
                <span
                  className={'flag'}
                  style={{
                    backgroundImage: `url(${nations[tank.nation]?.icon})`,
                  }}
                ></span>
                <span
                  className={'type'}
                  style={{
                    backgroundImage: `url(${typesVichels[tank.type]?.icon})`,
                  }}
                ></span>
                <h2>
                  {tiers[tank.tier]?.name} {name}
                </h2>
              </>
            ) : (
              <h2>{name}</h2>
            )}
          </div>
          <div className="price">
            {oldPrice != undefined ? (
              <span class="price_old">{oldPrice}</span>
            ) : (
              ''
            )}
            <span class="price">{currentPrice}</span>
          </div>
          <ButtonAddProductInCart id={id} className="purchase" />
        </div>
      </article>
    )
  }
}

export default Products

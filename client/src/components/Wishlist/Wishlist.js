import { Component } from '/react/newVersion/Component'
import './wish.sass'
import WishItem from './WishItem'

class Wishlist extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    let items = this.props.data
    // debugger
    return (
      <div>
        <h2 className="heading_wish">YOUR WISHLIST</h2>
        <ul className="wish_list">
          {items.length !== 0 ? (
            items.map(({ product }) => (
              <WishItem
                addInCart={this.props.addInCart}
                deleteItem={this.props.deleteItem}
                product={product}
              />
            ))
          ) : (
            <h2 className="empty_list">YOUR WISHLIST IS EMPTY</h2>
          )}
        </ul>
      </div>
    )
  }
}

export default Wishlist

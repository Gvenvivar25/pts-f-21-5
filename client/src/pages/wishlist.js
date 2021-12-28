import UsersAPI from '../api/UsersAPI'
import Wishlist from '../components/Wishlist/Wishlist'
import { getWishlist } from '../redux/wishlist-selectors'
import {
  deleteProductInWishlist,
  setAllWishlist,
} from '../redux/wishlist-reducer'
import { Component } from '/react/newVersion/Component'
import { dispatch } from '../redux/redux-store'
import { setAllShoppingCart } from '../redux/shoppingCart-reducer'
import { setCurrentCur } from '../redux/additionally-reducer'

class WishlistPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isReady: false,
      wishlistProducts: [],
    }
  }

  componentDidMount() {
    dispatch(setAllWishlist())
    dispatch(setAllShoppingCart())
    let wishlistIDs = getWishlist()

    if (wishlistIDs.length === 0) {
      this.setState({ ...this.state, isReady: true })
    } else {
      UsersAPI.getCurrentCur().then((currentCur) =>
        dispatch(setCurrentCur(currentCur))
      )

      wishlistIDs.map((id) => {
        UsersAPI.getProductWithItem(id).then((item) => {
          this.setState({
            ...this.state,
            isReady: true,
            wishlistProducts: [...this.state.wishlistProducts, item],
          })
        })
      })
    }
  }

  handlerDeleteItem = (id) => {
    dispatch(deleteProductInWishlist(id))
    const deleteProductInState = this.state.wishlistProducts.filter(
      ({ product }) => product.id !== id
    )

    this.setState({
      ...this.state,
      wishlistProducts: deleteProductInState,
    })
  }

  render() {
    // debugger
    let wishlistProducts = this.state.wishlistProducts

    return (
      <div className="container_item">
        {this.state.isReady ? (
          <Wishlist
            deleteItem={this.handlerDeleteItem}
            data={wishlistProducts}
          />
        ) : (
          'Loading...'
        )}
      </div>
    )
  }
}

export default WishlistPage

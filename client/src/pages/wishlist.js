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

class WishlistPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isReady: false,
      wishlistProducts: [],
    }
  }

  componentDidMount() {
    // debugger
    // localStorage.setItem('wishlist',JSON.stringify([ '0vtIPnLFTs4Z7csA2DvE','16JGq0nLSTmoDPNwYH0A']))
    dispatch(setAllWishlist())
    dispatch(setAllShoppingCart())
    let wishlistIDs = getWishlist()

    // console.log('wishlistIDs', wishlistIDs)

    if (wishlistIDs.length === 0) {
      this.setState({ ...this.state, isReady: true })
    } else {
      wishlistIDs.map((id) => {
        UsersAPI.getAllProductItem(id).then((item) => {
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

  // addInCart = (id) => {
  //   let newCart = JSON.parse(localStorage.getItem('cart'))
  //   newCart.push(id)
  //   localStorage.setItem('cart', JSON.stringify(newCart))
  //   this.setState({ ...this.state, data: this.state.data })
  // }

  render() {
    // debugger
    let wishlistProducts = this.state.wishlistProducts
    // console.log(wishlistProducts)
    return (
      <div class="container_item">
        {this.state.isReady ? (
          <Wishlist
            // addInCart={this.addInCart}
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

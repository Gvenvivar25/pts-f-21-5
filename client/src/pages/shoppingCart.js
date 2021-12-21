import { Component } from '/react/newVersion/Component'
import Cart from '../components/ShoppingCart/Cart'
import UsersAPI from '../api/UsersAPI'
import {
  deleteProductInShoppingCart,
  setAllShoppingCart,
} from '../redux/shoppingCart-reducer'
import { dispatch } from '../redux/redux-store'
import { getShoppingCart } from '../redux/shoppingCart-selectors'

class ShoppingCart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isReady: false,
      shoppingCartProducts: [],
    }
  }

  componentDidMount() {
    dispatch(setAllShoppingCart())
    let shoppingCartIDs = getShoppingCart()
    console.log('shoppingCartIDs', shoppingCartIDs)
    if (shoppingCartIDs.length === 0) {
      this.setState({ ...this.state, isReady: true })
    } else {
      shoppingCartIDs.map((id) => {
        UsersAPI.getAllProductItem(id).then((item) => {
          this.setState({
            ...this.state,
            isReady: true,
            shoppingCartProducts: [...this.state.shoppingCartProducts, item],
          })
        })
      })
    }
  }

  // componentDidMount() {
  //   // localStorage.setItem('cart',JSON.stringify(['16JGq0nLSTmoDPNwYH0A']))
  //   let cartIDs = JSON.parse(localStorage.getItem('cart')) || []
  //   let dataItems = []

  //   cartIDs.map((e) => {
  //     UsersAPI.getAllProductItem(e).then((data) => {
  //       dataItems.push(data)
  //       {
  //         this.setState({ ...this.state, isReady: true, data: dataItems })
  //       }
  //     })
  //   })

  //   if (cartIDs.length === 0) {
  //     this.setState({ ...this.state, isReady: true })
  //   }
  // }

  handlerDeleteItem = (id) => {
    dispatch(deleteProductInShoppingCart(id))
    const deleteProductInState = this.state.shoppingCartProducts.filter(
      ({ product }) => product.id !== id
    )

    this.setState({
      ...this.state,
      shoppingCartProducts: deleteProductInState,
    })
  }

  render() {
    let shoppingCartProducts = this.state.shoppingCartProducts

    return (
      <div class="container_item">
        {this.state.isReady ? (
          <Cart
            deleteItem={this.handlerDeleteItem}
            data={shoppingCartProducts}
          />
        ) : (
          'Loading...'
        )}
      </div>
    )
  }
}

export default ShoppingCart

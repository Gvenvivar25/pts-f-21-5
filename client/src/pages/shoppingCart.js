import { Component } from '/react/newVersion/Component'
import Cart from '../components/ShoppingCart/Cart'
import UsersAPI from '../api/UsersAPI'
import {
  deleteProductInShoppingCart,
  setAllShoppingCart,
} from '../redux/shoppingCart-reducer'
import { dispatch } from '../redux/redux-store'
import { getShoppingCart } from '../redux/shoppingCart-selectors'
import { countPrice, countPriceWithoutSing } from '../middleware/countPrice'
import { setCurrentCur } from '../redux/additionally-reducer'

class ShoppingCart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isReady: false,
      shoppingCartProducts: [],
      totalPrice: 0,
    }
  }

  componentDidMount() {
    dispatch(setAllShoppingCart())
    let shoppingCartIDs = getShoppingCart()

    if (shoppingCartIDs.length === 0) {
      this.setState({ ...this.state, isReady: true })
    } else {
      UsersAPI.getCurrentCur().then((currentCur) =>
        dispatch(setCurrentCur(currentCur))
      )

      shoppingCartIDs.map((id) => {
        UsersAPI.getProductWithItem(id).then((product) => {
          this.setState({
            ...this.state,
            isReady: true,
            shoppingCartProducts: [...this.state.shoppingCartProducts, product],
            totalPrice:
              this.state.totalPrice + countPriceWithoutSing(product.price),
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
      (product) => product.id !== id
    )
    let newTotalPrice = 0
    deleteProductInState.forEach(
      (product) => (newTotalPrice += countPriceWithoutSing(product.price))
    )

    this.setState({
      ...this.state,
      shoppingCartProducts: deleteProductInState,
      totalPrice: newTotalPrice,
    })
  }

  render() {
    const { shoppingCartProducts, totalPrice } = this.state

    return (
      <div class="container_item">
        {this.state.isReady ? (
          <Cart
            deleteItem={this.handlerDeleteItem}
            data={shoppingCartProducts}
            totalPrice={countPrice(totalPrice)}
          />
        ) : (
          'Loading...'
        )}
      </div>
    )
  }
}

export default ShoppingCart

import { Component } from '../../react/newVersion/Component'
import { Link } from '../../react/react'
import { dispatch } from '../../redux/redux-store'
import { addProductInShoppingCart } from '../../redux/shoppingCart-reducer'
import { getShoppingCart } from '../../redux/shoppingCart-selectors'

class ButtonAddProductInCart extends Component {
  constructor(props) {
    super(props)
  }

  handleCLick = () => {
    // debugger
    // console.log('click', this.props.id)
    dispatch(addProductInShoppingCart(this.props.id))
  }

  render() {
    const isProductInShoppingCart = getShoppingCart().includes(this.props.id)
    // const textButton = !isProductInShoppingCart ? (
    //   this.props.text || 'PURSHACE'
    // ) : (
    //   <Link href="/shoppingCart">In cart</Link>
    // )
    // debugger
    return (
      <>
        <button
          onClick={this.handleCLick}
          className={`${this.props.className}${
            isProductInShoppingCart ? ' animate' : ''
          }`}
        >
          {isProductInShoppingCart ? (
            <Link href="/shopping-cart">In cart</Link>
          ) : (
            'PURSHASE'
          )}
        </button>
      </>
    )
  }
}

export default ButtonAddProductInCart

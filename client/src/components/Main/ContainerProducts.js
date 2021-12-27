import { getDynamicProducts } from '../../middleware/dynamic'
import { Component } from '../../react/newVersion/Component'
import { getAdditionallyAll } from '../../redux/additionally-selectors'
import { getWishlist } from '../../redux/wishlist-selectors'
import Products from './Products'

class ContainerProducts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      totalCount: 266,
      countProductsCard: 12,
      dynamicListProducts: [],
    }
  }

  componentDidMount() {
    this.dynamicAddProducts()
    document.addEventListener('scroll', this.scrollHandler)
  }

  scrollHandler = ({ target }) => {
    const { scrollHeight, scrollTop } = target.documentElement
    // debugger
    if (
      scrollHeight - (scrollTop + window.innerHeight) < 100 &&
      this.state.dynamicListProducts.length < this.state.totalCount
    ) {
      this.dynamicAddProducts()
      // console.log('fething')
    }
  }

  dynamicAddProducts(restart = false) {
    if (this.props.products.length) {
      const resultDynamic = getDynamicProducts(
        this.props.products,
        this.state.countProductsCard,
        this.state.dynamicListProducts.length
      )

      if (resultDynamic && restart) {
        return this.setState({
          ...this.state,
          dynamicListProducts: [...resultDynamic],
        })
      }
      if (resultDynamic) {
        return this.setState({
          ...this.state,
          dynamicListProducts: [
            ...this.state.dynamicListProducts,
            ...resultDynamic,
          ],
        })
      }
    }
  }

  // shouldComponentUpdate(prevProps, prevState) {
  //   if (prevProps !== this.props && prevState !== this.state) {
  //     return true
  //   }
  // }

  componentDidUpdate(prevProps, prevState) {
    // debugger
    if (prevState.dynamicListProducts !== this.state.dynamicListProducts) {
      const grid = this._parentNode

      if (window.innerHeight > grid.clientHeight - 100) {
        return this.dynamicAddProducts()
      }
    }
    if (prevProps !== this.props) {
      return this.dynamicAddProducts(true)
    }
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.scrollHandler)
  }

  render() {
    return this.state.dynamicListProducts.length ? (
      this.state.dynamicListProducts.map((product) => (
        <Products
          card={product}
          additionally={getAdditionallyAll()}
          wishlist={getWishlist()}
        />
      ))
    ) : (
      <div>Not Products</div>
    )
  }
}

export default ContainerProducts

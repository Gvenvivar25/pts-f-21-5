import { getDynamicProducts } from '../../middleware/dynamic'
import { Component } from '../../react/newVersion/Component'
import { getAdditionallyAll } from '../../redux/additionally-selectors'
import { getWishlist } from '../../redux/wishlist-selectors'
import Products from './Products'

class ContainerProducts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      totalCount: 0,
      isScroll: false,
      countProductsCard: 12,
      dynamicListProducts: [],
    }
  }

  componentDidMount() {
    // debugger
    this.dynamicAddProducts(true)
    this.isEnoughProducts()
    document.addEventListener('scroll', this.scrollHandler)
  }

  scrollHandler = ({ target }) => {
    // debugger
    const { scrollHeight, scrollTop } = target.documentElement
    // debugger
    if (
      scrollHeight - (scrollTop + window.innerHeight) < 100 &&
      this.state.dynamicListProducts.length < this.state.totalCount
    ) {
      this.dynamicAddProducts(false, true)
      // console.log('fething')
    }
  }

  dynamicAddProducts(restart = false, scroll = false) {
    if (this.props.products.length) {
      // debugger
      const lengthDynamicList = restart
        ? 0
        : this.state.dynamicListProducts.length
      const resultDynamic = getDynamicProducts(
        this.props.products,
        this.state.countProductsCard,
        lengthDynamicList
      )
      if (resultDynamic && restart) {
        return this.setState({
          ...this.state,
          isScroll: scroll,
          totalCount: this.props.products.length,
          dynamicListProducts: [...resultDynamic],
        })
      }
      if (resultDynamic) {
        return this.setState({
          ...this.state,
          isScroll: scroll,
          dynamicListProducts: [
            ...this.state.dynamicListProducts,
            ...resultDynamic,
          ],
        })
      }
    }
  }

  isEnoughProducts = () => {
    const grid = this._parentNode
    if (window.innerHeight > grid.clientHeight - 100) {
      return this.dynamicAddProducts()
    }
  }

  shouldComponentUpdate(prevProps, prevState) {
    if (prevProps !== this.props || prevState !== this.state) {
      return true
    }
  }

  componentDidUpdate(prevProps, prevState) {
    debugger
    if (prevProps !== this.props) {
      // debugger
      this.dynamicAddProducts(true)
      this.isEnoughProducts()
    }
    // else {
    //   if (!this.state.isScroll && prevState !== this.state) {
    //     this.isEnoughProducts()
    //   }
    // }
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.scrollHandler)
  }

  render() {
    console.log(this.state.dynamicListProducts)
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

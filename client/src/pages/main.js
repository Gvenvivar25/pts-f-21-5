import { router } from '../react/react'
import { Component } from '/react/newVersion/Component'
import { dispatch } from '../redux/redux-store'
import { addProducts } from '../redux/main-reducer'
import UsersAPI from '../api/UsersAPI'
import ProductCard from '../components/Main/ProductCard'
import { getDynamicProducts } from '../redux/main-selectors'
import { getAdditionally } from '../redux/additionally-reducer'
import { getAdditionallyAll } from '../redux/additionally-selectors'
import { getWishlist } from '../redux/wishlist-selectors'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: router.getSearch(),
      isReady: false,
      totalCount: 0,
      countProductsCard: 12,
      dynamicListProducts: [],
      items: [],
    }
  }

  getProductsFetch() {
    UsersAPI.getAllProduct().then(
      ({ products, items, tiers, types, nations, currentCurs }) => {
        // console.log('main products', products, items)
        // this.getItemsFetch ()
        dispatch(addProducts({ products, items }))
        dispatch(
          getAdditionally({ tiers, typesVichels: types, nations, currentCurs })
        )
        this.setState({
          ...this.state,
          isReady: true,
          totalCount: products.length,
        })
        this.dynamicAddProducts()
      }
    )
  }

  getItemsFetch() {
    UsersAPI.getAllItems().then((items) => {
      this.setState({
        ...this.state,
        items: items.slice(0),
      })
    })
  }

  updateSearch() {
    if (this.state.search !== router.search) {
      this.setState({ ...this.state, search: router.search })
      this.getProductsFetch()
      //this.getItemInProduct()
    }
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

  dynamicAddProducts() {
    const resultDynamic = getDynamicProducts(
      this.state.countProductsCard,
      this.state.dynamicListProducts.length
    )

    if (resultDynamic) {
      this.setState({
        ...this.state,
        dynamicListProducts: [
          ...this.state.dynamicListProducts,
          ...resultDynamic,
        ],
      })
    }
  }

  componentDidMount() {
    // subscriber.push(this.updateSearch.bind(this))
    this.getProductsFetch()
    document.addEventListener('scroll', this.scrollHandler)
    // window.addEventListener('resize', () => console.log('resize'))
  }

  componentDidUpdate(_, prevState) {
    // debugger
    if (prevState.dynamicListProducts !== this.state.dynamicListProducts) {
      const grid = this._currentElement.dom

      if (window.innerHeight > grid.clientHeight - 100) {
        this.dynamicAddProducts()
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.scrollHandler)
  }

  addToCart = (id) => {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || []
    if (cartItems.includes(id)) {
      let index = cartItems.indexOf(id)
      cartItems.splice(index, 1)
    } else {
      cartItems.push(id)
    }
    localStorage.setItem('cart', JSON.stringify(cartItems))
    this.setState({ ...this.state })
  }

  addToWishlist = (id) => {
    let cartItems = JSON.parse(localStorage.getItem('wishlist')) || []
    if (cartItems.includes(id)) {
      let index = cartItems.indexOf(id)
      cartItems.splice(index, 1)
    } else {
      cartItems.push(id)
    }
    localStorage.setItem('wishlist', JSON.stringify(cartItems))
    this.setState({ ...this.state })
  }

  render() {
    return (
      <div className="grid">
        {this.state.isReady
          ? this.state.dynamicListProducts.map((product) => (
              <ProductCard
                card={product}
                additionally={getAdditionallyAll()}
                wishlist={getWishlist()}
              />
            ))
          : 'Loading...'}
      </div>
    )
  }
}

export default Main

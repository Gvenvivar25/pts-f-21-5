import { router } from '../react/react'
import { Component } from '/react/newVersion/Component'
import { dispatch } from '../redux/redux-store'
import { addProducts } from '../redux/main-reducer'
import UsersAPI from '../api/UsersAPI'
import ContainerProducts from '../components/Main/ContainerProducts'
import { getAdditionally } from '../redux/additionally-reducer'
import { getAllProducts } from '../redux/main-selectors'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isReady: false,
    }
  }

  getProductsFetch() {
    UsersAPI.getAllProduct().then(
      ({ products, items, tiers, types, nations, currentCurs }) => {
        dispatch(addProducts({ products, items }))
        dispatch(
          getAdditionally({ tiers, typesVichels: types, nations, currentCurs })
        )

        this.setState({
          ...this.state,
          isReady: true,
        })
      }
    )
  }

  // shouldComponentUpdate(prevProps, prevState) {
  //   if (prevProps !== this.props && prevState !== this.state) {
  //     return true
  //   }
  // }

  componentDidMount() {
    this.getProductsFetch()
  }

  render() {
    const query = router.getQuery()
    let products = getAllProducts()

    if (this.state.isReady && query.type) {
      // debugger
      products = products.filter((product) =>
        product.category.includes(query.type)
      )
    }

    return (
      <div className="grid">
        {this.state.isReady ? (
          <ContainerProducts products={products} />
        ) : (
          'Loading...'
        )}
      </div>
    )
  }
}

export default Main

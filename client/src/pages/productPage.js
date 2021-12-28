import UsersAPI from '/api/UsersAPI'
import ProductContainer from '/components/ProductContainer/ProductContainer'
import { router, subscriber } from '/react/react'
import { Component } from '/react/newVersion/Component'
// import '../components/Product/item.scss'

class ProductPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: router.getSearch(),
      isReady: false,
      id: router.getQuery().id,
      data: null,
    }
  }

  updateSearch() {
    if (this.state.search !== router.search) {
      this.setState({ ...this.state, search: router.search })
    }
  }

  componentDidMount() {
    // debugger
    subscriber.push(this.updateSearch.bind(this))
    UsersAPI.getAllProductItem(this.state.id)
      .then((data) => {
        this.setState({ ...this.state, isReady: true, data })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <div className="container_item">
        {this.state.isReady ? (
          <ProductContainer data={this.state.data} />
        ) : (
          'Loading...'
        )}
      </div>
    )
  }
}

export default ProductPage

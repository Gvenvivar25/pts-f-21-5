import UsersAPI from '../api/UsersAPI'
import Product from '../components/Product/Product'
import { router, subscriber } from '../react/react'
import { Component } from '/react/newVersion/Component'

class ProductPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: router.getSearch(),
      isReady: false,
      id: 'UG9v2YWIy2G6xAok50ZO',
      data: null,
    }
  }

  updateSearch() {
    if (this.state.search !== router.search) {
      this.setState({ ...this.state, search: router.search })
    }
  }

  componentDidMount() {
    subscriber.push(this.updateSearch.bind(this))
    UsersAPI.getAllProductItem(this.state.id).then((data) => {
      this.setState({ ...this.state, isReady: true, data })
    })
  }

  render() {
    return (
      <div class="container_item">
        {this.state.isReady ? <Product data={this.state.data} /> : 'Loading...'}
      </div>
    )
  }
}

export default ProductPage

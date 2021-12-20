import { Component } from '/react/newVersion/Component'
import Cart from '../components/ShoppingCart/Cart'
import UsersAPI from '../api/UsersAPI'

class ShoppingCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isReady: false,
      data: null,
    }
  }

  componentDidMount() {

    // localStorage.setItem('cart',JSON.stringify(['16JGq0nLSTmoDPNwYH0A']))
    let cartIDs = JSON.parse(localStorage.getItem('cart')) || []
    let dataItems=[]

    cartIDs.map((e)=>{
      UsersAPI.getAllProductItem(e).then((data) => {
        dataItems.push(data)
        {this.setState({ ...this.state, isReady: true, data: dataItems })}
      })
    })

    if(cartIDs.length===0){
      this.setState({ ...this.state, isReady: true })
    }
  }

  handlerDeleteItem=(id)=>{
    this.setState({ ...this.state, data: this.state.data.filter(({product})=>product.id!==id)})
    const productsId = this.state.data.map(({product})=>product.id)
    localStorage.setItem('cart', JSON.stringify(productsId))
  }

  render() {
    let items= this.state.data
    return (
      <div class="container_item">
        {this.state.isReady ? <Cart deleteItem={this.handlerDeleteItem} data={items}  /> : 'Loading...'}
      </div>
    )
  }
}

export default ShoppingCard

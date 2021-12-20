import UsersAPI from '../api/UsersAPI'
import Wishlist from '../components/Wishlist/Wishlist'
import { Component } from '/react/newVersion/Component'

class WishlistPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isReady: false,
      data: null,
    }
  }


  componentDidMount() {
    
    // localStorage.setItem('wishlist',JSON.stringify([ '0vtIPnLFTs4Z7csA2DvE','16JGq0nLSTmoDPNwYH0A']))
    let wishlistIDs = JSON.parse(localStorage.getItem('wishlist')) || []
    let dataItems=[]

    wishlistIDs.map((id)=>{
      UsersAPI.getAllProductItem(id).then((data) => {
        dataItems.push(data)
        this.setState({ ...this.state, isReady: true, data: dataItems })
      })
    })

    if(wishlistIDs.length===0){
      this.setState({ ...this.state, isReady: true })
    }

  }

  handlerDeleteItem=(id)=>{
    this.setState({ ...this.state, data: this.state.data.filter(({product})=>product.id!==id)})
    const productsId = this.state.data.map(({product})=>product.id)
    localStorage.setItem('wishlist', JSON.stringify(productsId))
  }

  addInCart=(id)=>{
    let newCart=JSON.parse(localStorage.getItem('cart'))
    newCart.push(id)
    localStorage.setItem('cart', JSON.stringify(newCart)) 
    this.setState({ ...this.state, data: this.state.data})
  }

  render() {
    let items= this.state.data

    return (
      <div class="container_item">
        {this.state.isReady ? <Wishlist addInCart={this.addInCart} deleteItem={this.handlerDeleteItem} data={items} /> : 'Loading...'}
      </div>
    )
  }
}

export default WishlistPage

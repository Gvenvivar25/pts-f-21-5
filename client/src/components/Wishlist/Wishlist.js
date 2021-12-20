import { Component } from '/react/newVersion/Component'
import './wish.sass'
import WishItem from './WishItem'


class Wishlist extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    let items=this.props.data
    return (
      <>
        <h2 class="heading_wish">YOUR WISHLIST</h2>
        <ul class="wish_list">
          {items?items.map((elem)=>{ return <WishItem  addInCart={this.props.addInCart} deleteItem={this.props.deleteItem} data={elem}/>}):<h2 class="empty_list">YOUR WISHLIST IS EMPTY</h2>}
        </ul>
      </>
    )
  }
}

export default Wishlist

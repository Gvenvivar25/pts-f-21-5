import { Component } from '/react/newVersion/Component'

class CartItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { product } = this.props.data
        return (
              <li class="cart_item">
                <a href="" class="link_img">
                  <img class="cart_img" src={product.image} alt=""></img>
                </a>
                <div class="cart_content">
                  <h3 class="cart_item_name"><a href="" class="cart_link_name">{product.name}</a></h3>
                  <span class="cart_price">{product.sign} {product.price}</span>
                  <button  onClick={()=>this.props.deleteItem(product.id)} class="cart_remove">remove</button>
                </div>
              </li >
        )
    }
}

export default CartItem
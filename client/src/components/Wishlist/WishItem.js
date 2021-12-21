import { Component } from '/react/newVersion/Component'

class WishItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        const { product } = this.props.data
        return (
        <li class="wish_item">
            <a href={`/product?id=${product.id}`} class="link_img">
                <img class="wish_img"
                    src={product.image}
                    alt={product.name}
                />
            </a>
            <div class="wish_content">
                <h3 class="wish_item_name"><a href={`/product?id=${product.id}`} class="wish_link_name">{product.name}</a></h3>
                <div class="wish_block">
                    <div class="wish_price">{product.sign} {product.price}</div>
                    {JSON.parse(localStorage.getItem('cart')).includes(product.id)?<button class="wish_in_cart">in cart</button>:<button onClick={()=>this.props.addInCart(product.id)} class="wish_add">add to cart</button>}
                    {/* <button class="wish_add">add to cart</button> */}
                </div>
                <button onClick={()=>this.props.deleteItem(product.id)} class="wish_remove">remove</button>
            </div>
        </li>
        )
    }
}

export default WishItem
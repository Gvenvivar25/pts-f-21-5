import { Component } from '/react/newVersion/Component'
import Bundle from './Bundle/Bundle'
import './item.scss'

class Product extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props.data)
    const { bundle, gallery, oldPrice, product } = this.props.data
    return (
      <>
        <div class="item_header">
          <div class="item-header_content">
            <h1 class="item_header-name">{product.name}</h1>
            <hr />
            <div class="header-price">
              <div class="product-price-box">
                <p class="product-old-price">
                  {product.sign}
                  {oldPrice}
                </p>
                <p class="product-price">
                  {product.sign}
                  {product.price}
                </p>
              </div>

              <a href="#" class="button">
                Purchase
              </a>
            </div>
          </div>
          <div class="header-image-box">
            <div class="mobile_bundle">{bundle}</div>
            <img
              src={product.card_image}
              alt={product.name}
              class="item-header_image"
            />
          </div>
        </div>

        <div class="item-content">
          <div class="item-content-bundle">
            <h2 class="item-content_header">Bundle content</h2>
            <hr />
            <div class="bundle_description">
              {product.items.map((item, index) => {
                return <Bundle key={index} item={item} />
              })}
            </div>
          </div>
          <div class="item-content_details">
            <h2 class="item-content_header">Details</h2>
            <hr />
            <p class="item-content_description">{product.description}</p>
            <div class="item-content_slider">
              <div id="preview">
                <div class="img_tooltip">View tank images</div>
                <img id="imgSlider" class="imgSlider" src={gallery[0]} />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Product

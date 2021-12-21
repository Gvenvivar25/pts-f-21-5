import { Component } from '/react/newVersion/Component'
import Bundle from './Bundle/Bundle'
import './item.scss'
import { dispatch } from '../../redux/redux-store'
import { addProductInShoppingCart } from '../../redux/shoppingCart-reducer'
import ButtonAddProductInCart from '../common/ButtonAddProductInCart'

class ProductContainer extends Component {
  constructor(props) {
    super(props)
  }

  handleCLick = (id) => {
    // debugger
    // console.log('click', this.props.id)
    dispatch(addProductInShoppingCart(id))
  }

  showSlider = (gallery) => {
    let counter = 0
    const imageView = document.querySelector('.imageView')
    const nextBtn = document.getElementById('next-btn')
    const prevBtn = document.getElementById('prev-btn')
    const sliderDiv = document.getElementById('slider')
    const imgSlider = document.getElementById('imgSlider')

    imageView.addEventListener('click', function () {
      this.style.display = 'none'
      sliderDiv.style.display = 'none'
    })
    imgSlider.addEventListener('click', () => {
      imageView.style.display = 'block'
      sliderDiv.style.display = 'block'
      sliderDiv.style.background = `url(${gallery[counter]}) center/cover no-repeat`
    })

    prevBtn.addEventListener('click', function () {
      counter--
      if (counter < 0) {
        counter = gallery.length - 1
      }
      sliderDiv.style.background = `url(${gallery[counter]}) center/cover no-repeat`
    })

    nextBtn.addEventListener('click', function () {
      counter++
      if (counter > gallery.length - 1) {
        counter = 0
      }
      sliderDiv.style.background = `url(${gallery[counter]}) center/cover no-repeat`
    })
  }

  componentDidMount() {
    this.showSlider(this.props.data.gallery)
  }

  render() {
    // console.log(this.props.data)

    const { bundle, gallery, oldPrice, product } = this.props.data

    return (
      <>
        <div className="item_header">
          <div className="item-header_content">
            <h1 className="item_header-name">{product.name}</h1>
            <hr />
            <div className="header-price">
              <div className="product-price-box">
                <p className="product-old-price">
                  {product.sign}
                  {oldPrice}
                </p>
                <p className="product-price">
                  {product.sign}
                  {product.price}
                </p>
              </div>
              <ButtonAddProductInCart id={product.id} className="button" />
            </div>
          </div>
          <div className="header-image-box">
            <div className="mobile_bundle">{bundle}</div>
            <img
              src={product.card_image}
              alt={product.name}
              className="item-header_image"
            />
          </div>
        </div>

        <div className="item-content">
          <div className="item-content-bundle">
            <h2 className="item-content_header">Bundle content</h2>
            <hr />
            <div className="bundle_description">
              {product.items.map((item, index) => {
                return <Bundle key={index} item={item} />
              })}
            </div>
          </div>
          <div className="item-content_details">
            <h2 className="item-content_header">Details</h2>
            <hr />
            <p className="item-content_description">{product.description}</p>
            <div className="item-content_slider">
              <div id="preview">
                <div className="img_tooltip">View tank images</div>
                <img id="imgSlider" className="imgSlider" src={gallery[0]} />
              </div>
              <div class="imageView"></div>
              <div id="slider">
                <div id="prev-btn"></div>
                <div id="next-btn"></div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default ProductContainer

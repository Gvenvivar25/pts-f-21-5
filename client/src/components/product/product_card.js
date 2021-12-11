import 'item.scss'


//temporary methods to read from firestore
export async function getProductWithItem(id) {
  const prod = await fetch(`http://localhost:3300/api/products_items/${id}`)
  return await prod.json()
}

export async function getCurrentCur() {
  const currentCur = await fetch(`http://localhost:3300/api/current_cur`)
  return await currentCur.json()

}

export async function getVehicleInfo(item) {
  const tier = await fetch(`http://localhost:3300/api/tiers/${item.tier}`)
  const nation = await fetch(`http://localhost:3300/api/nations/${item.nation}`)
  const type = await fetch(`http://localhost:3300/api/types/${item.type}`)
  return {tier: await tier.json(), nation: await nation.json(), type: await type.json()}
}

export class ProductCard extends HTMLElement {
  constructor() {
    super()
    this.gallery = []
    this.bundle = ''
  }

  // get product data by id from url
  async getProductData(id) {
    this.product = await getProductWithItem(id)
    await getCurrentCur().then(data => {
      if(data.name !== "USD") {
        this.product.price = (Number(data.multiplier)*Number(this.product.price)).toFixed(2)
        this.product.sign = data.sign
      } else {
        this.product.price = this.product.price.toFixed(2)
        this.product.sign = '$'
      }
    })
    const items = this.product.items
    if(items) {
      for(let i = 0; i < items.length; i++) {
        if(items[i].type) {
          if(items[i].gallery) {
            this.gallery.push(...items[i].gallery)
          }
          // get icons of tank nation, type and tier
          await getVehicleInfo(items[i]).then(data => {
            items[i].tier_name = data.tier.name
            items[i].nation_icon = data.nation.icon
            items[i].type_icon = data.type.icon

          })
          // prerender bundle list
          this.bundle += `<li class="description_list_item">
                            <span class="icon" style="background-image:url('${items[i].nation_icon}');">  </span>
                            <span class="icon" style="background-image:url('${items[i].type_icon}');">  </span>
                            <span class="tier"> ${items[i].tier_name}  </span>${items[i].name}</li>`
          console.log(this.bundle)
        } else if(items[i].name === 'premium account') {
          this.bundle += `<li class="description_list_item">${items[i].value} days of ${items[i].name}</li>`
        } else {
          this.bundle += `<li class="description_list_item">${items[i].value} ${items[i].name}</li>`
        }
      }
    }
  }

  async connectedCallback() {
    // get product data, replace this string with url parameter!!!!!
    await this.getProductData('UG9v2YWIy2G6xAok50ZO')
    //render page info
    this.innerHTML = this.render()
    const list = document.querySelector('.bundle_description_list')
    list.innerHTML = this.bundle
    //render slider after page
    this.renderSlider()
  }

  // method to show gallery slider by image click
  showSlider(gallery) {
    let counter = 0
    const imageView = document.querySelector('.imageView')
    const nextBtn = document.getElementById('next-btn')
    const prevBtn = document.getElementById('prev-btn')
    const sliderDiv = document.getElementById('slider')
    const imgSlider = document.getElementById('imgSlider')

    imageView.addEventListener('click', function(){
      this.style.display = "none"
      sliderDiv.style.display = "none"
    })
    imgSlider.addEventListener('click', () => {
      imageView.style.display = "block"
      sliderDiv.style.display = "block"
      sliderDiv.style.background = `url(${gallery[counter]}) center/cover no-repeat`
    })

    prevBtn.addEventListener('click', function(){
      counter--
      if(counter < 0){
        counter = gallery.length-1
      }
      sliderDiv.style.background = `url(${gallery[counter]}) center/cover no-repeat`
    })

    nextBtn.addEventListener('click', function(){
      counter++
      if(counter > gallery.length-1){
        counter = 0
      }
      sliderDiv.style.background = `url(${gallery[counter]}) center/cover no-repeat`
    })
  }

  renderSlider() {
    const html =  `
    <div class="imageView"></div>
    <div id="slider">
      <div id = "prev-btn"></div>
      <div id = "next-btn"></div>
    </div>
    `
    const previewDiv = document.querySelector('.item-content_slider')
    previewDiv.insertAdjacentHTML('beforeend', html)
    this.showSlider(this.gallery)
  }

  render() {
    return `
    <div class="container_item">
        <div class="item_header">
          <div class="item-header_content">
              <h1 class="header-name">${this.product.name}</h1>
              <hr>
              <div class="header-price">
                  <p class="product-price">${this.product.sign}${this.product.price}</p>
                  <a href="#" class="button">Purchase</a>
              </div>
  
          </div>
          <div class="header-image-box">
              <div class="mobile_bundle">${this.bundle}</div>
              <img src="${this.product.card_image}" alt="${this.product.name}" class="item-header_image"/>
          </div>
        
        </div>
        
        <div class="item-content">
            <div class="item-content-bundle">
                <h2 class="item-content_header">Bundle content</h2>
                <hr>
                <div class="bundle_description">
                <ul class="bundle_description_list"></ul>
            </div>
            </div>
            <div class="item-content_details">
                <h2 class="item-content_header">Details</h2>
                <hr>
                <p class="item-content_description">${this.product.description}</p>
                <div class="item-content_slider">
                    <div id="preview">
                        <div class="img_tooltip">View tank images</div>
                        <img id="imgSlider" class="imgSlider" src="${this.gallery[0]}">
                    </div>
                </div>
            </div>
        </div>
    </div>`
  }
}

customElements.define('item-card', ProductCard)

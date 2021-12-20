import { REST } from './REST'

class UsepsAPI extends REST {
  async getAllProductItem(id) {
    let data = {
      gallery: [],
      bundle: '',
      oldPrice: 0,
    }
    let product = await this.getProductWithItem(id)

    if (product.discPer !== 0 || product.discValue !== 0) {
      data.oldPrice = product.price
      product.price =
        product.price -
        (product.price * product.discPer) / 100 -
        product.discValue
    }

    let currentCur = await this.getCurrentCur()
    if (currentCur.name !== 'USD') {
      product.price = (
        Number(currentCur.multiplier) * Number(product.price)
      ).toFixed(2)
      product.sign = currentCur.sign
    } else {
      product.price = product.price.toFixed(2)
      product.sign = '$'
    }

    const { items } = product

    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].item_type === 'vehicle') {
          if (items[i].gallery) {
            data.gallery.push(...items[i].gallery)
          }
          // get icons of tank nation, type and tier
          const vehicleInfo = await this.getVehicleInfo(items[i])
          items[i].tier_name = vehicleInfo.tier.name
          items[i].nation_icon = vehicleInfo.nation.icon
          items[i].type_icon = vehicleInfo.type.icon
        }
      }
    }

    data = { ...data, product }

    return data
  }

  getProductWithItem(id) {
    return this.get(`products_items/${id}`)
  }

  getCurrentCur() {
    return this.get(`current_cur`)
  }

  async getVehicleInfo(item) {
    const tier = await this.get(`tiers/${item.tier}`)
    const nation = await this.get(`nations/${item.nation}`)
    const type = await this.get(`types/${item.type}`)
    return { tier, nation, type }
  }

  async getAllProduct() {
    const products = await this.get('products')
    const items = await this.get('items')
    const tiers = await this.get('tiers')
    const types = await this.get('types')
    const nations = await this.get('nations')
    const currentCurs = await this.getCurrentCur()
    return { products, items, tiers, types, nations, currentCurs }
  }

  // getAllItems() {
  //   return this.get('items')
  // }
}

export default new UsepsAPI()

// console.log('usersApi')
// let btn_login = document.querySelector('.login');
// btn_login.addEventListener('click', LoginOpenID);

// function LoginOpenID() {
//     let urlSite = window.location.origin;
//     console.log(urlSite)
//     let url = `https://api.worldoftanks.ru/wot/auth/login/?application_id=c4a80daf163b5d68b2d8bd7801d040d0&redirect_uri=${urlSite}`;
//     console.log(url)
//     window.location.replace(url);
// }
//     let UserData = [];
// if(window.location.search){
//     UserData = decodeURIComponent(location.search.substr(1)).split('&');
//     editUserData(UserData);
// }
// let User = {};
// function editUserData(arr){
//     console.log(arr)
//      if(arr.length===6){
//          console.log(arr[4]);
//          if(arr[4]){
//              console.log(arr[4].lastIndexOf('=', ))
//          }
//      }
// }

//getResponce()

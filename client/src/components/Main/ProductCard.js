import { Link } from '../../react/react'
import { dispatch } from '../../redux/redux-store'
import {
  addProductInWishlist,
  deleteProductInWishlist,
} from '../../redux/wishlist-reducer'
import { Component } from '/react/newVersion/Component'
//import UsersAPI from '../api/UsersAPI'

class ProductCard extends Component {
  componentDidUpdate() {
    // debugger
  }

  handleChangeCheckBox = (e) => {
    // debugger
    const productId = this.props.card.id
    console.log(e.target.checked)
    e.target.checked
      ? dispatch(addProductInWishlist(productId))
      : dispatch(deleteProductInWishlist(productId))
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps !== this.props) {
      return true
    }
  }

  render() {
    // console.log(this.props.card)
    const { image, name, price, id, typeProduct } = this.props.card
    const tank = typeProduct.find((product) => product.item_type === 'vehicle')
    const { currentCurs, nations, tiers, typesVichels } =
      this.props.additionally

    const CurrentPrice = Number(price * currentCurs.multiplier).toFixed(2)

    const isProductInWishlist = this.props.wishlist.includes(id)

    return (
      <article className="item">
        <input
          className="checkbox_input"
          id={id}
          type="checkbox"
          defaultChecked={isProductInWishlist}
          onChange={this.handleChangeCheckBox}
        />
        <label className="checkbox_label" for={id}></label>
        <Link href={`/product?id=${id}`}>
          <img className="pictureItem" src={image} alt={name} />
        </Link>
        <div className="item_conteiner">
          <div className="description">
            {tank ? (
              <>
                <span
                  className={'flag'}
                  style={{
                    backgroundImage: `url(${nations[tank.nation]?.icon})`,
                  }}
                ></span>
                <span
                  className={'type'}
                  style={{
                    backgroundImage: `url(${typesVichels[tank.type]?.icon})`,
                  }}
                ></span>
                <h2>
                  {tiers[tank.tier]?.name} {name}
                </h2>
              </>
            ) : (
              <h2>{name}</h2>
            )}
          </div>
          <span className="price">
            {currentCurs.sign} {CurrentPrice}
          </span>
          <button className="purchase">PURSHACE</button>
        </div>
      </article>
    )
  }
}

export default ProductCard

// import shopList from "../redux/store";

// console.log('cart')
// let typeProduct = '';
// //let MaxView = 13;
// let counter = 0;
// //let ContrCount = 0;
// let stepDouble = 3;
// ////////*******отображание плиток товаров в main блоке********///////
// function render(item) {
//     let createNewItem = document.createElement('article');
//     createNewItem.id = `${item.id}`;
//     if (counter === 0 || counter === stepDouble) {
//         stepDouble = counter + 5;
//         createNewItem.className = `item double`;
//     } else {
//         createNewItem.className = `item`;
//     }
//     createNewItem.style = `background-image:  url(${item.image}); background-size:contain; background-position: center; background-repeat: no-repeat;`;
//     checkProduct(item.category)
//     if(typeProduct==='gold' || typeProduct==='pack'){
//         createNewItem.innerHTML = `
//           <input class="checkbox_input" id="checkbox_${item.id}" type="checkbox">
//           <label class="checkbox_label" for="checkbox_${item.id}"></label>
//         <div class="item_conteiner">
//             <div class="description">
//                 <h2>${item.name}</h2>
//             </div>
//           <span>${item.currency} ${item.price}</span>
//           <button class="purchase">PURSHACE</button>
//         </div>
//         `;
//     } else if (typeProduct==='vehicle'){
//         createNewItem.innerHTML = `
//           <input class="checkbox_input" id="checkbox_${item.id}" type="checkbox">
//           <label class="checkbox_label" for="checkbox_${item.id}"></label>
//         <div class="item_conteiner">
//             <div class="description">
//             <span class="flag ${item.items.nation}"></span>
//               <span class="type ${item.items.type}"></span>
//                 <h2>${item.items.tier} ${item.name}</h2>
//             </div>
//           <span>${item.currency} ${item.price}</span>
//           <button class="purchase">PURSHACE</button>
//         </div>
//         `;
//     }else if (typeProduct==='premium'){
//         createNewItem.innerHTML = `
//           <input class="checkbox_input" id="checkbox_${item.id}" type="checkbox">
//           <label class="checkbox_label" for="checkbox_${item.id}"></label>
//         <div class="item_conteiner">
//             <div class="description">
//                 <h2>${item.name}</h2>
//             </div>
//           <span>${item.currency} ${item.price}</span>
//           <button class="purchase">PURSHACE</button>
//         </div>
//         `;
//     }
//     counter++;
//     shopList.append(createNewItem);
// }

// function checkProduct(arr) {

//     for (let i = 0; i < arr.length; i++) {
//         if(arr[i]==='premium'){
//             typeProduct = 'premium';
//             break;
//         }
//         if (arr[i] === 'vehicle') {
//             typeProduct = 'vehicle';
//             break;
//         } else if (arr[i] === 'gold') {
//             typeProduct = 'gold';
//         }
//     }
// }

// export default render
// import { getCarrent } from '../redux/main-selectors'
// import store from '/redux/redux-store'
// import s from './main.module.css'
// import { updateCarrent } from '../redux/main-reducer'

// console.log(s)
// class Main {
//   current = getCarrent(store.getState())

//   constructor(store) {
//     this.store = store
//   }

//   increment() {
//     this.store.dispacth(updateCarrent(this.current + 1))
//     console.log(this.current)
//   }

//   render() {
//     return `<div class=${s.test}>test style</div>
//     <p>${this.current}</p>
//       <button onclick=${this.increment}>click</button>
//     `
//   }
// }

// const main = new Main(store)
// // store.subscribe(main.render)
// console.log(main)
// export default main.render()

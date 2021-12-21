import { Component } from '/react/newVersion/Component'
//import UsersAPI from '../api/UsersAPI'

class ProductCard extends Component {
  componentDidUpdate() {
    // debugger
  }

  render() {
    // console.log(this.props.card)
    let { image, name, price, id, typeProduct, discPer, discValue } = this.props.card
    const tank = typeProduct.find((product) => product.item_type === 'vehicle')
    const { currentCurs, nations, tiers, typesVichels } =
      this.props.additionally
    // debugger
    let CurrentPrice = Number(price * currentCurs.multiplier).toFixed(2)

    let oldPrice
    if (discPer !== 0 || discValue !== 0) {
      oldPrice = CurrentPrice
      CurrentPrice = (CurrentPrice - (CurrentPrice * discPer) / 100 - discValue).toFixed(2)
      console.log(oldPrice,'!!!!',CurrentPrice);
    }


    return (
      <article class="item">
        {JSON.parse(localStorage.getItem('wishlist')).includes(id) ? <input class="checkbox_input" id={id} type="checkbox" onClick={() => this.props.addToWishlist(id)} checked /> : <input class="checkbox_input" id={id} type="checkbox" onClick={() => this.props.addToWishlist(id)} />}
        <label class="checkbox_label" for={id}></label>
        <a href={`/product?id=${id}`}>
          <img class="pictureItem" src={image} alt={name} />
        </a>
        <div className="item_conteiner">
          <div class="description">
            {tank ? (
              <>
                <span
                  className={'flag'}
                  style={{
                    backgroundImage: `url(${nations[tank.nation].icon})`,
                  }}
                ></span>
                <span
                  className={'type'}
                  style={{
                    backgroundImage: `url(${typesVichels[tank.type].icon})`,
                  }}
                ></span>
                <h2>
                  {tiers[tank.tier].name} {name}
                </h2>
              </>
            ) : (
              <h2>{name}</h2>
            )}
          </div>
          <div class="prices">        
            {(oldPrice !== undefined) ? <span class="price_old">{currentCurs.sign} {oldPrice} </span> : ''}
            <span class="price">
              {currentCurs.sign} {CurrentPrice}
            </span></div>
        </div>
        {JSON.parse(localStorage.getItem('cart')).includes(id) ? <button onClick={() => this.props.addToCart(id)} class="purchase animate" >IN CART</button> : <button onClick={() => this.props.addToCart(id)} class="purchase"  >PURSHACE</button>}
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

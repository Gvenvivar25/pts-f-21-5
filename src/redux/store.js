import render from "../pages/cart";
console.log('store')
////////*******запрос в базу данный и вывод в консоль полученого массива данных с products и items********///////
import {initializeApp} from 'firebase/app';
import {getFirestore, collection, getDocs} from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyCIwAuRUF9DkiwGz3E1CawY5z0lu-QfMBA",
    authDomain: "testbaseforge.firebaseapp.com",
    projectId: "testbaseforge",
    storageBucket: "testbaseforge.appspot.com",
    messagingSenderId: "61609779680",
    appId: "1:61609779680:web:68ddb83ddd3ae21ceb8b85"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getCities(db) {
    const citiesColToproducts = collection(db, 'products');
    const citySnapshotToProducts = await getDocs(citiesColToproducts);
    const productsList = citySnapshotToProducts.docs.map(doc => doc.data());

    const citiesColToItems = collection(db, 'items');
    const citySnapshotToItems = await getDocs(citiesColToItems);
    const itemsList = citySnapshotToItems.docs.map(doc => doc.data());
    for (let key in itemsList){
        if(itemsList[key].tier) {
            if (itemsList[key].tier === 1) {
                itemsList[key].tier = 'I';
            } else if (itemsList[key].tier === 2) {
                itemsList[key].tier = 'II';
            } else if (itemsList[key].tier === 3) {
                itemsList[key].tier = 'III';
            } else if (itemsList[key].tier === 4) {
                itemsList[key].tier = 'IV';
            } else if (itemsList[key].tier === 5) {
                itemsList[key].tier = 'V';
            } else if (itemsList[key].tier === 6) {
                itemsList[key].tier = 'VI';
            } else if (itemsList[key].tier === 7) {
                itemsList[key].tier = 'VII';
            } else if (itemsList[key].tier === 8) {
                itemsList[key].tier = 'VIII';
            } else if (itemsList[key].tier === 9) {
                itemsList[key].tier = 'IX';
            } else {
                itemsList[key].tier = 'X';
            }
        }
    }
    for (let key in productsList){
        productsList[key].currency = '$';
        getItemOnId(productsList[key].items, itemsList);
        //console.log(productsList);
        render(productsList[key]);
    }
    console.log(itemsList)
    console.log(productsList);
}

getCities(db);
///******************************************************************///////////////////////////////
///////////*********функция соединения poduct с item***********/////////////////
function getItemOnId(product, itemsList) {
    for (let key in product) {
        //console.log(key)
        for (let j = 0; j < itemsList.length; j++) {
            //console.log(itemsList[j].id)
            if (Number(key) === itemsList[j].id) {
                //console.log(Number(key)+' ' + itemsList[j].id)
                //product[key] = itemsList[j];
                Object.assign(product, itemsList[j])
            }
        }
    }
}

const shopList = document.querySelector('.grid');

export default shopList
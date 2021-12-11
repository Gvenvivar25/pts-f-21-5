const Router = require('express').Router;
const productsController = require('../controllers/products');
const itemsController = require('../controllers/items');
const tiersController = require('../controllers/tiers.js');
const typesController = require('../controllers/types.js');
const nationsController = require('../controllers/nations.js');
const currenciesController = require('../controllers/currencies.js');
const router = Router();

// products
// получить все продукты для главной страницы get('/api/products')
router.get('/api/products', productsController.getAllProducts);
// получить все продукты для главной страницы сразу с items, тормозит! get('/api/products_items')
router.get('/api/products_items', productsController.getAllProductsWithItems);
// получить 1 продукт для страницы товара get по id (`/api/products/${id}`)
router.get('/api/products/:id', productsController.getOneProduct);
// получить 1 продукт сразу с items для страницы товара get по id (`/api/products_items/${id}`)
router.get('/api/products_items/:id', productsController.getOneProductWithItems);
// обновить 1 продукт  для админки put запрос по id (`/api/products/${id}`)
router.put('/api/products/:id', productsController.updateProduct);
// добавить 1 продукт  для админки  с авто id post запрос(`/api/products')
router.post('/api/products', productsController.addProduct);
// удалить 1 продукт  для админки по id delete запрос(`/api/products/${id}`)
router.delete('/api/products/:id', productsController.removeProduct);



//items для админки
router.get('/api/items', itemsController.getAllItems);
router.get('/api/items/:id', itemsController.getOneItem);
router.put('/api/items/:id', itemsController.updateItem);
router.post('/api/items', itemsController.addItem);
router.delete('/api/items/:id', itemsController.removeItem);


//tiers
// получить все уровни танков для главной страницы get('/api/tiers')
router.get('/api/tiers', tiersController.getAllTiers);
//получить 1 уровень танка для страницы товара get('/api/tiers/:id')
router.get('/api/tiers/:id', tiersController.getOneTier);
// методы для админки
router.put('/api/tiers/:id', tiersController.updateTier);
router.post('/api/tiers', tiersController.addTier);
router.delete('/api/tiers/:id', tiersController.removeTier);


//types
// получить все типы танков для главной страницы get('/api/types')
router.get('/api/types', typesController.getAllTypes);
//получить 1 тип танка для страницы товара get('/api/types/:id')
router.get('/api/types/:id', typesController.getOneType);
// методы для админки
router.put('/api/types/:id', typesController.updateType);
router.post('/api/types', typesController.addType);
router.delete('/api/types/:id', typesController.removeType);


//nations
// получить все нации танков для главной страницы get('/api/nations')
router.get('/api/nations', nationsController.getAllNations);
//получить 1 нацию танка для страницы товара get('/api/nations/:id')
router.get('/api/nations/:id', nationsController.getOneNation);
// методы для админки
router.put('/api/nations/:id', nationsController.updateNation);
router.post('/api/nations', nationsController.addNation);
router.delete('/api/nations/:id', nationsController.removeNation);


//users

//categories

//currencies
// получить все валюты для админа get('/api/currencies')
router.get('/api/currencies', currenciesController.getAllCurrencies);
// получить актуальную валюту для пересчета цен на всех страницах get('/api/currencies')
router.get('/api/current_cur', currenciesController.getCurrentCur);
module.exports = router;

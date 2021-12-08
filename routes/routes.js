const Router = require('express').Router;
const productsController = require('../controllers/products');
const itemsController = require('../controllers/items');
const tiersController = require('../controllers/tiers.js');
const router = Router();

// products
// получить все продукты для главной страницы get('/api/products')
router.get('/api/products', productsController.getAllProducts);

// получить все продукты для главной страницы сразу с items, тормозит! get('/api/products_items')
router.get('/api/products_items', productsController.getAllProductsWithItems);

// получить 1 продукт для страницы товара get по id (`/api/products/${id}`)
router.get('/api/products/:id', productsController.getOneProduct);

// получить 1 продукт сразу с items для страницы товара get по id (`/api/products_items/${id}`)
router.get(
  '/api/products_items/:id',
  productsController.getOneProductWithItems
);

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

//types
// получить все типы танков для главной страницы get('/api/tiers')
router.get('/api/tiers', tiersController.getAllTiers);

router.get('/api/tiers/:id', tiersController.getOneTiers);
router.put('/api/tiers/:id', tiersController.updateTier);
router.post('/api/tiers', tiersController.addTier);
router.delete('/api/tiers/:id', tiersController.removeTier);

//users

//categories

//currencies

module.exports = router;

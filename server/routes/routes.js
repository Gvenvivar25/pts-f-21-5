const Router = require(`express`).Router
const productsController = require(`../controllers/products`)
const itemsController = require(`../controllers/items`)
const router = Router()


// products
router.get('/api/products', productsController.getAllProducts)
router.get('/api/products_items', productsController.getAllProductsWithItems)
router.get('/api/products/:id', productsController.getOneProduct)
router.get('/api/products_items/:id', productsController.getOneProductWithItems)
router.put('/api/products/:id', productsController.updateProduct)
router.post('/api/products', productsController.addProduct)
router.delete('/api/products/:id', productsController.removeProduct)

//items
router.get('/api/items', itemsController.getAllItems)
router.get('/api/items/:id', itemsController.getOneItem)
router.put('/api/items/:id', itemsController.updateItem)
router.post('/api/items', itemsController.addItem)
router.delete('/api/items/:id', itemsController.removeItem)
//users


//categories

//currencies



module.exports = router
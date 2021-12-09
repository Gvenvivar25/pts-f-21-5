const db = require('../firebase')
const prodCol = db.collection('products')

class ProductsController {

  async getAllProducts (req, res)  {
    const products = []
    try {
      const prodData = await prodCol.orderBy('weight', 'desc').get()
      prodData.forEach((doc) => {
        products.push({...doc.data()})
      })
      res.json(products)
    } catch (e) {
      throw new Error(e)
    }
  }

  //get products collection with items in it - very slow performance!!!
  async getAllProductsWithItems (req, res)  {
    const products = []

    const tempProdData = []

    try {
      const prodData = await prodCol.get()
      prodData.forEach(prod => {
        tempProdData.push(prod.data())
      })
      for(let document of tempProdData) {
        const items = []
        for (const [key, value] of Object.entries(document.items)) {
          const item = await db.collection('items').doc(`${key}`).get()
          items.push({...item.data(), value: value})
        }
        products.push({...document, items: items})
      }
      res.json(products)
    } catch (e) {
      throw new Error(e)
    }
  }

  async getOneProduct (req, res)  {
    try {
      const prodRef = prodCol.doc(`${req.params.id}`)
      const doc = await prodRef.get()
      const product = doc.data()
      res.json(product)
    } catch (e) {
      throw new Error(e)
    }
  }

  async getOneProductWithItems (req, res)  {
    try {
      const prodRef = prodCol.doc(`${req.params.id}`)
      const doc = await prodRef.get()
      const items = []
      for (const [key, value] of Object.entries(doc.data().items)) {
        const item = await db.collection('items').doc(`${key}`).get()
        items.push({...item.data(), value: value})
      }
      const product = {...doc.data(), items: items}
      res.json(product)
    } catch (e) {
      throw new Error(e)
    }
  }

 async addProduct (req, res) {
    try {
      const prodRef = prodCol
      const data = req.body
      const response = await prodRef.add(data)
      console.log(response.id)
      const collect = prodCol.doc(`${response.id}`)
      const updData = {...data, id: response.id}
      await collect.set(updData, {merge: true})
      res.json({message: `Product id ${response.id} added`})
    } catch (e) {
      throw new Error(e)
    }
  }

  async removeProduct (req, res) {
    try {
      await prodCol.doc(`${req.params.id}`).delete()
      res.json({message: `Product was deleted successfully`})
    } catch (e) {
      throw new Error(e)
    }
  }

  async updateProduct (req, res) {
    try {
      const prodRef = prodCol.doc(`${req.params.id}`)
      const response = await prodRef.update(req.body)
      res.json({message: `Product id ${response.id} updated`})
    } catch (e) {
      throw new Error(e)
    }
  }
}

module.exports = new ProductsController()
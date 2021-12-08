const db = require('../firebase')
const itemsCol = db.collection('items')

class ItemsController {
  async getAllItems (req, res)  {
    const items = []
    try {
      const itemData = await itemsCol.get()
      itemData.forEach((doc) => {
        items.push({...doc.data()})
      })
      res.json(items)
    } catch (e) {
      throw new Error(e)
    }
  }

  async getOneItem (req, res)  {
    try {
      const itemRef = itemsCol.doc(`${req.params.id}`)
      const doc = await itemRef.get()
      const item = doc.data()
      res.json(item)
    } catch (e) {
      throw new Error(e)
    }
  }

  async addItem (req, res) {
    try {
      const itemRef = itemsCol.doc(`${req.body.id}`)
      const data = req.body
      const response = await itemRef.set(data, {merge: true})
      res.json({message: `Item id ${response.id} added`})
    } catch (e) {
      throw new Error(e)
    }

  }

  async removeItem (req, res) {
    try {
      await itemsCol.doc(`${req.params.id}`).delete()
      res.json({message: `Item was deleted successfully`})
    } catch (e) {
      throw new Error(e)
    }
  }

  async updateItem (req, res) {
    try {
      const itemRef = itemsCol.doc(`${req.params.id}`)
      const response = await itemRef.update(req.body)
      res.json({message: `Item id ${response.id} updated`})
    } catch (e) {
      throw new Error(e)
    }
  }
}

module.exports = new ItemsController()
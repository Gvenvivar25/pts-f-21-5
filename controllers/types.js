const db = require('../firebase')
const typesCol = db.collection('veh_types')

class VehTypesController {
  async getAllTypes (req, res)  {
    const types = []
    try {
      const typesData = await typesCol.get()
      typesData.forEach((doc) => {
        types.push({...doc.data()})
      })
      res.json(types)
    } catch (e) {
      throw new Error(e)
    }
  }

  async getOneType (req, res)  {
    try {
      const typeRef = typesCol.doc(`${req.params.id}`)
      const doc = await typeRef.get()
      const type = doc.data()
      res.json(type)
    } catch (e) {
      throw new Error(e)
    }
  }

  async addType (req, res) {
    try {
      const typeRef = typesCol.doc(`${req.body.id}`)
      const data = req.body
      const response = await typeRef.set(data)
      res.json({message: `Type id ${response.id} added`})
    } catch (e) {
      throw new Error(e)
    }

  }

  async removeType (req, res) {
    try {
      const typeRef = typesCol.doc(`${req.params.id}`)
      const response = await typeRef.delete()
      res.json({message: `Item was deleted successfully`})
    } catch (e) {
      throw new Error(e)
    }
  }

  async updateType (req, res) {
    try {
      const itemRef = typesCol.doc(`${req.params.id}`)
      const response = await itemRef.update(req.body)
      res.json({message: `Item id ${response.id} updated`})
    } catch (e) {
      throw new Error(e)
    }
  }
}

module.exports = new VehTypesController()
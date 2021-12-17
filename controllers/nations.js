const db = require('../firebase')
const nationsCol = db.collection('veh_nations')

class VehNationsController {
  async getAllNations (req, res)  {
    const nations = []
    try {
      const nationsData = await nationsCol.get()
      nationsData.forEach((doc) => {
        nations.push({...doc.data()})
      })
      res.json(nations)
    } catch (e) {
      throw new Error(e)
    }
  }

  async getOneNation (req, res)  {
    try {
      const nationRef = nationsCol.doc(`${req.params.id}`)
      const doc = await nationRef.get()
      const nation = doc.data()
      res.json(nation)
    } catch (e) {
      throw new Error(e)
    }
  }

  async addNation (req, res) {
    try {
      const nationRef = nationsCol.doc(`${req.body.id}`)
      const data = req.body
      const response = await nationRef.set(data)
      res.json({message: `Nation id ${response.id} added`})
    } catch (e) {
      throw new Error(e)
    }
  }

  async removeNation (req, res) {
    try {
      await nationsCol.doc(`${req.params.id}`).delete()
      res.json({message: `Nation was deleted successfully`})
    } catch (e) {
      throw new Error(e)
    }
  }

  async updateNation (req, res) {
    try {
      const nationRef = nationsCol.doc(`${req.params.id}`)
      const response = await nationRef.update(req.body)
      res.json({message: `Nation id ${response.id} updated`})
    } catch (e) {
      throw new Error(e)
    }
  }
}

module.exports = new VehNationsController()
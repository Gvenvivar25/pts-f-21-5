const db = require('../firebase')
const tiersCol = db.collection('veh_types')

class VehTiersController {
  async getAllTiers (req, res)  {
    const tiers = []
    try {
      const tiersData = await tiersCol.get()
      tiersData.forEach((doc) => {
        tiers.push({...doc.data()})
      })
      res.json(tiers)
    } catch (e) {
      throw new Error(e)
    }
  }

  async getOneTiers (req, res)  {
    try {
      const tierRef = tiersCol.doc(`${req.params.id}`)
      const doc = await tierRef.get()
      const tier = doc.data()
      res.json(tier)
    } catch (e) {
      throw new Error(e)
    }
  }

  async addTier (req, res) {
    try {
      const tierRef = tiersCol.doc(`${req.body.id}`)
      const data = req.body
      const response = await tierRef.set(data)
      res.json({message: `Type id ${response.id} added`})
    } catch (e) {
      throw new Error(e)
    }
  }

  async removeTier (req, res) {
    try {
      await tiersCol.doc(`${req.params.id}`).delete()
      res.json({message: `Item was deleted successfully`})
    } catch (e) {
      throw new Error(e)
    }
  }

  async updateTier (req, res) {
    try {
      const tierRef = tiersCol.doc(`${req.params.id}`)
      const response = await tierRef.update(req.body)
      res.json({message: `Item id ${response.id} updated`})
    } catch (e) {
      throw new Error(e)
    }
  }
}

module.exports = new VehTiersController()
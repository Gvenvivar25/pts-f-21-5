const db = require('../firebase')
const tiersCol = db.collection('veh_tiers')
const typesCol = db.collection('veh_types')
const nationsCol = db.collection('veh_nations')

class VehTiersController {

  //get tiers, nations and types of vehicles in 1 request
  async getAllVehicleInfo (req, res)  {
    const tiers = []
    const types = []
    const nations = []
    try {
      const tiersData = await tiersCol.get()
      tiersData.forEach((doc) => {
        tiers.push({...doc.data()})
      })
      const typesData = await typesCol.get()
      typesData.forEach((doc) => {
        types.push({...doc.data()})
      })
      const nationsData = await nationsCol.get()
      nationsData.forEach((doc) => {
        nations.push({...doc.data()})
      })
      res.json({
        tiers: tiers,
        types: types,
        nations: nations
      })
    } catch (e) {
      throw new Error(e)
    }
  }

  async getVehicleInfo (req, res)  {
    try {
      //get item by id
      const itemDoc = db.collection('items').doc(`${req.params.id}`)
      const item = await itemDoc.get()
      //get tier
      const tierRef = tiersCol.doc(`${item.data().tier}`)
      const tierDoc = await tierRef.get()
      const tier = tierDoc.data()
      // get type
      const typeRef = typesCol.doc(`${item.data().type}`)
      const typeDoc = await typeRef.get()
      const type = typeDoc.data()
      // get nation
      const nationRef = nationsCol.doc(`${item.data().nation}`)
      const nationDoc = await nationRef.get()
      const nation = nationDoc.data()

      res.json({tier: tier, type: type, nation: nation})
    } catch (e) {
      throw new Error(e)
    }
  }

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

  async getOneTier (req, res)  {
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
      res.json({message: `Tier id ${response.id} added`})
    } catch (e) {
      throw new Error(e)
    }
  }

  async removeTier (req, res) {
    try {
      await tiersCol.doc(`${req.params.id}`).delete()
      res.json({message: `Tier was deleted successfully`})
    } catch (e) {
      throw new Error(e)
    }
  }

  async updateTier (req, res) {
    try {
      const tierRef = tiersCol.doc(`${req.params.id}`)
      const response = await tierRef.update(req.body)
      res.json({message: `Tier id ${response.id} updated`})
    } catch (e) {
      throw new Error(e)
    }
  }
}

module.exports = new VehTiersController()
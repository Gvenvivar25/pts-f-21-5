const db = require('../firebase')
const curCol = db.collection('currency')
const currentCurCol = db.collection('current_cur')

class CurrenciesController {
  async getAllCurrencies (req, res)  {
    const currencies = []
    try {
      const curData = await curCol.get()
      curData.forEach((doc) => {
        currencies.push({...doc.data()})
      })
      res.json(currencies)
    } catch (e) {
      throw new Error(e)
    }
  }

  async getCurrentCur (req, res)  {
    try {

      const currentCurData = await currentCurCol.doc(`1`).get()
      console.log(currentCurData)
      const currentCur = currentCurData.data()
      console.log(currentCur)
      res.json(currentCur)
    } catch (e) {
      throw new Error(e)
    }
  }
}

module.exports = new CurrenciesController()
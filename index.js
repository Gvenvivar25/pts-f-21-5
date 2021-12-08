const express = require('express')
const path = require('path')
const productRoutes = require('./routes/routes')
const cors = require('cors')
const PORT = process.env.PORT ?? 3300
const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(productRoutes)
app.get('/', (req, res) => {
  res.send('<h1>Hello!</h1>')
})

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`)
})




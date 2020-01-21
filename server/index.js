
const express = require('express')

const bodyParser = require('body-parser')

const cors = require('cors')

const db = require('./db')

const soldierRouter = require('./routes/soldier-router')

const app = express()

const apiPort = 3000

app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

app.use(bodyParser.json())
app.use('/public', express.static(__dirname + '/public'));

global.__basedir = __dirname

db.on('error', console.error.bind(console, 'MongoDB connection error:'))



app.get('/', (req, res) => {

    res.send('Hello World!')

})



app.use('/api', soldierRouter)



app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))



const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()
const mongo_url = 'mongodb://club_lbs_admin:club_lbs_admin_1@ds125381.mlab.com:25381/club_lbs'

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))

var db

MongoClient.connect(mongo_url, (err, client) => {
  if (err) return console.log(err)
  db = client.db('club_lbs') // whatever your database name is
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, results) => {
    if (err) return console.log(err)
    console.log(results)
    res.render('index.ejs', {quotes: result})
  })
})

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})

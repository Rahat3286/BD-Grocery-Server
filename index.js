const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.79vii.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express()

app.use(cors())
app.use(bodyParser.json())


const port = process.env.PORT || 6060;
// console.log(process.env.DB_USER)

app.get('/', (req, res) => {
    res.send("hello from fresh valley it's working")

    // console.log(uri);
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        console.log('connection error', err)
        const productsCollection = client.db("freshValley").collection("products");
        const productCollection = client.db("freshValley").collection("products");
        console.log('database connected succefully');
        // perform actions on the collection object
        // client.close();
    });

})

app.listen(process.env.PORT || 6060)
// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
// })
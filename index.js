// working code

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.79vii.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const app = express()

app.get('/', (req, res) => {
    res.send('hello from freshvalley its working')
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const port = 5000;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const productsCollection = client.db("freshValleyStore").collection("products");
    const ordersCollection = client.db("freshValleyStore").collection("orders");

    console.log('database connected')

    app.post("/addProduct", (req, res) => {
        const product = req.body;
        console.log(product)
        productsCollection.insertOne(product)
            .then(result => {
                console.log(result.insertedCount);
                res.send(result.insertedCount > 0)
            })
    })

    app.get('/products', (req, res) => {
        productsCollection.find({}) //.limit(9)
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

    app.get('/product/:key', (req, res) => {
        productsCollection.find({ key: req.params.key }) //.limit(9)
            .toArray((err, documents) => {
                res.send(documents[0]);
            })
    })

    app.post('/productsByKeys', (req, res) => {
        const productKeys = req.body;
        productsCollection.find({ key: { $in: productKeys } })
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

    app.post('/addOrder', (req, res) => {
        const order = req.body;
        ordersCollection.insertOne(order)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
    })
});

app.listen(process.env.PORT || port)

// working code



















// working code

// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const MongoClient = require('mongodb').MongoClient;
// require('dotenv').config()


// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.79vii.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
// // app.use(bodyParser.urlencoded({ extended:false }));

// const app = express()

// app.use(bodyParser.json());
// app.use(cors());

// const port = 5000;





// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//     const productsCollection = client.db("freshValleyStore").collection("products");
//     const ordersCollection = client.db("freshValleyStore").collection("orders");

//     // app.post('/addProduct', (req, res) => {
//     //     const products = req.body;
//     //     console.log(products);
//     // })


//     // working code
//     app.post('/addProduct', (req, res) => {
//         const products = req.body;
//         productsCollection.insertOne(products)
//             .then(result => {
//                 console.log(result.insertedCount);
//                 res.send(result.insertedCount)
//             })
//     })
//     // working code

//     app.get('/products', (req, res) => {
//         productsCollection.find({}) //.limit(9)
//             .toArray((err, documents) => {
//                 res.send(documents);
//             })
//     })

//     app.get('/product/:key', (req, res) => {
//         productsCollection.find({ key: req.params.key }) //.limit(9)
//             .toArray((err, documents) => {
//                 res.send(documents[0]);
//             })
//     })

//     app.post('/productsByKeys', (req, res) => {
//         const productKeys = req.body;
//         productsCollection.find({ key: { $in: productKeys } })
//             .toArray((err, documents) => {
//                 res.send(documents);
//             })
//     })

//     app.post('/addOrder', (req, res) => {
//         const order = req.body;
//         ordersCollection.insertOne(order)
//             .then(result => {
//                 res.send(result.insertedCount > 0)
//             })
//     })
// });


// app.listen(port)
























// working code


// const express = require('express')
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const MongoClient = require('mongodb').MongoClient;
// require('dotenv').config()

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.79vii.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// const app = express()

// app.use(bodyParser.json());
// app.use(cors());

// const port = process.env.PORT || 5055;
// // console.log(process.env.DB_USER)

// app.get('/', (req, res) => {
//     res.send("hello from fresh valley it's working")

//     const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//     client.connect(err => {
//         console.log('connection error', err)
//         const productsCollection = client.db("freshValley").collection("products");
//         // const ordersCollection = client.db("freshValley").collection("products");
//         console.log('database connected successfully');

//         app.post('/addProduct',(req, res) => {
//             // console.log(products);
//             const products = req.body;
//             productsCollection.insertMany(products)
//             .then(result =>{
//                 console.log(result.insertedCount);
//                 res.send(result.insertedCount)
//             })
//         })
//         // perform actions on the collection object
//         // client.close();
//     });

// })

// app.listen(process.env.PORT || 5055)
// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
// })
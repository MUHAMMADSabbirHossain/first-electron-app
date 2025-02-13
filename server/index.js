const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const PORT = 5000 || process.env.PORT;


/* middleware */
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ofj6d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {

    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");


        // all collections
        const database = client.db("sample_mflix");
        const usersCollection = database.collection("users");


        // get all users
        app.get(`/users`, async (req, res) => {
            const cursor = usersCollection.find();
            const result = await cursor.toArray();

            res.send(result);
        })


        // post users for register
        app.post('/users', async (req, res) => {
            const user = req.body;

            const query = { email: user.email };
            const existingUser = await usersCollection.findOne(query);
            if (existingUser) {
                return res.send({ message: 'User already exists' });
            }

            const result = await usersCollection.insertOne(user);
            res.send(result);
        })

        // // login users
        // app.get('/users/:email', async (req, res) => {
        //     const email = req.params.email;
        //     const query = { email: email };
        //     const user = await usersCollection.findOne(query);
        //     res.send(user);
        // })


    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World for testing user-auth server!');
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});
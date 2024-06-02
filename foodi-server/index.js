import express from "express";
const app = express();
import cors from "cors";
const port = process.env.PORT || 5000;
import * as dotenv from "dotenv";
dotenv.config();

//middleware
app.use(cors());
app.use(express.json());

// mongodb config
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@foodi.m8tn2j4.mongodb.net/?retryWrites=true&w=majority&appName=foodi`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    //database and collection
    const menuCollections = client.db("foodi").collection("menus");
    const cartCollections = client.db("foodi").collection("carts");

    // all menu items operations
    app.get("/menu", async (req, res) => {
      const result = await menuCollections.find().toArray();
      res.send(result);
    });

    // posting cart item
    app.post("/carts", async (req, res) => {
      const cartItem = req.body;
      const result = await cartCollections.insertOne(cartItem);
      res.send(result);
    });

    // get cart data using email
    app.get('/carts', async(req, res) => {
      const email = req.query.email;
      const filter = {email: email};
      const result = await cartCollections.find(filter).toArray();
      res.send(result);
    });

    // get specific carts item
    app.get('/carts/:id', async(req, res) => {
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const result = await cartCollections.findOne(filter);
      res.send(result);
      console.log(result)
    });

    // delete items from cart
    app.delete('/carts/:id', async(req, res) => {
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const result = await cartCollections.deleteOne(filter);
      res.send(result);
    });

    // update carts item
    app.put('/carts/:id', async(req, res) => {
      const id = req.params.id;
      const { quantity } = req.body;
      const filter = {_id: new ObjectId(id)};
      const options = {upsert: true};

      const updateDoc = {
        $set: {
          quantity: parseInt(quantity, 10)
        }
      };

      const result = await cartCollections.updateOne(filter, updateDoc, options);
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


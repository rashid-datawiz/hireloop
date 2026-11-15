import express from 'express';
import cors from 'cors'
import { MongoClient } from 'mongodb';
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 5001;

// Middleware:
app.use(express.json())
app.use(cors())


const client = new MongoClient(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.creqbdq.mongodb.net/`);


//(1) connecting to mongodb
export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

// (2) we bring db from connection
const connectedClient = await connectToMongoDB()
const database = connectedClient.db("hireloopdb");
// (3) we bring user's collection from user 
const users = database.collection("user"); // creating collection named users
const jobs = database.collection("jobs") // creating collection named jobs


app.get('/', (req, res) => {
  res.send('hireloop is looping');
});

//(4) we create api to find the users from the db, here cursor is pointion to single element
app.get('/users', async (req, res)=>{
    const cursor = users.find({});
    const result = await cursor.toArray();
    res.send(result)

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
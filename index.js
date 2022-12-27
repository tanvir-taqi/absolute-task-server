
const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');

require('dotenv').config()



const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json());


// username absoluteTask
// password 2mOGNlk8dlDooPXF

app.get('/', (req, res) => {
    res.send('Hello World!');
})



const uri = process.env.DB_ACCESS
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  if(err){
    console.log(err);
  }
  else{
    console.log("database connection successful");
  }
 
});


const run = async()=>{
    try{
        const usersCollection = client.db("absoluteTask").collection("users");
        const tasksCollection = client.db("absoluteTask").collection("tasks");

        app.post('/users', async(req, res)=>{
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.send(result)
        })

        app.post('/tasks', async(req, res)=>{
            const task = req.body;  
            const result = await tasksCollection.insertOne(task);
            res.send(result)
        })

    }
    finally{

    }
}

run().catch(err=>{console.log(err)})


app.listen(port, () => {
    console.log("server listening on port", port);
})
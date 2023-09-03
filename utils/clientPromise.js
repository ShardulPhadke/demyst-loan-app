import { MongoClient } from 'mongodb';

const URI = process.env.MONGODB_URI;
const options = {};

let client = new MongoClient(URI, options);
let clientPromise;

if(!global._mongoClientPromise){
    global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default clientPromise;

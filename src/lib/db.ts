import { MongoClient, ServerApiVersion } from "mongodb";

const MONGO_URL= process.env.MONGO_URL || "";
if (!process.env) {
  throw new Error("Mongo URL not found!");
}


const client = new MongoClient(MONGO_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function connectToDB() {
  try {
    await client.connect();
    console.log(">>>>Connected to MongoDB Atlas<<<<");
    return client.db('blogsummarizer');
  } catch (err) {
    console.log(err);
  }
}

export async function getCollection(collectionName:string) {
  const db = await connectToDB();
  if (db) return db.collection(collectionName);

  return null;
}
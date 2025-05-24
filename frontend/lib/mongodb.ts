// Add TypeScript type declarations for the MongoDB client promise
import { MongoClient } from "mongodb";

const clientPromise: Promise<MongoClient> = Promise.resolve(new MongoClient(""));
export default clientPromise;

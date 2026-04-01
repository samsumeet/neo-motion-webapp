import { MongoClient } from "mongodb";
import "server-only";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getMongoUri() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("Missing MONGODB_URI environment variable.");
  }

  return uri;
}

export function getMongoClientPromise() {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = new MongoClient(getMongoUri()).connect();
  }

  return global._mongoClientPromise;
}

export async function getDatabase() {
  const connectedClient = await getMongoClientPromise();
  const databaseName = process.env.MONGODB_DB;

  if (!databaseName) {
    throw new Error("Missing MONGODB_DB environment variable.");
  }

  return connectedClient.db(databaseName);
}

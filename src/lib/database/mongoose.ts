import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  connection: Mongoose | null;
  connectionPromise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    connection: null,
    connectionPromise: null,
  };
}

export const connectToDatabase = async () => {
  if (cached.connection) {
    return cached.connection;
  }

  if (!MONGODB_URL) {
    throw new Error('Please define the MONGODB_URL environment variable');
  }

  cached.connectionPromise =
    cached.connectionPromise ??
    mongoose.connect(MONGODB_URL, { dbName: 'imaginify', bufferCommands: false });

  cached.connection = await cached.connectionPromise;

  return cached.connection;
};

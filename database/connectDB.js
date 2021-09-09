import mongoose from 'mongoose';


const MONGODB_URI = "mongodb+srv://admin-ali:test123@cluster0.8uyec.mongodb.net/meetups";

if (!MONGODB_URI)
    throw new Error('Invalid URI!');

let cached = global.mongoose;

if (!cached)
    cached = global.mongoose = { conn: null, promise: null };

async function connectDB() {
    if (cached.conn)
        return cached.conn;

    if (!cached.promise) {
        const opts = {
            useNewUrlParser: true,
            retryWrites: true,
            w: "majority"
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => mongoose);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectDB;
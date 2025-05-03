// import mongoose, { Connection } from 'mongoose'
// import dotenv from 'dotenv'
// dotenv.config()
// const MONGODB_URI  = process.env.MONGODB_URL

// if(!MONGODB_URI){
//     throw new Error("MongoDB connection URL not found")
// }
// const dbConnection = async () =>{

//    try {
//      const conn = await mongoose.connect(MONGODB_URI)
//      return conn;
//    } catch (error) {
//         console.error('Error ',error)
//    }
// }

// export default dbConnection;

import mongoose from 'mongoose'
const mongoDBurl = process.env.MONGODB_URL

if(!mongoDBurl){
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local")
}

let cached = global.mongoose
if(!cached){
    cached = global.mongoose = {con : null, promise : null}
}

const dbConnect = async()=>{
    if(cached.conn){
        return cached.conn
    }
}

if(!cached.promise){
    const opts = { bufferCommands : false}
    cached.promise = mongoose.connect(mongoDBurl,opts).then((mongoose)=>{
        return mongoose
    })
}


    try{
        cached.conn = await cached.promise;

    }
 catch (error) {
    cached.promise = null
    throw error;
    
}

export default dbConnect;
// return cached.conn;

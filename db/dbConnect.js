
// import mongoose from 'mongoose'
// const mongoDBurl = process.env.MONGODB_URL

// if(!mongoDBurl){
//     throw new Error("Please define the MONGODB_URI environment variable inside .env.local")
// }

// let cached = global.mongoose
// if(!cached){
//     cached = global.mongoose = {con : null, promise : null}
// }

// const dbConnect = async()=>{
//     if(cached.conn){
//         return cached.conn
//     }
// }

// if(!cached.promise){
//     const opts = { bufferCommands : false}
//     cached.promise = mongoose.connect(mongoDBurl,opts).then((mongoose)=>{
//         return mongoose
//     })
// }


//     try{
//         cached.conn = await cached.promise;

//     }
//  catch (error) {
//     cached.promise = null
//     throw error;
    
// }

// export default dbConnect;
// // return cached.conn;

import mongoose from 'mongoose';

const mongoDBurl = process.env.MONGODB_URL;

if (!mongoDBurl) {
  throw new Error("Please define the MONGODB_URL environment variable inside .env.local");
}

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = { bufferCommands: false };
    cached.promise = mongoose.connect(mongoDBurl, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
};

export default dbConnect;

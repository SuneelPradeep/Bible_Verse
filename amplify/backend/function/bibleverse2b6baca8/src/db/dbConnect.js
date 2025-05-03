
const  mongoose = require('mongoose')
const mongoDBurl = process.env.MONGODB_URL

const dbConnection = async() =>{
    try {
        return await mongoose.connect(mongoDBurl)
    } catch (error) {
        console.error(error)
    }
   
} 
module.exports = dbConnection;

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
    
// }}

// module.exports =  dbConnect;
// // return cached.conn;

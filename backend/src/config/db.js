const mongoose = require("mongoose")
const colors = require('colors')
const config = require("./config");

// database connected
const DB_URL = config.db.url;

const connectDB = async (options ={}) =>{
    try {
        await mongoose.connect(DB_URL, options);
        console.log('Connection To DB Is Successfull'.bgGreen.white)
        mongoose.connection.on('error', (error) =>{
            console.error('DB Connection  error: '.bgRed.white, error);
        })
        
    } catch (error) {
        console.error('Could Not Connect to DB: '.bgRed.black, error.toString());
    }
};
module.exports = connectDB;
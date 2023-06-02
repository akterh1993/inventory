const colors = require('colors');
const app = require('./app');
const config = require('./src/config/config');
const connectDB =require('./src/config/db')



// config
// if (process.env.NODE_ENV !== "PRODUCTION") {
//     require("dotenv").config({
//       path: "./config/.env",
//     });
//   }

// server configur
const HOST = config.app.host;
const PORT = config.app.port;



app.listen(PORT, HOST, async()=> {
    console.log(`Server is Running on  http://${HOST}:${PORT}`.bgCyan.white);
    await connectDB();
});
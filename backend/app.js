const express =require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const createError = require('http-errors');
const xssClean = require('xss-clean');
const { rateLimit } = require("express-rate-limit");


const app=express();

const rateLimiter = rateLimit({
  windowMs: 1 * 60 *1000,
  max: 5,
  message: 'Too many requests from this IP'
});

//middlewares
app.use(morgan("dev"));
app.use(xssClean());
app.use(rateLimiter);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

// import routes
const seedRouter = require("./src/routes/seedRouter");
app.use('/api/seed', seedRouter)
const userRouter = require("./src/routes/userRouter");
app.use('/api/users', userRouter);
// const cetagoryRouter = require("./src/routes/categoryRoute");
// app.use("/api", cetagoryRouter);
app.use((req, res, next)=>{
  createError(404, 'Route Not Found');
  next();
})
app.use((err, req, res, next)=>{
  return res.status(err.status || 500).json({
    success: false,
    message: err.message,
  })
})

module.exports = app;
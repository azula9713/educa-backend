const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const HttpException = require("./utils/HttpException.utils");
const errorMiddleware = require("./middleware/error.middleware");
const teacherRouter = require("./routes/teacher.route");
const studentRouter = require("./routes/student.route");
const courseRouter = require("./routes/course.route");

// Init express
const app = express();
// Init environment
dotenv.config();
// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());
// enabling cors for all requests by using cors middleware

app.use((req, res, next) => {
  const allowedOrigins = ["http://localhost:3000", "http://localhost:8080"];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST, PATCH, DELETE ,OPTIONS"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  return next();
});
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );

const port = Number(process.env.PORT || 3331);

app.use(`/api/v1/teachers`, teacherRouter);
app.use(`/api/v1/students`, studentRouter);
app.use(`/api/v1/courses`, courseRouter);

// 404 error
app.all("*", (req, res, next) => {
  const err = new HttpException(404, "Endpoint Not Found");
  next(err);
});

// Error middleware
app.use(errorMiddleware);

// starting the server
app.listen(port, () => console.log(`🚀 Server running on port ${port}!`));

module.exports = app;

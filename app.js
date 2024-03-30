// Starting Server
const express = require("express");
const morgan = require("morgan");
const server = express();

const { default: mongoose } = require("mongoose");
const loginRoute = require("./routes/authentication");
const teachersRoute = require("./routes/teachersRoute");
const childrenRoute = require("./routes/childrenRoute");
const classRoute = require("./routes/classesRoute");
const authenticationMW = require("./midlewares/authenticationMW");
const registerRoute = require("./routes/registerRoute");
const port = process.env.PORT || 8080;

mongoose
  .connect("mongodb://127.0.0.1:27017/NurseryProject")
  .then(() => {
    console.log("DB Connected....");
    server.listen(port, () => {
      console.log("listening ");
    });
  })
  .catch((error) => {
    console.log("Error" + error);
  });

//midlleware
server.use(morgan(":method :url"));
server.use(express.json());
server.use(registerRoute);
server.use(loginRoute);
server.use(authenticationMW);
server.use(teachersRoute);
server.use(childrenRoute);
server.use(classRoute);

// Not Found
server.use((request, response) => {
  response.status(404).json({ data: "Not Found" });
});

// Error MW
server.use((error, request, response, next) => {
  response.status(500).json({ data: `Error MW ${error}` });
});

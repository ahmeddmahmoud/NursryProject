// Starting Server
const express = require("express");
const morgan = require("morgan");
const server = express();
const dotenv = require("dotenv").config();
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUiExpress = require("swagger-ui-express");

const { default: mongoose } = require("mongoose");
const loginRoute = require("./routes/authentication");
const teachersRoute = require("./routes/teachersRoute");
const childrenRoute = require("./routes/childrenRoute");
const classRoute = require("./routes/classesRoute");
const authenticationMW = require("./midlewares/authenticationMW");
const registerRoute = require("./routes/registerRoute");
const port = process.env.PORT || process.env.LOCALPORT;

const options = {
  definition: {
    openapi: "3.0.0",
    servers: [{ url: "http://localhost:8080/" }],
    info: {
      title: "NurserySystem Documentation",
      version: "1.0.0",
      description: "",
    },
    security: [
      {
        apiKeyAuth: [],
      },
    ],
    components: {
      securitySchemes: {
        apiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "x-api-key",
        },
      },
    },
  },

  apis: ["./Routes/*.js"], 
};

mongoose
  .connect(process.env.DBURL)
  .then(() => {
    console.log("DB Connected....");
    server.listen(port, () => {
      console.log("listening ");
    });
  })
  .catch((error) => {
    console.log("Error" + error);
  });

const swagerSpec = swaggerJSDoc(options);

//midlleware
server.use(morgan(":method :url"));
server.use(express.json());
server.use(
  "/api-docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swagerSpec)
);
// server.use(registerRoute);
// server.use(loginRoute);
// server.use(authenticationMW);
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

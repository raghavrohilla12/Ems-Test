require("dotenv").config();
const express = require("express");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(
  cors({
    origin: [process.env.CLIENT_URL, "http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Swagger config (static server URL)
const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: { title: "EMS API", version: "1.0.0" },
    servers: [{ url: "http://localhost:5000" }],
    components: {
      securitySchemes: {
        bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      },
    },
  },
  apis: ["./routes/*.js"],
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

connectDB();

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on", process.env.PORT || 5000);
  console.log("Swagger:", `http://localhost:${process.env.PORT || 5000}/api-docs`);
});

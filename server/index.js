const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const http = require("http");
const path = require("path");
const connectDB = require("./config/db"); // Import DB connection

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 8800;

const server = http.createServer(app);

app.use(express.static('public'));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
connectDB();

app.use('/api', require('./Route/mainRoute'));

// Serve Swagger documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

server.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});

require("reflect-metadata");
require("dotenv").config();
const express = require("express");
const { DataSource } = require("typeorm");
const authRoutes = require("./routes/auth");
const softwareRoutes = require("./routes/software");
const requestRoutes = require("./routes/requests");

const app = express();
const PORT = process.env.PORT || 5000;  

app.use(express.json());

// Initialize TypeORM DataSource
const AppDataSource = new DataSource(require("../ormconfig"));

AppDataSource.initialize()  
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err); 
  });

// Routes 
app.use("/api/auth", authRoutes);
app.use("/api/software", softwareRoutes);
app.use("/api/requests", requestRoutes); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

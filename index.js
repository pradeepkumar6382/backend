require('dotenv').config()
const express = require('express');
const path = require("path");
const cors = require('cors');
const login = require("./login.js"); 
const app = express();

const mongoose=require('mongoose')
const { DB_CONNECTION, DATABASE1, PORT } = process.env;
console.log(DB_CONNECTION+"hhh");

mongoose
  .connect(DB_CONNECTION + DATABASE1)
  .then(() => {
    console.log("mongodb connected !"); 
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(cors());  


app.use(login);   
app.use("/getphoto", express.static(path.resolve(__dirname,"images")));
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

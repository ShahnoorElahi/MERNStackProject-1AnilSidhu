const express = require("express");
const mongoose = require('mongoose');

const app = express();

const connectDB = async () => {
  mongoose.connect('mongodb://127.0.0.1:27017/abc');

  const productSchema = new mongoose.Schema({});

  const product = mongoose.model('cbas', productSchema);

  const data = await product.find({});

  console.warn(data);
}

connectDB();

app.listen(5000);
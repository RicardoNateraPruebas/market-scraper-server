// models/product.js

const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let productSchema = new Schema(
  {
    store: String,
    categorie: String,
    search: String,
    products: [{
        nombre : String,
        link : String,
        img : String,
        precio : String
    }],
  },
  { timestamps: true }
);

let Product = mongoose.model("product", productSchema);

module.exports = Product;
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    desc: {
        type: String,
    },
    img: {
        type: String,
    },
    price: {
        type: String,
    },
    numberofproducts: {
        type: Number
    },
    categories: {
        type: Array
    },
    imgProduct: {
        type: String,
    },
    khung: {
        type: String,
    },
    memory: {
        type: Array
    },
    chip: {
        type: String
    },
    ram: {
        type: String
    },
    kichthuoc: {
        type: String
    },
    trongluong: {
        type: String
    },
    cauhinh: {
        type: String
    },
    color: {
        type: Array
    },
    sale: {
        type: String
    },
    sale1: {
        type: String
    },
    pricefake: {
        type: String
    },
    pricesale: {
        type: String,
    },
    titletragop: {
        type: String,
    },
    imgIcon: {
        type: String,
    },
    imgIcon1: {
        type: String,
    },
    imgIcon2: {
        type: String,
    },
    imgIcon3: {
        type: String,
    },
}, { timestamps: true });
module.exports = mongoose.model("Product", ProductSchema);
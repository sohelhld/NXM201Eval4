const mongoose = require('mongoose');
require("dotenv").config()

const connection = mongoose.connect("mongodb://127.0.0.1:27017/NXM201Eval4")

module.exports={
    connection
}
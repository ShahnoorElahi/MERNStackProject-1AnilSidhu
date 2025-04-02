const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/abc');
const productSchema = new mongoose.Schema({
    path: String,
    filename: String
});

module.exports = mongoose.model('abs', productSchema);
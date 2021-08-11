const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
    foodName: {type: String, required: true,},
    daysFasting: {type: Number, required: true},
});

module.exports = mongoose.model('Food', FoodSchema);
const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');

const foodModel = require('./models/food');
const { findByIdAndUpdate } = require('./models/food');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/food", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected to DB..."))
    .catch(console.error)

app.post('/makeFood', async (req, res) => {
    const food = new foodModel({foodName: req.body.foodName, daysFasting: req.body.daysFasting});

    try {
        await food.save();
        console.log("Saved Entry");
    } catch {
        console.error()
    }

    res.json(food);
});

app.put('/updateFood/:id', async (req, res) => {
    const food = await foodModel.findById(req.params.id);

    console.log("HELLO")

    food.foodName = req.body.foodName;

    food.save();

    res.json(food);
});

app.delete('/deleteFood/:id', async (req, res) => {
    const food = await foodModel.findByIdAndDelete(req.params.id);

    res.json(food);

});

app.get('/food', async (req, res) => {
    const foods = await foodModel.find();
    res.json(foods);
});

app.listen(8080, () => {
    console.log("Listening on Port 8080...")
});
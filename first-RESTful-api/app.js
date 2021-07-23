const express = require('express');
const mongoose = require('mongoose');

// Creating app
const app = express();

// Database
mongoose.connect('mongodb://localhost/motivation', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.once('open', () => {
    console.log("Connected to MongoDB database!");
})

// Middleware
app.use(express.json());
//app.use(express.urlencoded()); //Parse URL-encoded bodies

// Routes
app.get('/', (req, res) => {
    res.send("Hello World");
});

const QuotesRoute = require('./routes/Quotes');

app.use('/quotes', QuotesRoute);

// Starting server
app.listen(8080, console.log("listening on port 8080"));
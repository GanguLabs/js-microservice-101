const express = require("express");
const app = express();

const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/microservice_test", () => {
    console.log("Database is connected");
});

app.listen(4545, () => {
    console.log("Server running at 4545");
});

app.get("/", (req, res) => {
    res.send("This is our main endpoint");
})

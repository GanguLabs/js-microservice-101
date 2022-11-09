require("./models/Order")

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const axios = require("axios");

app.use(bodyParser.json());
mongoose.connect("mongodb+srv://rootAdmin:1234@main-cluster.nlwzwip.mongodb.net/test", () => {
    console.log("Orders Database is connected");
});

const Order = mongoose.model("Order");

app.post("/order", (req, res) => {
    var newOrder = {
        CustomerID: mongoose.Types.ObjectId(req.body.CustomerID),
        BookID: mongoose.Types.ObjectId(req.body.BookID),
        initialDate: req.body.initialDate,
        deliveryDate: req.body.deliveryDate
    }
    var order = new Order(newOrder);

    order.save().then(() => {
        res.send("new order created successfully");
        ;
    }).catch((err) => {
        if (err) {
            throw err
        }
    })
})


app.get("/orders", (req, res) => {
    Order.find()
        .then((books) => {
            res.json(books)
        })
        .catch((err) => {
            if (err) {
                throw err
            }
        })
})

app.get("/order/:id", (req, res) => {
    Order.findById(req.params.id)
        .then((order) => {
            if (order) {
                axios.get("http://localhost:5555/customer/" + order.CustomerID)
                    .then((response) => {
                        var orderdata = {
                            customerName: response.data.name,
                            bookTitle: ""
                        }

                        axios.get("http://localhost:4545/book/" + order.BookID).then((response) => {
                            orderdata.bookTitle = response.data.title

                            res.json(orderdata);
                        })
                    })
            } else {
                res.send("Invalid Order ID")
            }
        })
        .catch((err) => {
            if (err) {
                throw err
            }
        })
})

app.listen(7777, () => {
    console.log("Orders Server running at 7777")
})
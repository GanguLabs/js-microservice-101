require("./models/Customer")

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/customerService", () => {
    console.log("Database is connected");
});

const Customer = mongoose.model("Customer")

app.post("/customer", (req, res) => {
    var newCustomer = {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address
    }

    var customer = new Customer(newCustomer);

    customer.save().then(() => {
        console.log("Customer Created")
    }).catch((err) => {
        if (err) {
            throw err
        }
    });

    res.send("Customer created successfully");
})


app.get("/customers", (req, res) => {
    Customer.find().then((json) => {
        res.send(json)
    }).catch((err) => {
        if (err) {
            throw err
        }
    })
})

app.get("/customer/:id", (req, res) => {
    Customer.findById(req.params.id).then((customer) => {
        if (customer) {
            res.send(customer)
        } else {
            res.send("Invalid customer Id");
        }
    }).catch((err) => {
        if (err) {
            throw err
        }
    })
})

app.delete("/customer/:id", (req, res) => {
    Customer.findOneAndRemove(req.params.id).then(() => {
        res.send("Customer deleted successfully");
    }).catch((err) => {
        if (err) {
            throw err
        }
    })
})

app.listen(5555, () => {
    console.log("Customer Server running on port 5555")
});
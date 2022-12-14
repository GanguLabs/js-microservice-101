require("./models/Book")

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://rootAdmin:1234@main-cluster.nlwzwip.mongodb.net/test", () => {
    console.log("Database is connected");
});

app.listen(4545, () => {
    console.log("Server running at 4545");
});

app.get("/", (req, res) => {
    res.send("This is our main endpoint");
})

const Book = mongoose.model("Book");
app.post("/book", (req, res) => {
    var newBook = {
        title: req.body.title,
        author: req.body.author,
        numberPages: req.body.numberPages,
        publisher: req.body.publisher
    }

    var book = new Book(newBook);

    book.save().then(() => {
        console.log("new book created");
    }).catch((err) => {
        if (err) {
            throw err;
        }
    })

    res.send("A new book created successfully")
});

app.get("/books", (req, res) => {
    Book.find()
        .then((books) => {
            res.json(books);
        })
        .catch((err) => {
            throw err
        })
})

app.get("/book/:id", (req, res) => {
    Book.findById(req.params.id)
        .then((book) => {

            if (book) {
                res.json(book);

            } else {
                res.sendStatus(404);
            }

        }).catch((err) => {
            throw err;
        });
})

app.delete("/book/:id", (req, res) => {
    Book.findOneAndRemove({ _id: req.params.id })
        .then(() => {
            res.send("book deleted successfully")
        })
        .catch((err) => {
            throw err
        })
})


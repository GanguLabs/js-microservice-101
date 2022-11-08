const express = require("express");
const app = express();

app.listen(4545, () => {
    console.log("Server running at 4545");
});

app.get("/", (req, res) => {
    res.send("This is our main endpoint");
})

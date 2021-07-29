const express = require('express');
const path = require('path');
const app = express();
app.use(express.static('./public'));
const port = process.env.PORT || 8888;
app.get("/draw", (req, res) => {
    let options = {
        root: path.join(__dirname, "./public"),
        dotfiles: 'deny'
    };
    res.sendFile("demo.html",options);
});

app.get("/conv", (req, res) => {
    let options = {
        root: path.join(__dirname, "./public"),
        dotfiles: 'deny'
    };
    res.sendFile("test_conv.html",options);
});

app.listen(port, () => {
    console.log(`server listen on port =${port}`)
});

const express = require('express');
const app = express();
const port = process.env.PORT || 8888;
app.get("/", (req, res) => {
    res.end("Hello World, Welcome.");
});

app.get("/test", (req, res) => {
    res.end("You are in the /test");
});

app.listen(port, () => {
    console.log(`server listen on port =${port}`)
});
/*
const express = require('express');
const path = require('path');
const app = express();
app.use(express.static('./public'));
const port = process.env.PORT || 8888;
app.get("/", (req, res) => {
    let options = {
        root: path.join(__dirname, "./public"),
        dotfiles: 'deny'
    };
    res.sendFile("demo.html",options);
});

app.listen(port, () => {
    console.log(`server listen on port =${port}`)
});
*/
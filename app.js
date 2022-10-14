const express = require("express");
var path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '/src')));

app.get("/",(req, res) =>{
    console.log("teste")
    res.sendFile(__dirname + "/src/index.html")
} )

app.listen(3333, () => console.log('Server is running! http://localhost:3333'));
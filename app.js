const express = require("express");
var path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '/src')));
app.use(express.static(path.join(__dirname, '/gr2-web')));

app.get("/",(req, res) =>{
    res.sendFile(__dirname + "/src/index.html")
} )

app.get("/gr",(req, res) =>{
    res.sendFile(__dirname + "/gr2-web/index.html")
} )


app.get("/grep",(req, res) =>{
    res.sendFile(__dirname + "/gr2-web/index_emperio.html")
} )


app.listen(3333, () => console.log('Server is running! http://localhost:3333'));
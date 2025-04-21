const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const port = process.env.PORT || 9000;

const { MongoClient } = require('mongodb');
const url = "mongodb://127.0.0.1:27017";
const database = "Path_Enlightenment";
const client = new MongoClient(url);



const static_path = path.join(__dirname, "../public");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));
app.set("view engine", "hbs");

async function getdata() {
    let result = await client.connect();
    let db = result.db(database);
    let collection = db.collection('doctors');
    let response = await collection.find({}).toArray();
    return response;
}

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, useNewUrlParser: true }));


app.get('/', async (req, res) => {
    res.render("index");
});

app.get('/list', async (req, res) => {
    const result = await getdata();
    var output = '<html><header><title>Doctor List from MongoDb</title><style> body{background: linear-gradient(to bottom, #68b7ba, #85c7e3);} h1{text-size:60px; color:white}#customers{ font-family: Arial, Helvetica, sans-serif;   border-collapse: collapse;  width: 100%;} #customers td, #customers th{border: 1px solid #ddd; padding: 8px;}#customers tr:nth-child(even){background-color: #f2f2f2;}</style></header><body>';
    output += '<center><h1>Doctor List retrieved</h1></center>';
    output += '<table border="1" id="customers"><tr><td><b>' + 'Name' + '</b></td><td><b>' + 'University' + '</b></td><td><b>' + 'Address' + '</b></td><td><b>' + 'Designation' + '</b></td><td><b>' + 'Contact' + '</b></td></tr>';

    result.forEach(function (todo) {
        output += '<tr><td>' + todo.name + '</td><td>' + todo.University + '</td><td>' + todo.Address + '</td><td>' + todo.Designation + '</td><td>' + todo.Contact + '</td></tr>'
    });

    output += '</table></body></html>'

    res.send(output);

});


app.listen(port, () => {
    console.log(`Server is listening on port number ${port}`);
});

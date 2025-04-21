const express= require("express");
const app= express();
const http = require("http");


var fs= require("fs");

var ipfsAPI = require('ipfs-api')
var ipfs = ipfsAPI('127.0.0.1', '5001', {protocol: 'http'}) 

const multer  = require('multer');
const { url } = require("inspector");
const upload = multer({ dest: 'uploads/' })


app.get("/",function (req,res){
   // res.send("Hello Welcome to node");
   res.sendFile(__dirname+'/public/index.html');
})

//const upload = multer({ dest: 'uploads/' });

app.post('/profile', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log(req.file);

  // Get the path to the file you want to upload
  const filePath = 'processed/processed_data.csv';

  // Read the file contents
  const data = fs.readFileSync(filePath);

  // Add the file to IPFS
  ipfs.add(data, function (err, file) {
    if (err) {
      console.log(err);
    }
    console.log(file);
    res.send(file[0].hash);
  });
});
app.listen(3000);
console.log("Server running on port : 3000")
const express= require("express");
const app= express();

var fs= require("fs");

var ipfsAPI = require('ipfs-api')
var ipfs = ipfsAPI('127.0.0.1', '5001', {protocol: 'http'}) 

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


app.get("/",function (req,res){
   // res.send("Hello Welcome to node");
   res.sendFile(__dirname+'./user_menu_app.js');
})

app.post('/profile', upload.single('avatar'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    console.log(req.file);

    var data = new Buffer.from(fs.readFileSync(req.file.path));
    ipfs.add(data, function(err, file){
        if(err){
            console.log(err);
        }
        console.log(file);
        res.send(file[0].hash);
    })
  })
app.listen(3000);
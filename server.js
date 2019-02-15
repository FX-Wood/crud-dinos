const express = require('express');
const app = express();
const fs = require('fs');

app.set('view engine', 'ejs');



app.get('/', function(req,res) {
    res.send('root');
})

app.use(express.static(__dirname + "/static"));

app.get('/dinosaurs', function(req, res) {
    const dinosaurs  = fs.readFileSync('./static/lib/dinos.json');
    var data = JSON.parse(dinosaurs)
    res.render('dinos/index', {myDinos: data})
})


app.listen(3000);

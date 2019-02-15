const express = require('express');
const app = express();
const fs = require('fs');

app.set('view engine', 'ejs');

app.get('/', function(req,res) {
    res.send('root');
})

app.use(express.static("static"));
app.use(express.urlencoded({extended:false}));

app.get('/dinosaurs', function(req, res) {
    const dinosaurs  = fs.readFileSync('static/lib/dinos.json');
    var data = JSON.parse(dinosaurs)
    res.render('dinos/index', {myDinos: data})
});

app.get('/dinosaurs/new', function(req,res) {
    res.render('dinos/new')
});

app.post('/dinosaurs', function(req, res) {
    var dinosaurs = fs.readFileSync("static/lib/dinos.json")
    dinosaurs = JSON.parse(dinosaurs);
    dinosaurs.push(req.body);
    fs.writeFileSync("static/lib/dinos.json", JSON.stringify(dinosaurs));
    res.redirect('/dinosaurs')
})

app.post('/dinosaurs', function(req, res) {
    console.log(req.body);
});

app.get('/dinosaurs/:id', function(req, res) {
    const dinos = JSON.parse(fs.readFileSync('static/lib/dinos.json'));
    if (typeof dinos[req.params.id] !== 'undefined') {
        res.render('dinos/show', {dinoNum: req.params.id, myDino: dinos[req.params.id]})
    } else {
        res.render('dinos/show', {myDino: {name:'undefined', type: 'undefined'}})
    }

})

app.listen(3000);

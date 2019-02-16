const express = require('express');
const app = express();
const fs = require('fs');
const methodOverride = require('method-override')

app.set('view engine', 'ejs');

app.use(methodOverride('_method'))

app.use(express.static("static"));
app.use(express.urlencoded({extended:false}));

app.get('/', function(req,res) {
    res.send('root');
})

app.get('/dinosaurs', function(req, res) {
    console.log('GET /dinosaurs')
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
});

app.get('/dinosaurs/:id', function(req, res) {
    console.log('GET', req.params)
    const dinos = JSON.parse(fs.readFileSync('static/lib/dinos.json'));
    if (typeof dinos[req.params.id] !== 'undefined') {
        res.render('dinos/show', {dinoNum: req.params.id, myDino: dinos[req.params.id]})
    } else {
        res.render('dinos/show', {myDino: {name:'undefined', type: 'undefined'}})
    }
});

app.delete("/dinosaurs/:id", function(req, res) {
    console.log('delete route')
    var dinosaurs = JSON.parse(fs.readFileSync("static/lib/dinos.json"));
    let i = parseInt(req.params.id);
    dinosaurs.splice(i, 1);
    console.log("splicing", i)
    fs.writeFileSync('static/lib/dinos.json', JSON.stringify(dinosaurs));
    res.redirect("/dinos/dinosaurs");
});



app.put("dinosaurs/:id", function(req,res) {
    console.log('in the put route')
    var dinosaurs = JSON.parse(fs.readFileSync('static/lib/dinos.json'));
    var dino = req.params.id;

    dinosaurs[dino].name = req.body.name;
    dinosaurs[dino].type = req.body.type;
    fs.writeFileSync('./dinos.json', JSON.stringify(dinosaurs))
    res.redirect('/dinosaurs/')
});

app.get('/dinosaurs/:id/edit', function(req, res) {
    console.log('GET in the edit page' )
    const dinos = JSON.parse(fs.readFileSync('static/lib/dinos.json'));
    res.render('dinos/edit', {dinoNum: req.params.id, myDino: dinos[req.params.id]})
});

app.listen(3000);

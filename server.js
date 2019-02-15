const express = require('express');
const app = express();
const fs = require('fs');

app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/static"));

app.get('/dinosaurs', function(req, res) {
    res.send('working');
})



app.listen(3000);

const express = require('express');
const ejs = require('ejs');
const app = express();
const fs = require('fs');
const PORT = 9991;
const root = 'I:/IT/Photo Documentation/';
let i = 0;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.set('view engine', 'ejs');
app.get('/:market/:storeId', (req, res) => {
    let path = `${root}${req.params.market.toUpperCase()}/`;
    let storeId = req.params.storeId + ' -';
    fs.readdir(path, (err, items) => {
        if (err) return err;
        items.map(function(item) {
            if (item.startsWith(storeId, 0)) {
                //res.send(path + item);
                res.render('viewer.ejs', {
                    item: item,
                    path: path + item
                });
            }
        });
    });
});

app.listen(PORT);

require('dotenv').config();

const ogs = require('open-graph-scraper');
const express = require('express');
const app = express();

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
});

app.get('/', (req, res) => {
  if(req.query['url']){

    const siteUrl = req.query['url'];
    var options = {
        'url': siteUrl,
        'headers': {
        'accept-language': 'en'
        },
        'timeout': 4000
    };


    ogs(options, function (err, results, response) {
        if(results.err){
            res.json(results.err);
        } else {
            res.json(results);
            res.end();
        }
    });
  }

});
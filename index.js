const express = require('express');
const bodyParser = require('body-parser');
const axios = require("axios");
const app = express();
const config = require("./config.json");

const port = Number(process.env.PORT || 8000);

const APIKEY = config.apikey;

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/image', (req, res) => {
    res.render('all', {action: '/image'});
});

app.post('/', (req, res) => {
    const rawquery = req.body.query;
    const searchquery = (rawquery).split(" ");
    var query = "";
    for(let i = 0; i<searchquery.length; i++) {
        if(i === searchquery.length-1){
            query += searchquery[i];
        }else{
            query += searchquery[i] + '+';
        }
    }
    console.log(rawquery);
    const options = {
        method: 'GET',
        url: 'https://google-search3.p.rapidapi.com/api/v1/search/q='+query,
        headers: {
          'X-User-Agent': 'desktop',
          'X-Proxy-Location': 'IN',
          'X-RapidAPI-Host': 'google-search3.p.rapidapi.com',
          'X-RapidAPI-Key': APIKEY // please provide your own api key
        }
      };
      
      axios.request(options).then(function (response) {
          console.log('search result OK');
          const resultdata = response.data.results;
          
          res.render('all', {title: query, data: resultdata, rawquery: rawquery, action: ""});
      }).catch(function (error) {
          console.error(error);
      });
});

app.post('/image', (req, res) => {
    const rawquery = req.body.query;
    const searchquery = (rawquery).split(" ");
    var query = "";
    for(let i = 0; i<searchquery.length; i++) {
        if(i === searchquery.length-1){
            query += searchquery[i];
        }else{
            query += searchquery[i] + '+';
        }
    }
    console.log(rawquery);
    const options = {
        method: 'GET',
        url: 'https://google-search3.p.rapidapi.com/api/v1/image/q='+query,
        headers: {
          'X-User-Agent': 'desktop',
          'X-Proxy-Location': 'IN',
          'X-RapidAPI-Host': 'google-search3.p.rapidapi.com',
          'X-RapidAPI-Key': APIKEY // please provide your own api key
        }
      };
      
      axios.request(options).then(function (response) {
          console.log('result shown successfully');
          const resultdata = response.data.image_results;
          console.log(response.data);
          res.render('image', {title: query, data: resultdata, rawquery: rawquery});
      }).catch(function (error) {
          console.error(error);
      });
});

app.post('/news', (req, res) => {
    const rawquery = req.body.query;
    const searchquery = (rawquery).split(" ");
    var query = "";
    for(let i = 0; i<searchquery.length; i++) {
        if(i === searchquery.length-1){
            query += searchquery[i];
        }else{
            query += searchquery[i] + '+';
        }
    }
    console.log(rawquery);
    const options = {
        method: 'GET',
        url: 'https://google-search3.p.rapidapi.com/api/v1/news/q='+query,
        headers: {
          'X-User-Agent': 'desktop',
          'X-Proxy-Location': 'IN',
          'X-RapidAPI-Host': 'google-search3.p.rapidapi.com',
          'X-RapidAPI-Key': APIKEY // please provide your own api key
        }
      };
      
      axios.request(options).then(function (response) {
          console.log('search result OK');
          const resultdata = response.data.entries;
          
          res.render('news', {title: query, data: resultdata, rawquery: rawquery});
      }).catch(function (error) {
          console.error(error);
      });
});



app.listen(port, ()=> {
    console.log("server running on port 8000...");
});
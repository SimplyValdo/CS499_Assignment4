/*
* Name: Ubaldo Jimenez Prieto
* Date: March 15, 2017
* CS 499
* Assignment 4
* */

var elasticsearch = require('elasticsearch');
var parseString = require('xml2js').parseString;
var preFix = require('xml2js').processors.stripPrefix;
var express = require('express');
var request = require('request');
var app = express();

var xmlData;
var jsonData;
var xmlUrl = 'https://query.yahooapis.com/v1/public/yql?q=select%20item.title%2C%20item.condition%20from%20weather.forecast%20where%20woeid%20in%20(2487889%2C2442047%2C2487956%2C2486340)&diagnostics=true'
var jsonUrl = 'https://query.yahooapis.com/v1/public/yql?q=select%20item.title%2C%20item.condition%20from%20weather.forecast%20where%20woeid%20in%20(2487889%2C2442047%2C2487956%2C2486340)&format=json&diagnostics=true&callback='

var client = new elasticsearch.Client
(
    {
    host: 'search-simplyvaldo-zb6n3ouungk3t7fxopnrfsrty4.us-west-1.es.amazonaws.com',

    log: 'info'
    }
);

client.ping(
    {
        requestTimeout: 5000
    },
    function (error)
    {
        if (error)
        {
            console.trace('elasticsearch cluster is down!');
        }
        else
            {
                console.log('All is well');
            }
 });

function loadWeatherDataSet1() {

    var interval = setInterval(function()
    {
        request(jsonUrl, function (error, response, body) {

            if (!error && response.statusCode == 200) {

                data = JSON.parse(body);

                var info = data.query.results.channel;
                var id = 1;

                for(var i = 0; i< info.length; i++)
                {
                    console.log("ID: " + id)
                    console.log("Temperature: " + info[i].item.condition.temp)
                    console.log("Status : " + info[i].item.condition.text)
                    console.log("Date/Time : " + info[i].item.condition.date)
                    console.log("Location : " + info[i].item.title)
                    console.log()

                    client.index
                    (
                        {
                            index: 'weather',
                            type: 'location',
                            id: id,
                            body: {
                                temperature: parseInt(info[i].item.condition.temp),
                                status: info[i].item.condition.text,
                                date_time: info[i].item.condition.date,
                                location: info[i].item.title
                            }
                        },
                        function (error, response)
                        {
                            console.log("put item successfully.")
                        }
                    )

                    id++
                }
            }
        })

    },60000);
}

function loadWeatherDataSet2() {

    var interval = setInterval(function() {
        request(xmlUrl, function (error, response, body) {
            if (!error && response.statusCode == 200) {

                parseString(body, { tagNameProcessors: [preFix] },function(err, result) {

                    var info = result.query.results[0].channel;
                    var id = 1;

                    for(var i = 0; i< info.length; i++)
                    {
                        console.log("ID: " + id)
                        console.log("Temperature: " + info[i].item[0].condition[0].$.temp)
                        console.log("Status : " + info[i].item[0].condition[0].$.text)
                        console.log("Date/Time : " + info[i].item[0].condition[0].$.date)
                        console.log("Location : " + info[i].item[0].title)
                        console.log()

                        client.index
                        (
                            {
                                index: 'weather',
                                type: 'location',
                                id: id,
                                body: {
                                    temperature: parseInt(info[i].item[0].condition[0].$.temp),
                                    status: info[i].item[0].condition[0].$.text,
                                    date_time: info[i].item[0].condition[0].$.date,
                                    location: info[i].item[0].title
                                }
                            },
                            function (error, response)
                            {
                                console.log("put item successfully.")
                            }
                        )

                        id++
                    }
                });
            }
        })
    },60000);
}

function searchWeatherLocation(searchID, callback) {
    client.search({
        index: 'weather',
        type: 'location',
        body: {
            "query": {
                "bool": {
                    "must": [
                        { "match": { "_index": "weather" }},
                        { "match": { "_id":  searchID }}
                    ]
                }
            }
        }

    }, function (error, response) {
        console.log(response);
        if (callback) {
            callback(response);
        }

        return response;
    });
}

//*** Use Json format ***//
loadWeatherDataSet1();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/load', function (req, res) {

    console.log()

    //*** Use Json format ***//
    loadWeatherDataSet1();


    //*** Use xml format ***//
    /* console.log()
     loadWeatherDataSet2(); */
})

app.get('/search', function (req, res) {

    //ID range is from (1-4)
    searchWeatherLocation(1)
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})

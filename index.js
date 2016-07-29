#!/usr/bin/env node

var express = require('express'),
    redis   = require('redis');

var PORT = 8080;
var db   = redis.createClient();

var app = express();
var key = 'rtc.cookie.';

// Enforce user permissions
app.get('/validate', function (req, res) {

    console.log('Validate cookie', req.headers.cookie);

    db.get(key+ req.headers.cookie, function(err, value) {
        if (value) {
            res.sendStatus(204);
        } else {
            res.sendStatus(401);
        }
    });

});

// Grant user permissions
app.get('/grant', function (req, res) {

    console.log('Grant cookie', req.headers.cookie);

    db.set(key + req.headers.cookie, true, function(err, value) {
        if (err) {
            res.sendStatus(500);
        } else {
            res.sendStatus(204);
        }
    });

});

app.get('/jitsi', function (req, res) {
    console.log('signaling starts');
    res.send('jitsi');
});

app.listen(PORT, function () {
    console.log('Listening on port ' + PORT);
});

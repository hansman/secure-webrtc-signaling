#!/usr/bin/env node

var jwt     = require('jsonwebtoken'),
    argv    = require('yargs')
    .usage('Usage: $0 -r [string] -s [string] -i [string] -e [num]')
    .alias('r', 'room')
    .alias('s', 'appSecret')
    .alias('i', 'appID')
    .alias('e', 'expires')
    .demand(['r'])
    .argv;

var appID = argv.i || 'example_app_id';
var appSecret = argv.s || 'example_app_secret';
var room = argv.r.toLowerCase();
var expire = argv.e || 5;


var claims = {
    iss: appID,
    room: room,
    exp: Date.now() + 5 * 60000
};

console.log(jwt.sign(claims, appSecret));
process.exit(0);

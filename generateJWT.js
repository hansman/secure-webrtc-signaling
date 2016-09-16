#!/usr/bin/env node

var jwt     = require('jsonwebtoken'),
    fs      = require('fs'),
    argv    = require('yargs')
    .usage('Usage: $0 -r [string] -s [string] -i [string] -e [num]')
    .alias('r', 'room')
    .alias('s', 'appSecret')
    .alias('i', 'appID')
    .alias('e', 'expires')
    .demand(['r'])
    .argv;

var appID = argv.i || 'rtc-signaling-dev';
var appSecret = argv.s || 'example_app_secret';
var room = argv.r.toLowerCase();
var expire = argv.e || 5;

var claims = {
    iss: appID,
    room: room,
    exp: Date.now() + 24 * 60 * 365 * 60000 * 5
};
var cert = fs.readFileSync('rtc.pkcs8');
console.log(jwt.sign(claims,  cert, { algorithm: 'RS512'}));
process.exit(0);

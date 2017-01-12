#!/usr/bin/env node

var jwt     = require('jsonwebtoken'),
    fs      = require('fs'),
    argv    = require('yargs')
    .usage('Usage: $0 -r [string] -s [string] -v [string] -u [string] -i [string] -e [num] -p [num]')
    .alias('r', 'room')
    .alias('s', 'appSecret')
    .alias('i', 'appID')
    .alias('e', 'expires')
    .alias('v', 'private')
    .alias('u', 'public')
    .demand(['r', 'u', 'v'])
    .argv;

var appID = argv.i || 'rtc-signaling-uat';
var podID = argv.p || 1;
var appSecret = argv.s || 'example_app_secret';
var room = argv.r.toLowerCase();
var expire = argv.e || 5;

var claims = {
    iss: appID,
    podId: podID,
    streamId: 'exampleStreamId',
    userId: 71811853189570,
    room: room,
    exp: Date.now() + 24 * 60 * 365 * 60000 * 5,
    wildcard: true
};

const token = jwt.sign(claims,  fs.readFileSync(argv.v), { algorithm: 'RS512'});

console.log('token', token);

jwt.verify(token, fs.readFileSync(argv.u), {}, function(err, payload) {
    if (err) {
        console.warn('invalid', err);
        process.exit(1);
    }
    console.info('valid', payload);
    process.exit(0);
});

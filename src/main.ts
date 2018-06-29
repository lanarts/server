declare var __dirname;

var tungus = require('tungus');
var {find, values, remove} = require('lodash');
var mongoose = require('mongoose')
var Schema = mongoose.Schema;

console.log('Starting Lanarts server version 0');
console.log('Running mongoose version %s', mongoose.version);

startServer();

// Where
function startServer() {
    let port   = 3000;
    //let ipaddr = "10.0.0.145";
    let app = require('express')();
    let server = require('http').Server(app);

    app.set('port', port);
    //app.set('ipaddr', iaddr);
    //io.set('origins', 'http://ludamad.github.io');
    app.get('/', (req, res) => {
      res.sendFile(__dirname + '/index.html');
    });
    server.listen(port, () => {
      console.log('listening on *:' + port);
    });
}

function newGame(creator) {
    return {creator, players: [], gameState: null, gameStateHistory: [], observers: []};
}

function stripPlayer({name, deck}) {
    return {name, deck};
}

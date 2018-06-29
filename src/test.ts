declare var require, process;
let playerInfo = {gameName: process.argv[3], userName: process.argv[2], deck: process.argv[4], observer: false};

// connectToServer(onConnect, onGameInfo);

// // Where:
// function onGameInfo(socket, {error, gameInfo}) {
//     if (error) {
//         console.log(error);
//     } else if (gameInfo) {
//         let {creator, players, gameState} = gameInfo;
//         console.log('got game info:');
//         console.log('  creator', creator);
//         console.log('  players', players);
//         console.log('  gameState', gameState);
//         if (!gameState && players.length >= 2) {
//             socket.emit('putGameState', {gameState: {deck1: players[0].deck, deck2: players[1].deck}});
//         }
//     } else throw new Error();
// }

// function onConnect(socket) {
//     console.log('whatup');
//     socket.emit('playerInfo', playerInfo);
// }

// function connectToServer(onConnect, onGameInfo) {
//     var socket = require('socket.io-client')('http://localhost:3000');
//     socket.on('connect', () => onConnect(socket));
//     socket.on('gameInfo', (data) => onGameInfo(socket, data));
//     return socket;
// }



const tungus = require('tungus');
const {find, values, remove} = require('lodash');
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const modelSchemas = {
    gameAccount: {
        name: String,
    },
    // gameRun
};

export const models = {};
for (let key of Object.keys(modelSchemas)) {
    models[key] = mongoose.model(key, modelSchemas[key]);
}

const consoleSchema = Schema({
	name: String,
    manufacturer: String,
    released: Date
})

const console = mongoose.model('Console', consoleSchema);

/**
 * Game schema
 */

const gameSchema = Schema({
	name: String, developer: String, released: Date,
    consoles: [{ type: Schema.Types.ObjectId, ref: 'Console' }]
})
const Game = mongoose.model('Game', gameSchema);
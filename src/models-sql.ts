import * as sequelize from 'sequelize';
const {STRING, DATA, INTEGER} = sequelize;
const UUID = {type: sequelize.UUID, defaultValue: sequelize.UUIDV4, primaryKey: true};
const NAME_UNIQ = {type: sequelize.STRING, unique: true};
const NAME = STRING;

const DB = new sequelize('', '', '', {
    host: 'sqlite://:memory:',
    dialect: 'sqlite',
    // SQLite only
    storage: 'testdb.sqlite',
});

function hasMany(a, b) {
    a.hasMany(b);
    b.belongsTo(a);
}

function manyToMany(a, b) {
    const manyName = a.name.toString() + b.name.toString();
    a.belongsToMany(b, {through: manyName});
    b.belongsToMany(a, {through: manyName});
}

const {Account, GameRecord, Character, GameEvent} = createModels({
    Account: {
        name: NAME_UNIQ,
        data: sequelize.JSON
    },
    GameRecord: {
        // Empty if game not in progress
        inProgress: sequelize.BOOLEAN,
        saveData: sequelize.BLOB,
        data: sequelize.JSON,
        indexes: [{fields: ['createdAt', 'inProgress']}]
    },
    Character: {
        name: NAME,
        isRetired: sequelize.BOOLEAN,
        data: sequelize.JSON,
        indexes: [{fields: ['name']}, {fields: ['isRetired']}],
    },
    // Example: 
    // - Eg 'Gallanthor killed Gragh on Very Fast in 45000 frames.'
    // - Eg "Gallanthor has won 1000 games on Very Fast"
    GameEvent: {
        type: STRING, // 'GameWin', 'GameLose', 'GameQuit', 'LoseLife'
        mode: STRING, // Eg VeryFastArena, SlowMainGame
        frame: INTEGER,
        data: sequelize.JSON,
        indexes: [{fields: ['type']}, {fields: ['mode']}, {fields: ['frame']}]
    }
});

manyToMany(Account, Character);
manyToMany(Character, GameRecord);
hasMany(Character, GameEvent);
hasMany(GameRecord, GameEvent);

main();

// Where
async function main() {
    await DB.sync();

    const gallanthor = await Account.create({
        name: 'Gallanthor',
        data: {
            hasStarBesideName: true
        }
    });
    console.log(gallanthor.toJSON());
}

function createModels(schemas) {
    const models: any = {};
    for (let key of Object.keys(schemas)) {
        schemas[key].id = UUID;
        const indexes = schemas[key].indexes;
        delete schemas[key].indexes;
        models[key] = DB.define(key.toLowerCase(), schemas[key], indexes);
    }
    return models
}
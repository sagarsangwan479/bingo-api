const db = require('../config/db');

let Game = () => {};

Game.hostGame = (postData) => {
    return new Promise((resolve, reject) => {

        const insertData = {
            name: postData.name,
            game_code: postData.gameCode,
            players: postData.noOfPlayers,
            is_open: 1
        }

        const queryString = 'INSERT INTO SET ?'
        db.query(queryString, insertData, (err, res) => {
            if(err){
                return reject(err);
            } else {
                resolve(res);
            }
        })
    });
}

Game.findGameToJoin = (postData) => {
    return new Promise((resolve, reject) => {
        const queryString = 'SELECT * FROM game_list WHERE game_code = ? AND is_open = ?';
        const filter = [postData.gameCode, 1];

        db.query(queryString, filter, (err,res) => {
            if(err){
                return reject(err);
            } else {
                resolve(res.length ? res[0] : false);
            }
        })
    });
}

Game.findSlots = (postData) => {
    return new Promise((resolve, reject) => {
        const queryString = 'SELECT COUNT(id) as totalCount FROM joined_games_list WHERE game_code = ?'
        const filter = [postData.gameCode];

        db.query(queryString, filter, (err, res) => {
            if(err){
                return reject(err);
            } else {
                resolve(res[0].totalCount);
            }
        })
    });
}

Game.joinGame = (postData) => {
    return new Promise((resolve, reject) => {
        const insertData = {
            game_code: postData.gameCode,
            token: postData.token,
            name: postData.name
        }

        const queryString = 'INSERT INTO joined_games_list SET ?';

        db.query(queryString, insertData, (err, res) => {
            if(err){
                return reject(err)
            } else {
                resolve(res.insertId ? true : false)
            }
        })
    });
}

Game.startGame = (postData) => {
    return new Promise((resolve, reject) => {
        const queryString = `CREATE TABLE game_{re}`
    })
}

module.exports = Game;
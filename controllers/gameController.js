const Game = require('../models/gameModel');

exports.hostGame = async (req, res) => {
    try {
        const host = await Game.hostGame(req.body);

        if(host.insertId){
            res.json({
                status: 'success',
                message: 'New Game Created'
            })
        } else {
            res.status(400).json({
                status: 'failed',
                message: 'Something went wrong!'
            })
        }
    } catch(err){

        res.status(400).json({
            status: 'error',
            message: 'Something went wrong!'
        })
    }
}

exports.joinGame = async (req, res) => {
    try {

        const findGame = await Game.findGameToJoin(req.body);

        if(!findGame){
            res.status(400).json({
                status: 'failed',
                message: 'Game Not Found'
            });
            return;
        }

        const allottedSlots = await Game.findSlots(req.body);

        if(allottedSlots == findGame.players){
            res.status(400).json({
                status: 'failed',
                message: 'No Slots Available'
            });
            return;
        }

        const join = await Game.joinGame(req.body);

        if(join){
            res.json({
                status: 'success',
                message: 'Game Joined'
            })
        } else {
            res.status(400).json({
                status: 'failed',
                message: 'Something went wrong!'
            })
        }
    } catch(err){

        res.status(400).json({
            status: 'error',
            message: 'Something went wrong!'
        })
    }
}

exports.startGame = (req, res) => {
    
}
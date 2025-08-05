const Game = require('../models/gameModel');
const jwt = require('jsonwebtoken');
const HostedGames = require('../models/HostedGames');
const JoinedUsers = require('../models/joinedUsers');

exports.hostGame = async (req, res) => {
    try {
        const find = await HostedGames.findOne({ game_code: req.body.gameCode });
        if(find){
            return res.json({
                status: 'exists',
                message: 'Game code already exists'
            })
        }

        const token = jwt.sign({ foo: 'bar' }, 'nn77901881100', { algorithm: 'HS256' });

        const newGame = new HostedGames({
            hosted_by_name: req.body.name,
            hosted_by_token: token,
            game_code: req.body.gameCode,
            no_of_players: req.body.noOfPlayers,
            ended: false
        })

        const save = await newGame.save();
        
        const newUserJoin = new JoinedUsers({
            name: req.body.name,
            game_code: req.body.gameCode,
            token: token
        })

        const saveNewUser = await newUserJoin.save();

        res.status(200).json({
            status: 'success',
            message: 'Game Created',
            token: token
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({
            message: 'Something went wrong!'
        })
    }
}

exports.joinGame = async (req, res) => {
    try {
        const findGame = await HostedGames.findOne({ game_code: req.body.gameCode, ended: false });
        if(!findGame){
            return res.json({
                status: 'error',
                message: 'Invalid game code/game closed'
            })
        }

        const findSlotsFilled = await JoinedUsers.find({ game_code: req.body.gameCode });
        if(findGame.no_of_players === findSlotsFilled.length){
            return res.json({
                status: 'error',
                message: 'Slots filled'
            })
        }

        const token = jwt.sign({ foo: 'bar' }, 'nn77901881100', { algorithm: 'HS256' });

        const join = new JoinedUsers({
            name: req.body.name,
            game_code: req.body.gameCode,
            token: token
        })

        await join.save();

        res.status(200).json({
            status: 'success',
            message: 'Game Joined',
            token: token
        })

    } catch (error) {
        console.error(error)
        res.status(400).json({
            message: 'Something went wrong!'
        })
    }
}

exports.saveBoardData = async (req, res) => {
    try {

        if(!req.headers.authorization){
            throw new Error('invalid token');
        }

        const data = {
            dataArr: req.body.dataArr,
            bingoCombinations: req.body.bingoCombinations,
            bingoCounter: req.body.bingoCounter,
            areItemsChosen: req.body.areItemsChosen,
            chosenNumbersArr: req.body.chosenNumbersArr
        }

        const save = await JoinedUsers.findOneAndUpdate({ token: req.headers.authorization, game_code: req.body.gameCode }, data);

        res.json({
            status: 'success'
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({
            message: 'Something went wrong!'
        })
    }
}

exports.exitGame = async (req, res) => {
    try {
        if(!req.headers.authorization){
            throw new Error('invalid token');
        }

        const data = {
            ended: true
        }

        const update = await HostedGames.findOneAndUpdate({ hosted_by_token: req.headers.authorization, game_code: req.body.gameCode }, data);

        res.json({
            status: 'success'
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({
            message: 'Something went wrong!'
        })
    }
}

exports.startGame = (req, res) => {
    
}
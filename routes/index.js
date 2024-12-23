const express = require('express');
const router = express.Router();

const { hostGame, joinGame, startGame } = require('../controllers/gameController');
const { oneOf, body } = require('express-validator');
const { bodyValidator } = require('../config/middlewares');

router.post('/host_game', oneOf([
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('gameCode').notEmpty().withMessage('Game Code is required'),
        body('noOfPlayers').notEmpty().withMessage('No. of Players required')
    ]
]), bodyValidator, hostGame);

router.post('join_game', oneOf([
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('gameCode').notEmpty().withMessage('Game Code is required'),
        body('noOfPlayers').notEmpty().withMessage('No. of Players required')
    ]
]), bodyValidator, joinGame);

router.post('start_game', oneOf([
    [
        body('game_code').notEmpty().withMessage('Game Code Required')
    ]
]), bodyValidator, startGame);

module.exports = router;
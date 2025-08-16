const express = require('express');
const router = express.Router();

const { hostGame, joinGame, startGame, saveBoardData, exitGame, getOngoingGameData } = require('../controllers/gameController');
const { oneOf, body } = require('express-validator');
const { bodyValidator } = require('../config/middlewares');

router.post('/host_game', oneOf([
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('gameCode').notEmpty().withMessage('Game Code is required'),
        body('noOfPlayers').notEmpty().withMessage('No. of Players required')
    ]
]), bodyValidator, hostGame);

router.post('/join_game', oneOf([
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('gameCode').notEmpty().withMessage('Game Code is required')
    ]
]), bodyValidator, joinGame);

router.post('/save_board_data', oneOf([
    [
        body('dataArr').notEmpty().withMessage('required'),
        body('bingoCombinations').notEmpty().withMessage('required'),
        body('chosenNumbersArr').notEmpty().withMessage('required'),
        body('bingoCounter').notEmpty().withMessage('required'),
        body('areItemsChosen').notEmpty().withMessage('required'),
        body('gameCode').notEmpty().withMessage('required')
    ]
]), bodyValidator, saveBoardData);

router.post('/exit_game', oneOf([
    [
        body('gameCode').notEmpty().withMessage('required')
    ]
]), bodyValidator, exitGame);

router.post('start_game', oneOf([
    [
        body('game_code').notEmpty().withMessage('Game Code Required')
    ]
]), bodyValidator, startGame);

router.post('/get_ongoing_game_data', oneOf([
    [
        body('gameCode').notEmpty().withMessage('required')
    ]
]), bodyValidator, getOngoingGameData);

module.exports = router;
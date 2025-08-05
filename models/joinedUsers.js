const mongoose = require('mongoose');

const JoinedUsersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50
    },
    game_code: {
        type: String,
        required: true,
        maxlength: 10
    },
    token: {
        type: String,
        required: true
    },
    dataArr: {
        type: String
    },
    bingoCombinations: {
        type: String
    },
    chosenNumbersArr: {
        type: String
    },
    areItemsChosen: {
        type: Number
    },
    bingoCounter: {
        type: Number
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('joined_users', JoinedUsersSchema);
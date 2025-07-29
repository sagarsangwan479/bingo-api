const mongoose = require('mongoose');

const HostedGamesSchema = new mongoose.Schema({
    hosted_by_name: {
        type: String,
        required: true,
        maxlength: 50
    },
    hosted_by_token: {
        type: String,
        required: true
    },
    game_code: {
        type: String,
        required: true,
        maxlength: 10
    },
    no_of_players: {
        type: Number,
        required: true,
        min: 0,
        max: 255 // to match TINYINT UNSIGNED
    },
    ended: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('hosted_games', HostedGamesSchema);
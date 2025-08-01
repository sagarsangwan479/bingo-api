

module.exports = {
    bodyValidator: (req, res, next) => {
        const { validationResult } = require("express-validator");

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).send({ status: 'invalid', message: 'Invalid Inputs' });
        } else {
            next();
        }
        
    }
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = exports.rules = void 0;
var express_validator_1 = require("express-validator");
exports.rules = [
    express_validator_1.body('email').isEmail().isLength({ min: 10, max: 50 }),
    express_validator_1.body(['title', 'description']).isString().isLength({ min: 10, max: 50 }),
    express_validator_1.body('thumb').isString().notEmpty(),
    express_validator_1.body('content').isString().isLength({ min: 10 })
];
exports.validator = function (request, response, next) {
    var errors = express_validator_1.validationResult(request);
    if (!errors.isEmpty())
        return response.status(400).json({ error: errors.array() });
    next();
};

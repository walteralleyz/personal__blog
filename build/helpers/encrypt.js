"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encrypt = exports.JWTDecode = exports.JWTEncoded = void 0;
var crypto_1 = require("crypto");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = require("dotenv");
dotenv_1.config();
var defineHmac = function () { return crypto_1.createHmac('sha256', process.env.KEY_SECRET || 'teste'); };
var hmac = defineHmac();
exports.JWTEncoded = function (obj) { return jsonwebtoken_1.default.sign(obj, process.env.KEY_SECRET || 'teste', { expiresIn: 9999 }); };
exports.JWTDecode = function (rq, rp, next) {
    if (rq.headers['access-control-allow-headers']
        && rq.headers['access-control-allow-headers'].indexOf('Bearer') !== -1) {
        var token = rq.headers['access-control-allow-headers'].split(' ')[1];
        var decoded = jsonwebtoken_1.default.verify(token, process.env.KEY_SECRET || 'teste');
        if (Object.keys(decoded).indexOf('email') !== -1)
            return next();
    }
    rp.status(403).json({ error: 'Sem permissão!' });
};
exports.encrypt = function (text) {
    hmac.update(text);
    var secret = hmac.digest('hex');
    hmac = defineHmac();
    return secret;
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorRouter = void 0;
var express_1 = require("express");
var author_1 = __importDefault(require("../controller/author"));
var instance = function () { return new author_1.default(); };
exports.authorRouter = [
    express_1.Router().post('/signin', instance().signin),
    express_1.Router().post('/signup', instance().signup)
];

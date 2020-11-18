"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRouter = void 0;
var express_1 = require("express");
var blog_1 = __importDefault(require("../controller/blog"));
var encrypt_1 = require("../helpers/encrypt");
var post_validator_1 = require("../helpers/post_validator");
var instance = function () { return new blog_1.default(); };
exports.blogRouter = [
    express_1.Router().get('/new', instance().renderNewPage),
    express_1.Router().get('/:article', instance().readByTitle),
    express_1.Router().get('/', instance().read),
    express_1.Router().put('/:id', encrypt_1.JWTDecode, post_validator_1.rules, post_validator_1.validator, instance().update),
    express_1.Router().delete('/:id', encrypt_1.JWTDecode, instance().delete),
    express_1.Router().post('/', encrypt_1.JWTDecode, post_validator_1.rules, post_validator_1.validator, instance().create)
];

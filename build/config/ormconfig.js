"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var dotenv_1 = require("dotenv");
var blog_1 = __importDefault(require("../model/blog"));
var author_1 = __importDefault(require("../model/author"));
dotenv_1.config();
var options = {
    type: 'postgres',
    url: process.env.DATABASE_URL || 'teste',
    ssl: {
        rejectUnauthorized: false
    },
    entities: [
        blog_1.default,
        author_1.default
    ],
    synchronize: false,
    migrations: ['build/migration/*.js'],
    migrationsRun: false,
    cli: {
        migrationsDir: 'build/migration'
    }
};
module.exports = options;

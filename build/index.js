"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var path_1 = __importDefault(require("path"));
var typeorm_1 = require("typeorm");
var morgan_1 = __importDefault(require("morgan"));
var blog_1 = require("./routes/blog");
var author_1 = require("./routes/author");
var ormconfig_1 = __importDefault(require("./config/ormconfig"));
var app = express_1.default();
var port = process.env.PORT || 8080;
typeorm_1.createConnection(ormconfig_1.default)
    .then(function (res) { return console.log('Connected to database!'); })
    .catch(function (err) { return console.log(err); });
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(morgan_1.default('dev'));
app.use(express_1.default.static('public'));
app.set('views', path_1.default.join(__dirname, '/../public'));
app.set('view engine', 'ejs');
app.use('/blog', blog_1.blogRouter);
app.use('/author', author_1.authorRouter);
app.get('/', function (request, response) {
    response.redirect('/blog');
    response.end();
});
app.get('/login', function (request, response) { return response.sendFile(path_1.default.join(__dirname + '/../public/login.html')); });
app.use('*', function (request, response) {
    response.send('<h1>404!</h1><br /><p>Página não encontrada!</p>');
});
app.listen(port, function () { return console.log('Ouvindo na porta %d', port); });

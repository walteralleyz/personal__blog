"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var markdown_it_1 = __importDefault(require("markdown-it"));
var blog_1 = __importDefault(require("../model/blog"));
var author_1 = __importDefault(require("../model/author"));
var BlogController = /** @class */ (function () {
    function BlogController() {
    }
    BlogController.prototype.create = function (request, response) {
        var _a = request.body, title = _a.title, description = _a.description, thumb = _a.thumb, content = _a.content, email = _a.email;
        var repository = typeorm_1.getRepository(blog_1.default);
        var authorRepository = typeorm_1.getRepository(author_1.default);
        authorRepository.findOne({ email: email })
            .then(function (data) {
            if (data) {
                var post = new blog_1.default();
                post.title = title;
                post.description = description;
                post.thumb = thumb;
                post.content = content;
                post.created_at = new Date().toUTCString();
                post.updated_at = new Date().toUTCString();
                post.author = data;
                repository.save(post);
            }
        });
        response.status(200).json({ message: 'success' });
    };
    BlogController.prototype.read = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var repository, posts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        repository = typeorm_1.getRepository(blog_1.default);
                        return [4 /*yield*/, repository.find({})];
                    case 1:
                        posts = _a.sent();
                        posts = posts.sort(function (a, b) { return b.id - a.id; });
                        response.render('post_list', { posts: posts });
                        return [2 /*return*/];
                }
            });
        });
    };
    BlogController.prototype.renderNewPage = function (request, response) {
        response.render('post_new');
    };
    BlogController.prototype.readByTitle = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var article, repository, md, post;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        article = request.params.article;
                        repository = typeorm_1.getRepository(blog_1.default);
                        md = markdown_it_1.default();
                        return [4 /*yield*/, repository.findOne({ title: article })];
                    case 1:
                        post = _a.sent();
                        if (post) {
                            response.render('post', {
                                post: md.render(post.content),
                                title: post.title,
                                description: post.description,
                                image: post.thumb,
                                pub: post.created_at,
                                id: post.id
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    BlogController.prototype.update = function (request, response) {
        var id = request.params.id;
        var _a = request.body, title = _a.title, description = _a.description, thumb = _a.thumb, content = _a.content;
        var repository = typeorm_1.getRepository(blog_1.default);
        repository.findOne(id)
            .then(function (data) {
            if (data === null || data === void 0 ? void 0 : data.title) {
                data.title = title;
                data.description = description;
                data.thumb = thumb;
                data.content = content;
                data.updated_at = new Date().toUTCString();
                repository.save(data);
            }
        });
        response.status(200).json({ message: 'success' });
    };
    BlogController.prototype.delete = function (request, response) {
        var id = request.params.id;
        var repository = typeorm_1.getRepository(blog_1.default);
        repository.delete(id);
        response.status(200).json({ message: 'success' });
    };
    return BlogController;
}());
exports.default = BlogController;

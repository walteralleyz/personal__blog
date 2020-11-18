"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var author_1 = __importDefault(require("./author"));
var BlogPost = /** @class */ (function () {
    function BlogPost() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], BlogPost.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar', length: 100 }),
        __metadata("design:type", String)
    ], BlogPost.prototype, "title", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar', length: 100 }),
        __metadata("design:type", String)
    ], BlogPost.prototype, "description", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BlogPost.prototype, "thumb", void 0);
    __decorate([
        typeorm_1.Column({ type: 'text' }),
        __metadata("design:type", String)
    ], BlogPost.prototype, "content", void 0);
    __decorate([
        typeorm_1.Column({ type: 'timestamp' }),
        __metadata("design:type", String)
    ], BlogPost.prototype, "created_at", void 0);
    __decorate([
        typeorm_1.Column({ type: 'timestamp' }),
        __metadata("design:type", String)
    ], BlogPost.prototype, "updated_at", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return author_1.default; }, function (author) { return author.blogPosts; }),
        __metadata("design:type", author_1.default)
    ], BlogPost.prototype, "author", void 0);
    BlogPost = __decorate([
        typeorm_1.Entity()
    ], BlogPost);
    return BlogPost;
}());
exports.default = BlogPost;
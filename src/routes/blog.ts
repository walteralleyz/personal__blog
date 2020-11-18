import { Router } from 'express';
import BlogController from '../controller/blog';
import { JWTDecode } from '../helpers/encrypt';
import { rules, validator } from '../helpers/post_validator';

const instance = () => new BlogController();

export const blogRouter = [
    Router().get('/new', instance().renderNewPage),
    Router().get('/:article', instance().readByTitle),
    Router().get('/', instance().read),
    Router().put('/:id', JWTDecode, rules, validator, instance().update),
    Router().delete('/:id', JWTDecode, instance().delete),
    Router().post('/', JWTDecode, rules, validator, instance().create)
];
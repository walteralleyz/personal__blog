import { Router } from 'express';
import BlogController from '../controller/blog';

const instance = () => new BlogController();

export const blogRouter = [
    Router().get('/:article', instance().readByTitle),
    Router().get('/', instance().read),
    Router().put('/:id', instance().update),
    Router().delete('/:id', instance().delete),
    Router().post('/', instance().create)
];
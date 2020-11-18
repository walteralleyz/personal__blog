import { Router } from 'express';
import AuthorController from '../controller/author';

const instance = () => new AuthorController();

export const authorRouter = [
    Router().post('/signin', instance().signin),
    Router().post('/signup', instance().signup)
]
import { Router } from 'express';
import CommentsController from '../controller/Comments';

const instance = () => new CommentsController();

export const commentsRouter = [
    Router().post('/', instance().create)
];
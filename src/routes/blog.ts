import { Request, Response, Router } from 'express';
import matter from 'gray-matter';
import markdown from 'markdown-it';
import fs from 'fs';

export const blogRouter = [
    Router().get('/blog/:article', (request: Request, response: Response) => {
        const file = matter.read(__dirname + '/../blog/' + request.params.article + '.md');
        const md = markdown();
        const content = file.content;
        const result = md.render(content);

        response.render('index', {
            post: result,
            title: file.data.title,
            description: file.data.description,
            image: file.data.image
        });
    }),

    Router().get('/blog', (request: Request, response: Response) => {
        const posts = fs.readdirSync(__dirname + '/../blog').filter(file => file.endsWith('.md'));

        response.render('blog', {
            posts: posts
        });
    })
];
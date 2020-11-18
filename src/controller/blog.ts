import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import markdown from 'markdown-it';

import BlogPost from '../model/blog';

export default class BlogController {
    create(request: Request, response: Response) {
        const { title, description, thumb, content } = request.body;
        const repository = getRepository(BlogPost);

        const post = new BlogPost();

        post.title = title;
        post.description = description;
        post.thumb = thumb;
        post.content = content;
        post.created_at = new Date().toUTCString();
        post.updated_at = new Date().toUTCString();

        repository.save(post);

        response.status(200).json({ message: 'success' });
    }

    async read(request: Request, response: Response) {
        const repository = getRepository(BlogPost);
        const posts = await repository.find({});

        response.render('post_list', { posts });
    }

    async readByTitle(request: Request, response: Response) {
        const { article } = request.params;
        const repository = getRepository(BlogPost);
        const md = markdown();

        const post = await repository.findOne({ title: article });
        
        if(post) {
            response.render('post', {
                post: md.render(post.content),
                title: post.title,
                description: post.description,
                image: post.thumb
            });
        }
    }

    update(request: Request, response: Response) {
        const { id } = request.params;
        const { title, description, thumb, content } = request.body;
        const repository = getRepository(BlogPost);

        repository.findOne(id)
        .then(data => {
            if(data?.title) {
                data.title = title;
                data.description = description;
                data.thumb = thumb;
                data.content = content;
                data.updated_at = new Date().toUTCString();

                repository.save(data);
            }
        });

        response.status(200).json({ message: 'success' });
    }

    delete(request: Request, response: Response) {
        const { id } = request.params;
        const repository = getRepository(BlogPost);

        repository.delete(id);

        response.status(200).json({ message: 'success' });
    }
}
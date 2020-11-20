import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Comments from '../model/comments';
import BlogPost from '../model/blog';

export default class CommentsController {
    create(request: Request, response: Response) {
        const { text, blogPostId } = request.body;
        const commentsRepository = getRepository(Comments);
        const blogPostRepository = getRepository(BlogPost);

        blogPostRepository.findOne(blogPostId)
        .then(data => {
            if(data) {
                const comment = new Comments();
                comment.text = text;
                comment.blogPost = data;

                commentsRepository.save(comment);
            }
        });

        response.status(200).json({ message: 'success' });
    }
}
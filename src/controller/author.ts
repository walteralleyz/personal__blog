import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Author from '../model/author';
import { encrypt, JWTEncoded } from '../helpers/encrypt';


export default class AuthorController {
    async signup(request: Request, response: Response) {
        const { name, email, password } = request.body;
        const repository = getRepository(Author);

        const author = new Author();

        author.name = name;
        author.email = email;
        author.password = password;

        const save = await repository.save(author);

        if(save) return response.status(200).json(save);
        return response.status(400).json({ error: 'Erro no DB' });
    }

    signin(request: Request, response: Response) {
        const { email, password } = request.body;
        const repository = getRepository(Author);

        const token = JWTEncoded({ email });

        repository.findOne({ email })
        .then(data => {
            if(data?.email && data.password === encrypt(password))
                return response.status(200).json({ email: data.email, token });

            response.status(403).json({ error: 'Sem acesso!' })
        })
        .catch(err => response.status(400).json({ error: 'Sem sucesso' }));
    }
}
import 'reflect-metadata';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { createConnection } from 'typeorm';
import morgan from 'morgan';

import { blogRouter } from './routes/blog';
import { authorRouter } from './routes/author';
import options from './config/ormconfig';

const app = express();
const port = process.env.PORT || 8080;

createConnection(options)
.then((res: any) => console.log('Connected to database!'))
.catch((err: Error) => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static('public'));

app.set('views', path.join(__dirname, '/../public'));
app.set('view engine', 'ejs');

app.use('/blog', blogRouter);
app.use('/author', authorRouter);

app.get('/', (request: Request, response: Response) => {
    response.redirect('/blog');
    response.end();
})

app.get('/login', (request: Request, response: Response) => response.sendFile(path.join(__dirname + '/../public/login.html')));

app.listen(port, () => console.log('Ouvindo na porta %d', port));
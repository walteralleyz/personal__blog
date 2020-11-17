import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { createConnection } from 'typeorm';

import { blogRouter } from './routes/blog';
import options from './config/ormconfig';

const app = express();
const port = process.env.PORT || 8080;

createConnection(options)
.then((res: any) => console.log('Connected to database!'))
.catch((err: Error) => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'blog'));
app.set('view engine', 'ejs');

app.use('/', blogRouter);

app.listen(port, () => console.log('Ouvindo na porta %d', port));
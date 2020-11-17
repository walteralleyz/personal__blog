import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { blogRouter } from './routes/blog';

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'blog'));
app.set('view engine', 'ejs');

app.use('/', blogRouter);

app.listen(port, () => console.log('Ouvindo na porta %d', port));
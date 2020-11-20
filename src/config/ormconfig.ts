import { config } from 'dotenv';
import { ConnectionOptions } from 'typeorm';

import BlogPost from '../model/blog';
import Author from '../model/author';
import Comments from '../model/comments';

config();

const options: ConnectionOptions = {
    type: 'postgres',
    url: process.env.DATABASE_URL || 'teste',
    ssl: {
        rejectUnauthorized: false
    },
    entities: [
        BlogPost,
        Author,
        Comments
    ],
    synchronize: false,
    migrations: ['build/migration/*.js'],
    migrationsRun: false,
    cli: {
        migrationsDir: 'src/migration'
    }
};

export = options;
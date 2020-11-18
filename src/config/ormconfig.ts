import { config } from 'dotenv';
import BlogPost from '../model/blog';
import Author from '../model/author';
import { ConnectionOptions } from 'typeorm';

config();

const options: ConnectionOptions = {
    type: 'postgres',
    url: process.env.DATABASE_URL || 'teste',
    ssl: {
        rejectUnauthorized: false
    },
    entities: [
        BlogPost,
        Author
    ],
    synchronize: false,
    migrations: ['src/migration/*.ts'],
    cli: {
        migrationsDir: 'src/migration'
    }
};

export = options;
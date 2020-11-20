import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    OneToMany,
    BeforeInsert
} from 'typeorm';

import { encrypt } from '../helpers/encrypt';

import BlogPost from './blog';

@Entity()
@Unique(['email'])
export default class Author {
    @BeforeInsert()
    encryptPassword() {
        this.password = encrypt(this.password);
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50 })
    name: string;

    @Column({ type: 'varchar', length: 50 })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => BlogPost, blogPost => blogPost.author)
    blogPosts: BlogPost[];
}
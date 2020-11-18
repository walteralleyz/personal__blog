import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne
} from 'typeorm';

import Author from './author';

@Entity()
export default class BlogPost {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    title: string;

    @Column({ type: 'varchar', length: 100 })
    description: string;

    @Column()
    thumb: string;

    @Column({ type: 'text' })
    content: string;

    @Column({ type: 'timestamp' })
    created_at: string;

    @Column({ type: 'timestamp' })
    updated_at: string;

    @ManyToOne(() => Author, author => author.blogPosts)
    author: Author;
}
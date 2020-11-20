import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne
} from 'typeorm';

import BlogPost from './blog';

@Entity()
export default class Comments {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 500 })
    text: string;

    @ManyToOne(() => BlogPost, blogPost => blogPost.comments)
    blogPost: BlogPost;
}
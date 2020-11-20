import {MigrationInterface, QueryRunner} from "typeorm";

export class blogpost1605900006437 implements MigrationInterface {
    name = 'blogpost1605900006437'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "text" character varying(500) NOT NULL, "blogPostId" integer, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "blog_post" ADD "commentsId" integer`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_4c84435200f4c8d90b5f84d2aad" FOREIGN KEY ("blogPostId") REFERENCES "blog_post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blog_post" ADD CONSTRAINT "FK_d4fd51942743b20a12987736ea9" FOREIGN KEY ("commentsId") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog_post" DROP CONSTRAINT "FK_d4fd51942743b20a12987736ea9"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_4c84435200f4c8d90b5f84d2aad"`);
        await queryRunner.query(`ALTER TABLE "blog_post" DROP COLUMN "commentsId"`);
        await queryRunner.query(`DROP TABLE "comments"`);
    }

}

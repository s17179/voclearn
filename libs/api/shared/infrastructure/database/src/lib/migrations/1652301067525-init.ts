import {MigrationInterface, QueryRunner} from "typeorm";

export class init1652301067525 implements MigrationInterface {
    name = 'init1652301067525'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "word_groups" ("id" uuid NOT NULL, "name" character varying(255) NOT NULL, "userId" character varying NOT NULL, CONSTRAINT "PK_da382e77af600564e9d9ae3b916" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "words" ("id" uuid NOT NULL, "value" character varying(255) NOT NULL, "translation" character varying(255) NOT NULL, "userId" character varying NOT NULL, "wordGroupId" uuid NOT NULL, "associationId" uuid NOT NULL, CONSTRAINT "REL_02fe4bde7a44892b740732f4fb" UNIQUE ("associationId"), CONSTRAINT "PK_feaf97accb69a7f355fa6f58a3d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "associations" ("id" uuid NOT NULL, "note" character varying(255) NOT NULL, CONSTRAINT "PK_409f7d0389b44b03f8b0767ce0c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "learners" ("id" character varying NOT NULL, "currentSession" integer NOT NULL, "partitionSize" integer NOT NULL, CONSTRAINT "PK_3e7273fda51b35b9c8e4f096d91" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cards" ("id" character varying NOT NULL, "type" character varying NOT NULL, "sessionDeckNumbers" integer array, "retiredInSession" integer, "learnerId" character varying, CONSTRAINT "PK_5f3269634705fdff4a9935860fc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "partitions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cardId" character varying, "learnerId" character varying, CONSTRAINT "PK_8745dc8df900b149674b14b6f3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_2f5ef1ccb49c7d6df5490fdca2" ON "partitions" ("cardId", "learnerId") `);
        await queryRunner.query(`ALTER TABLE "words" ADD CONSTRAINT "FK_8ce6b2f70a7cf7d2de6dabef0c7" FOREIGN KEY ("wordGroupId") REFERENCES "word_groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "words" ADD CONSTRAINT "FK_02fe4bde7a44892b740732f4fbb" FOREIGN KEY ("associationId") REFERENCES "associations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cards" ADD CONSTRAINT "FK_f04c07e78c034dcb5af9089deb2" FOREIGN KEY ("learnerId") REFERENCES "learners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "partitions" ADD CONSTRAINT "FK_4e2161b47e15e7d3c48c8a15d47" FOREIGN KEY ("cardId") REFERENCES "cards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "partitions" ADD CONSTRAINT "FK_30753ba89983cca9edb44f89197" FOREIGN KEY ("learnerId") REFERENCES "learners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "partitions" DROP CONSTRAINT "FK_30753ba89983cca9edb44f89197"`);
        await queryRunner.query(`ALTER TABLE "partitions" DROP CONSTRAINT "FK_4e2161b47e15e7d3c48c8a15d47"`);
        await queryRunner.query(`ALTER TABLE "cards" DROP CONSTRAINT "FK_f04c07e78c034dcb5af9089deb2"`);
        await queryRunner.query(`ALTER TABLE "words" DROP CONSTRAINT "FK_02fe4bde7a44892b740732f4fbb"`);
        await queryRunner.query(`ALTER TABLE "words" DROP CONSTRAINT "FK_8ce6b2f70a7cf7d2de6dabef0c7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2f5ef1ccb49c7d6df5490fdca2"`);
        await queryRunner.query(`DROP TABLE "partitions"`);
        await queryRunner.query(`DROP TABLE "cards"`);
        await queryRunner.query(`DROP TABLE "learners"`);
        await queryRunner.query(`DROP TABLE "associations"`);
        await queryRunner.query(`DROP TABLE "words"`);
        await queryRunner.query(`DROP TABLE "word_groups"`);
    }

}

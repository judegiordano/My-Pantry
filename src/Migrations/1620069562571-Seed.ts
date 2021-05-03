import { MigrationInterface, QueryRunner } from "typeorm";

export class Seed1620069562571 implements MigrationInterface {
	name = 'Seed1620069562571'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TABLE "Users" ("id" SERIAL NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "tokenVersion" integer NOT NULL DEFAULT '0', "verified" bit NOT NULL DEFAULT '0', CONSTRAINT "UQ_3c3ab3f49a87e6ddb607f3c4945" UNIQUE ("email"), CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
		await queryRunner.query(`CREATE INDEX "IDX_3c3ab3f49a87e6ddb607f3c494" ON "Users" ("email") `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP INDEX "IDX_3c3ab3f49a87e6ddb607f3c494"`);
		await queryRunner.query(`DROP TABLE "Users"`);
	}
}

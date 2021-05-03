import { IsEmail, Length } from "class-validator";
import { BaseEntity, Index, Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";

@Entity("Users")
export class User extends BaseEntity {

	@PrimaryGeneratedColumn({ type: "int", name: "id" })
	id: number;

	@Index()
	@IsEmail()
	@Column("varchar", { name: "email", nullable: false, unique: true, length: 255 })
	email: string;

	@Length(6, 15)
	@Column("varchar", { name: "password", nullable: false, length: 255 })
	password: string;

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	@Column("int", { name: "tokenVersion", nullable: false, default: 0 })
	tokenVersion: number;

	@Column("bit", { name: "verified", nullable: false, default: 0 })
	verified: boolean;
}
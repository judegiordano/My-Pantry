import jwt from "jsonwebtoken";

import { User } from "../Models/User";
import { Config } from "./Config";

const { Options } = Config;

export interface IJwtPayload {
	id: number,
	tokenVersion: number,
	verified: boolean
}

export class Jwt {

	public static Sign(user: User): string {
		try {
			return jwt.sign({ id: user.id, tokenVersion: user.tokenVersion, verified: user.verified }, Options.JWT_SECRET, {
				expiresIn: "7d"
			});
		} catch (error) {
			throw Error(error);
		}
	}

	public static Verify(token: string): IJwtPayload {
		try {
			const data = jwt.verify(token, Options.JWT_SECRET) as IJwtPayload;
			return {
				id: data.id,
				tokenVersion: data.tokenVersion,
				verified: data.verified
			};
		} catch (error) {
			throw Error(error);
		}
	}
}
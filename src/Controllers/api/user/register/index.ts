import { validate } from "class-validator";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { Jwt } from "../../../../Helpers/Jwt";
import { User as IUser } from "../../../../Models/User";
import { ILogin, User } from "../../../../Repositories/UserRepository";

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.post("/", {
		schema: {
			tags: ["User"],
			body: {
				type: "object",
				properties: {
					email: { type: "string" },
					password: { type: "string" }
				}
			},
			response: {
				201: {
					type: "object",
					properties: {
						ok: { type: "boolean" },
						token: { type: "string" }
					}
				}
			}
		}
	}, async (request: FastifyRequest, response: FastifyReply) => {

		const { email, password } = request.body as ILogin;

		const newUser = new IUser();
		newUser.email = email;
		newUser.password = password;

		const errors = await validate(newUser);
		if (errors.length > 0) throw errors;

		const user = await User.Register({ email, password });

		response.statusCode = 201;
		return {
			ok: true,
			token: Jwt.Sign(user)
		};
	});
};
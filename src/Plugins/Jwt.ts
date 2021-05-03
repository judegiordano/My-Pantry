import plugin from "fastify-plugin";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { Jwt } from "../Helpers/Jwt";
import { User } from "../Repositories/UserRepository";

export default plugin(async (fastify: FastifyInstance): Promise<void> => {
	fastify.decorate("authentication", async (request: FastifyRequest, reply: FastifyReply) => {
		const { authorization } = request.headers;

		if (!authorization) {
			reply.statusCode = 401;
			throw new Error("missing authorization");
		}

		const token = authorization.split(" ")[1];
		if (!token) {
			reply.statusCode = 401;
			throw new Error("missing authorization");
		}

		const tokenUser = Jwt.Verify(token);
		const user = await User.FindOneById(tokenUser.id);

		if (tokenUser.tokenVersion !== user.tokenVersion) {
			throw "invalid token version";
		}

		request.jwt = tokenUser;
	});
});
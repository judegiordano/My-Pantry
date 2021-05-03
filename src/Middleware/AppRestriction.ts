import plugin from "fastify-plugin";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { Config } from "../Helpers/Config";
const { Options } = Config;

export default plugin(async (fastify: FastifyInstance): Promise<void> => {
	fastify.addHook("onRequest", async (request: FastifyRequest, reply: FastifyReply) => {
		const { appcode, apptoken } = request.headers;

		if (!appcode || !apptoken) {
			reply.statusCode = 401;
			throw new Error("missing authorization");
		}

		if (appcode != Options.APPCODE || apptoken != Options.APPTOKEN) {
			reply.statusCode = 401;
			throw new Error("unautorized");
		}
	});
});
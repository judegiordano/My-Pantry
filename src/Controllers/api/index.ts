import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.get("/", {
		schema: {
			tags: ["Dev"],
			response: {
				200: {
					type: "object",
					properties: {
						ok: { type: "boolean" },
						ping: { type: "string" }
					}
				}
			}
		}
	}, async (_: FastifyRequest, res: FastifyReply) => {
		res.statusCode = 200;
		return {
			ok: true,
			ping: "pong"
		};
	});
};
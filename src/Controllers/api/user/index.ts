import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.post("/validate", {
		preValidation: [fastify.authentication],
		schema: {
			tags: ["User"],
			response: {
				201: {
					type: "object",
					properties: {
						ok: { type: "boolean" },
						user: {
							type: "object",
							properties: {
								id: { type: "number" },
								tokenVersion: { type: "number" },
								verified: { type: "boolean" }
							}
						}
					}
				}
			}
		}
	}, async (request: FastifyRequest, response: FastifyReply) => {
		response.statusCode = 201;
		return {
			ok: true,
			user: request.jwt
		};
	});
};
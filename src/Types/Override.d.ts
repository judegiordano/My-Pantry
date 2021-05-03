/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyInstance, FastifyRequest } from "fastify";

import { IJwtPayload } from "src/Helpers/Jwt";

declare module "fastify" {
	export interface FastifyInstance {
		authentication(): void;
	}

	export interface FastifyRequest {
		jwt: IJwtPayload
	}
}

import path from "path";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import AutoLoad from "fastify-autoload";

import { Database } from "./Helpers/Database";

export default async (fastify: FastifyInstance, opts: FastifyPluginOptions): Promise<void> => {
	try {
		await Database.Connect();

		fastify.register(import("./Middleware/AppRestriction"));

		fastify.register(AutoLoad, {
			dir: path.join(__dirname, "Plugins"),
			options: Object.assign({}, opts)
		});

		fastify.register(AutoLoad, {
			dir: path.join(__dirname, "Controllers"),
			options: Object.assign({}, opts)
		});

	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};
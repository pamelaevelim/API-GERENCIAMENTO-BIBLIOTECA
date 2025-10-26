// src/server.js
import Fastify from 'fastify';
import { initializeRoutes } from './http/routes/index.js';

const server = Fastify();

server.register(initializeRoutes);

export { server };

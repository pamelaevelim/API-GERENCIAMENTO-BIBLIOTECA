// src/index.js
import 'dotenv/config';
import { server } from './app.js';
import cors from '@fastify/cors';
import { connectMongo } from './database/index.js';

async function startServer() {
  try {
    await connectMongo();
    console.log('Conexão com MongoDB estabelecida com sucesso');

    server.register(cors, {
      origin: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });

    await server.listen({
      host: '0.0.0.0',
      port: process.env.PORT || 3000,
    });

    console.log(`Servidor rodando na porta ${process.env.PORT || 3000}`);
  } catch (err) {
    console.error('Erro ao iniciar o servidor:', err.message);
    process.exit(1);
  }
}

startServer();

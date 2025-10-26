// src/scripts/resetCollections.js
import mongoose from 'mongoose';
import { connectMongo } from '../database/index.js';

import { Author } from '../models/Author.js';
import { User } from '../models/User.js';
import { Book } from '../models/Book.js';
import { Loan } from '../models/Loan.js';

const collections = [Author, User, Book, Loan];

async function clearDatabase() {
  await connectMongo();
  console.log('--- Iniciando limpeza das coleções ---');

  try {
    for (const Model of collections) {
      const name = Model.collection.collectionName;

      const deletedCount = await Model.deleteMany({});
      console.log(`Coleção '${name}' zerada. Documentos removidos: ${deletedCount.deletedCount || 0}`);
    }

    console.log('--- Todas as coleções foram limpas com sucesso ---');
  } catch (err) {
    console.error('Erro ao limpar coleções:', err.message);
    process.exit(1);
  }
}

clearDatabase();

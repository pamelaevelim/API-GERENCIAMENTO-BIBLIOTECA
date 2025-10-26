// src/models/Author.js
import mongoose from 'mongoose';

const schemaOptions = {
  collection: 'Authors',
  timestamps: true, // adiciona createdAt e updatedAt automaticamente
};

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    unique: true,
    trim: true,
  },
  birthDate: {
    type: Date,
    required: [true, 'Data de nascimento é obrigatória'],
  },
  sex: {
    type: String,
    required: [true, 'Sexo é obrigatório'],
    enum: ['Male', 'Female', 'Other'], // pode personalizar conforme necessidade
  },
  writingGenre: {
    type: String,
    required: [true, 'Gênero literário é obrigatório'],
    enum: ['Novel', 'Poetry', 'Fantasy', 'Fiction', 'Mystery', 'Suspense'],
  },
}, schemaOptions);

export const Author = mongoose.model('Author', authorSchema);

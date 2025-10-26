// src/models/Book.js
import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'O título do livro é obrigatório'],
    trim: true,
  },
  synopsis: {
    type: String,
    required: [true, 'A sinopse é obrigatória'],
  },
  year: {
    type: Number,
    required: [true, 'O ano de publicação é obrigatório'],
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: [true, 'O autor é obrigatório'],
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  expectedReturnDate: {
    type: Date,
    default: null,
  },
}, {
  collection: 'Books',
  timestamps: true, 
});

export const Book = mongoose.model('Book', bookSchema);

// src/models/Loan.js
import mongoose from 'mongoose';

const loanSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'ID do usuário é obrigatório'],
  },
  bookId: {
    type: String,
    required: [true, 'ID do livro é obrigatório'],
  },
  loanDate: {
    type: Date,
    required: [true, 'Data do empréstimo é obrigatória'],
  },
  returnDate: {
    type: Date,
    required: [true, 'Data de devolução é obrigatória'],
  },
}, {
  collection: 'Loans',
  timestamps: true, 
});

export const Loan = mongoose.model('Loan', loanSchema);

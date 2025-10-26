// src/models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'O nome do usuário é obrigatório'],
    unique: true,
    trim: true,
  },
  birthDate: {
    type: Date,
    required: [true, 'A data de nascimento é obrigatória'],
  },
  sex: {
    type: String,
    required: [true, 'O sexo é obrigatório'],
    enum: ['Male', 'Female', 'Other'], 
  },
  address: {
    type: String,
    required: [true, 'O endereço é obrigatório'],
    trim: true,
  },
}, {
  collection: 'Users',
  timestamps: true, 
});

export const User = mongoose.model('User', userSchema);

// src/controllers/BookController.js
import { Book } from "../../models/Books.js";
import { Author } from "../../models/Authors.js";

export const BookController = {
  async createBook(request, reply) {
    try {
      const { title, synopsis, year, authorId } = request.body;

      const author = await Author.findById(authorId);
      if (!author) {
        return reply.code(404).send({ message: "Autor não encontrado. Cadastro do livro não permitido." });
      }

      const book = new Book({ title, synopsis, year, author: authorId });
      await book.save();
      await book.populate("author");

      return reply.code(201).send({ message: "Livro registrado com sucesso!", data: book });
    } catch (err) {
      return reply.code(500).send({ message: "Erro ao registrar o livro.", error: err.message });
    }
  },

  async getBooks(request, reply) {
    try {
      const allBooks = await Book.find().populate("author");
      return reply.send({ total: allBooks.length, books: allBooks });
    } catch (err) {
      return reply.code(500).send({ message: "Erro ao buscar livros.", error: err.message });
    }
  },
};

// src/http/controllers/AuthorController.js
import { Author } from "../../models/Authors.js";

export const AuthorController = {
  
  async createAuthor(request, reply) {
    try {
      const { name, birthDate, sex, writingGenre } = request.body;

      const author = new Author({ name, birthDate, sex, writingGenre });
      await author.save();

      return reply
        .code(201)
        .send({ message: "Autor registrado com sucesso!", data: author });

    } catch (err) {
      if (err.code === 11000) {
        return reply
          .code(409)
          .send({ message: "Já existe um autor com este nome cadastrado." });
      }

      return reply
        .code(500)
        .send({ message: "Falha ao salvar o autor.", error: err.message });
    }
  },

  async getAllAuthors(request, reply) {
    try {
      const authorList = await Author.find();
      return reply.send({ total: authorList.length, authors: authorList });
    } catch (err) {
      return reply
        .code(500)
        .send({ message: "Erro ao buscar autores.", error: err.message });
    }
  },
};

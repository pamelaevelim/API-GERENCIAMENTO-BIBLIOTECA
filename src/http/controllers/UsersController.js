// src/controllers/UserController.js
import { User } from '../../models/Users.js';

const handleError = (reply, status, message, error = null) => {
  const response = { message };
  if (error) response.error = error.message;
  return reply.status(status).send(response);
};

export const UserController = {
  async registerUser(req, res) {
    const { name, birthDate, sex, address } = req.body;

    try {
      const userExists = await User.findOne({ name });
      if (userExists) {
        return handleError(res, 409, 'Erro: Usuário com este nome já existe.');
      }

      const user = new User({ name, birthDate, sex, address });
      await user.save();

      return res.status(201).send({
        message: 'Usuário cadastrado com sucesso',
        user,
      });

    } catch (err) {
      return handleError(res, 500, 'Erro ao cadastrar usuário.', err);
    }
  },

  async getAllUsers(req, res) {
    try {
      const allUsers = await User.find();
      return res.send({ users: allUsers });
    } catch (err) {
      return handleError(res, 500, 'Erro ao listar usuários.', err);
    }
  },
};

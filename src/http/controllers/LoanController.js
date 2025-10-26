// src/controllers/LoanController.js
import { Book } from "../../models/Books.js";
import { Loan } from "../../models/Loans.js";
import { User } from "../../models/Users.js";

function getExpectedReturnDate() {
  const result = new Date();
  result.setDate(result.getDate() + 3);
  return result;
}

function isBeforeToday(date) {
  return new Date(date) < new Date();
}

export const LoanController = {
  async createLoan(request, reply) {
    try {
      const { bookId, userId } = request.body;

      const book = await Book.findById(bookId);
      const user = await User.findById(userId);

      if (!book) {
        return reply.code(404).send({ message: "Livro não encontrado." });
      }

      if (!user) {
        return reply.code(404).send({ message: "Usuário não encontrado." });
      }

      const currentDate = new Date();
      const returnDate = getExpectedReturnDate();

      let allowed = book.isAvailable;

      if (!book.isAvailable && book.expectedReturnDate && isBeforeToday(book.expectedReturnDate)) {
        allowed = true;
      }

      if (allowed) {
        const loan = new Loan({
          user: user.name,
          book: book.title,
          loanDate: currentDate.toISOString().split("T")[0],
          returnDate: returnDate.toISOString().split("T")[0],
        });

        await loan.save();

        book.isAvailable = false;
        book.expectedReturnDate = returnDate;
        await book.save();

        return reply.code(201).send({
          message: "Empréstimo registrado com sucesso.",
          loan,
          updatedBook: book,
        });
      }

      return reply.code(409).send({
        message: "O livro solicitado está emprestado no momento.",
        expectedReturn: book.expectedReturnDate,
      });
    } catch (err) {
      return reply.code(500).send({ message: "Erro ao processar o empréstimo.", error: err.message });
    }
  },
};

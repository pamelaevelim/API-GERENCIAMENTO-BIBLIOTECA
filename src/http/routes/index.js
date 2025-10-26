// src/routes/index.js
import { AuthorController } from '../controllers/AuthorController.js';
import { UserController } from '../controllers/UsersController.js';
import { BookController } from '../controllers/BookController.js';
import { LoanController } from '../controllers/Loancontroller.js';

export async function initializeRoutes(app) {
  
  app.route('/users')
     .post(UserController.registerUser)
     .get(UserController.getAllUsers);

  app.route('/authors')
     .post(AuthorController.createAuthor)
     .get(AuthorController.listAuthors);

  app.route('/books')
     .post(BookController.createBook)
     .get(BookController.listBooks);

  app.route('/loans')
     .post(LoanController.createLoan);
}

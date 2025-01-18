// routes/transaction.js
// routes/transactions.js
import express from 'express';  // Ensure express is imported
import { addExpense, getExpense, deleteExpense } from '../controllers/expense.js';
import { addIncome, getIncomes, deleteIncome } from '../controllers/income.js';
import { authMiddleware } from '../middleware/authMiddleware.js';  // Correct import for ES Modules
const router = express.Router();
// Protect the routes with authentication middleware
router.post('/add-income', authMiddleware, addIncome);
router.get('/get-incomes', authMiddleware, getIncomes);
router.delete('/delete-income/:id', authMiddleware, deleteIncome);
router.post('/add-expense', authMiddleware, addExpense);
router.get('/get-expenses', authMiddleware, getExpense);
router.delete('/delete-expense/:id', authMiddleware, deleteExpense);

export default router;  // Correct export for ES Modules

// controllers/expense.js
import { Expense } from '../models/ExpenseModel.js'

export const addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;
    const userId = req.user.userId; // Get logged-in user's ID from the token
    // console.log(req.body, userId);  // For debugging purposes, log the request body and user ID to the console.
    try {
        const numberAmount = Number(amount);
        console.log('Number amount:', numberAmount); // For debugging purposes, log the number amount to the console.
        console.log(typeof numberAmount);
        // Validations
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required!' });
        }
        if (amount < 0 || typeof numberAmount !== 'number') {
            return res.status(400).json({ message: 'Amount must be a positive number!' });
        }

        // Use create method
        const expense = await Expense.create({
            title,
            amount:numberAmount,
            category,
            description,
            date,
            user: userId // Associate the expense with the user
        });

        res.status(200).json({ message: 'Expense Added', expense });
    } catch (error) {
        console.error('Error adding expense:', error); // Log the error for debugging
        res.status(500).json({ message: 'Server Error' });
    }
};

export const getExpense = async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user.userId }).sort({ createdAt: -1 });  // Fetch expenses for the logged-in user
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
export const deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        const expense = await Expense.findOneAndDelete({ _id: id, user: req.user.userId });  // Only allow deleting if the expense belongs to the logged-in user
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found or unauthorized' });
        }
        res.status(200).json({ message: 'Expense Deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

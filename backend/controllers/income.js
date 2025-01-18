import { Income } from "../models/IncomeModel.js";  // Assuming you have this model

// Add Income
const addIncome = async (req, res) => {
    // console.log("addIncome API is called");
    const { title, amount, category, description, date } = req.body;
    const userId = req.user?.userId; // Ensure `req.user` exists and extract `userId`
    // console.log(req.body, userId);

    try {
        const numericAmount = Number(amount);
        // Validations
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required!' });
        }
        if (amount <= 0 || typeof numericAmount !== 'number') {
            return res.status(400).json({ message: 'Amount must be a positive number!' });
        }
        // Use `create` for saving directly to the database
        const income = await Income.create({
            title,
            amount:numericAmount,
            category,
            description,
            date,
            user: userId,
        });

        res.status(201).json({ message: 'Income Added', income });
    } catch (error) {
        console.error('Error adding income:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Get Incomes
const getIncomes = async (req, res) => {
    try {
        const userId = req.user?.userId;
        const incomes = await Income.find({ user: userId }).sort({ createdAt: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        console.error('Error fetching incomes:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Delete Income
const deleteIncome = async (req, res) => {
    const { id } = req.params;

    try {
        const userId = req.user?.userId;

        const income = await Income.findOneAndDelete({ _id: id, user: userId });
        if (!income) {
            return res.status(404).json({ message: 'Income not found or unauthorized' });
        }

        res.status(200).json({ message: 'Income Deleted', income });
    } catch (error) {
        console.error('Error deleting income:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

export { addIncome, getIncomes, deleteIncome };

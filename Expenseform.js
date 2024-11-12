import React, { useState } from 'react';

function ExpenseForm({ addExpense }) {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('Food');

    const handleSubmit = (e) => {
        e.preventDefault();
        const parsedAmount = parseFloat(amount);

        // Check if description is not empty and amount is a valid positive number
        if (description && !isNaN(parsedAmount) && parsedAmount > 0) {
            addExpense({ description, amount: parsedAmount, category });
            setDescription('');
            setAmount('');
            setCategory('Food'); // Reset category to default
        } else {
            alert("Please enter a valid description and a positive amount.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Expense Description"
                required
            />
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
                required
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="" disabled>Select Category</option>
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Others">Others</option>
            </select>
            <button type="submit">Add Expense</button>
        </form>
    );
}

export default ExpenseForm;
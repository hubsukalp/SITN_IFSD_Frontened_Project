import React, { useState, useEffect } from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Summary from './components/Summary';

function App() {
    const [expenses, setExpenses] = useState(() => {
        // Retrieve expenses from localStorage if available
        const savedExpenses = localStorage.getItem('expenses');
        return savedExpenses ? JSON.parse(savedExpenses) : [];
    });

    // Save expenses to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }, [expenses]);

    const addExpense = (expense) => {
        if (expense.amount <= 0) {
            alert("Amount must be a positive number.");
            return;
        }
        setExpenses([...expenses, expense]);
    };

    const deleteExpense = (index) => {
        setExpenses(expenses.filter((_, i) => i !== index));
    };

    return (
        <div className="App">
            <h1>Expense Tracker</h1>
            <ExpenseForm addExpense={addExpense} />
            <ExpenseList expenses={expenses} deleteExpense={deleteExpense} />
            <Summary expenses={expenses} />
        </div>
    );
}

export default App;
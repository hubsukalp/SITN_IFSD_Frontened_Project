document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expenseForm');
    const expenseList = document.getElementById('expenseList');
    const summary = document.getElementById('summary');

    // Retrieve expenses from localStorage or initialize an empty array
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // Function to render expenses in the list
    function renderExpenses() {
        expenseList.innerHTML = '';
        expenses.forEach((expense, index) => {
            const expenseItem = document.createElement('div');
            expenseItem.classList.add('expense-item');
            expenseItem.innerHTML = `
                <span>${expense.description}</span>
                <span>${expense.category}</span>
                <span>$${expense.amount.toFixed(2)}</span>
                <button onclick="deleteExpense(${index})" aria-label="Delete ${expense.description}">X</button>
            `;
            expenseList.appendChild(expenseItem);
        });
        renderSummary();
    }

    // Function to render the summary by category
    function renderSummary() {
        const categoryTotals = expenses.reduce((acc, expense) => {
            acc[expense.category] = (acc[expense.category] || 0) + parseFloat(expense.amount);
            return acc;
        }, {});

        summary.innerHTML = '<h3>Expense Summary</h3>';
        for (const [category, total] of Object.entries(categoryTotals)) {
            const categoryItem = document.createElement('div');
            categoryItem.innerText = `${category}: $${total.toFixed(2)}`;
            summary.appendChild(categoryItem);
        }
    }

    // Function to delete an expense
    window.deleteExpense = (index) => {
        expenses.splice(index, 1);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
    };

    // Add new expense on form submit
    expenseForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const description = document.getElementById('description').value.trim();
        const amount = document.getElementById('amount').value.trim();
        const category = document.getElementById('category').value.trim();

        // Validate inputs
        if (description && amount && !isNaN(amount) && parseFloat(amount) > 0) {
            const expense = { description, amount: parseFloat(amount), category };
            expenses.push(expense);

            // Store the updated expenses in localStorage
            localStorage.setItem('expenses', JSON.stringify(expenses));

            // Clear form fields
            expenseForm.reset();

            // Re-render expenses
            renderExpenses();
        } else {
            alert('Please enter valid expense details. Amount must be a positive number.');
        }
    });

    // Initial render of expenses
    renderExpenses();
});
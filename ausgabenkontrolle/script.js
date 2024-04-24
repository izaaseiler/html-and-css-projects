document.addEventListener('DOMContentLoaded', function() {
    const addExpenseButton = document.getElementById('add-expense');
    const expensesContainer = document.getElementById('expenses');
    const salaryInput = document.getElementById('salary');
    const totalExpenses = document.getElementById('total-expenses');
    const remainingBalance = document.getElementById('remaining');

    let expenses = [];
    let salary = 0;

    addExpenseButton.addEventListener('click', function() {
        const expenseEntry = document.createElement('div');
        expenseEntry.className = 'expense-entry';

        expenseEntry.innerHTML = `
            <input type="text" class="expense-description" placeholder="Descrição">
            <input type="number" class="expense-amount" placeholder="Valor">
            <select class="expense-type">
                <option value="deduction">Dedução</option>
                <option value="income">Renda Extra</option>
            </select>
            <button class="remove-expense">Remover</button>
        `;

        expensesContainer.appendChild(expenseEntry);

        const removeExpenseButtons = document.querySelectorAll('.remove-expense');
        removeExpenseButtons.forEach(button => {
            button.addEventListener('click', removeExpense);
        });
    });

    function removeExpense(event) {
        const expenseEntry = event.target.parentNode;
        expensesContainer.removeChild(expenseEntry);
        updateTotal();
    }

    function updateTotal() {
        expenses = [];
        const expenseEntries = document.querySelectorAll('.expense-entry');
        expenseEntries.forEach(entry => {
            const description = entry.querySelector('.expense-description').value;
            const amount = parseFloat(entry.querySelector('.expense-amount').value);
            const type = entry.querySelector('.expense-type').value;
            expenses.push({ description, amount, type });
        });

        let totalDeductions = 0;
        let totalIncome = 0;

        expenses.forEach(expense => {
            if (expense.type === 'deduction') {
                totalDeductions += expense.amount;
            } else {
                totalIncome += expense.amount;
            }
        });

        salary = parseFloat(salaryInput.value);
        const remaining = salary - totalDeductions + totalIncome;

        totalExpenses.textContent = totalDeductions.toFixed(2);
        remainingBalance.textContent = remaining.toFixed(2);
    }

    salaryInput.addEventListener('input', updateTotal);
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('transaction-form');
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');
    const typeSelect = document.getElementById('type');
    const balanceEl = document.getElementById('balance');
    const incomeEl = document.getElementById('income');
    const expenseEl = document.getElementById('expense');
    const transactionHistoryEl = document.getElementById('transaction-history');

    let balance = 0;
    let income = 0;
    let expense = 0;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const description = descriptionInput.value;
        const amount = parseFloat(amountInput.value);
        const type = typeSelect.value;

        if (!description || !amount || isNaN(amount)) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        const transaction = {
            description,
            amount,
            type
        };

        if (type === 'income') {
            income += amount;
            balance += amount;
        } else if (type === 'expense') {
            expense += amount;
            balance -= amount;
        }

        updateUI();
        addTransactionToHistory(transaction);
        form.reset();
    });

    function updateUI() {
        balanceEl.textContent = `Balance: $${balance.toFixed(2)}`;
        incomeEl.textContent = `Ingresos: $${income.toFixed(2)}`;
        expenseEl.textContent = `Gastos: $${expense.toFixed(2)}`;
    }

    function addTransactionToHistory(transaction) {
        const li = document.createElement('li');
        li.classList.add(transaction.type);
        li.textContent = `${transaction.description}: $${transaction.amount.toFixed(2)}`;
        transactionHistoryEl.appendChild(li);
    }
});

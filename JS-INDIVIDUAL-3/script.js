/**
 * Array of transactions
 * @type {Array<Object>}
 */
let transactions = [
    {
        id: '1',
        date: '10:05:2024',
        category: 'Покупка',
        amount: -25,
        description: 'Купил сметану в Фидеско'
    }
]

/**
 * Function to add a new transaction to the array and update the table
 * @param {Object} newTransaction - New transaction to be added
 */
function addTransactionInArray(newTransaction) {
    transactions.push(newTransaction)
    addTrInTable()
}

/**
 * Function to add rows to the table based on the transactions array
 */
function addTrInTable() {
    let tbody = document.getElementById("tr_body")
    tbody.innerHTML = '';
    transactions.forEach(transaction => {
        let row = document.createElement('tr')
        Object.values(transaction).forEach(value => {
            let part = document.createElement('td')
            part.textContent = value
            row.append(part)
        });

        if (transaction.amount < 0) {
            row.style.backgroundColor = '#FF4040'
        } else {
            row.style.backgroundColor = '#217d21'
        }

        let delete_btn = document.createElement('button')
        delete_btn.textContent = 'Удалить'
        row.append(delete_btn)
        tbody.append(row)
    });
    calculateTotal()
    updateAmount()
}

/**
 * Function to delete a transaction from the array
 * @param {string} id - Id of the transaction
 */
function deleteTransaction(id) {
    for (let i = 0; i < transactions.length; i++) {
        let element = transactions[i]
        if (element.id === id) {
            transactions.splice(i, 1)
            break
        }
    }
}

// Event listener to delete a transaction when clicking on the Delee button
document.getElementById("tr_table").addEventListener('click', (event) => {
    if (event.target.tagName === "BUTTON") {
        let tr = event.target.closest('tr')
        let id = tr.querySelector('td:first-child').textContent;
        deleteTransaction(id)
        tr.remove()
        updateAmount()
    }
});

/**
 * Function to calculate the total amount of transactions
 * @returns {number} - Total amount of transactions
 */
function calculateTotal() {
    let total = 0;
    for (let i = 0; i < transactions.length; i++) {
        const amount = transactions[i].amount
        total += amount
    }
    return total
}

/**
 * Function to update the display of the total amount of transactions on the page
 */
function updateAmount() {
    const total = calculateTotal()
    const id_sum = document.getElementById('total_amount')
    id_sum.textContent = total
}

// Event listener to display the  description of a transaction when clicking on a table row
document.getElementById("tr_table").addEventListener('click', (event) => {
    if (event.target.tagName === "TD") {
        const tr = event.target.parentNode
        const description = tr.querySelector('td:nth-child(5)').textContent
        const transactionDescription = document.getElementById('tr_description')
        transactionDescription.textContent = description
    }
});


let newTransaction = {
    id: '2',
    date: '11:05:2024',
    category: 'Нашел бабушкин кошелек',
    amount: 80,
    description: 'Очень счастлив, бабушка ничего не заметила'
}

let newTransaction1 = {
    id: '3',
    date: '13:05:2024',
    category: 'Покупка',
    amount: -40,
    description: 'Купил пельмени в Фидеско'
}

let newTransaction2 = {
    id: '4',
    date: '09:05:2024',
    category: 'Вернули долг',
    amount: 600,
    description: 'Свои долги можно и простить'
}

addTransactionInArray(newTransaction)
addTransactionInArray(newTransaction1)
addTransactionInArray(newTransaction2)

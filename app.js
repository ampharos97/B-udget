function budgetcalc(all_transactions) {

    let budget = 0
    
    for (const transaction of all_transactions) {
        budget += transaction.amount
    }

    return budget
}

function printbudget() {
    budgetDisplay.textContent = 'Your budget is: ' + budgetcalc(all_transactions)
}

function refreshAndSave(){
    printbudget()

    transactionlistdisplay(transactionlist,all_transactions)

    localStorage.setItem('all_transaction', JSON.stringify(all_transactions))
}

function transactionlistdisplay(parentlist,all_transactions) {

    parentlist.textContent = ''

    for (const transaction of all_transactions) {
        const transactionlistitem = document.createElement('li')
        transactionlistitem.textContent = transaction.label + ' | ' + transaction.amount + ' | ' + transaction.date
        parentlist.appendChild(transactionlistitem)
        const buttonX = document.createElement('Button')
        buttonX.textContent = 'X'
        transactionlistitem.appendChild(buttonX)
        buttonX.addEventListener('click',() => removetransaction(transaction))
    } 
}

function removetransaction(transaction){

    const indextormove = all_transactions.indexOf(transaction)

    all_transactions.splice(indextormove,1)

    refreshAndSave()

}

function addtransaction(){

    if (isNaN(parseFloat(Amountinput.value))) {
        ErrorDisplay.textContent = 'Please enter a valid number for the amount.'
    return 
    }

    ErrorDisplay.textContent = ''

    const temptransaction = {
        label : Labelinput.value,
        amount : parseFloat(Amountinput.value),
        date : Dateinput.value
    }

    all_transactions.push(temptransaction)

    refreshAndSave()
}

const parser = localStorage.getItem('all_transaction')

let all_transactions = []

if (parser !== null) {
    all_transactions = JSON.parse(parser)
}

const budgetDisplay = document.getElementById('budget_display')
const Labelinput = document.getElementById('label_input')
const Amountinput = document.getElementById('amount_input')
const Dateinput = document.getElementById('date_input')
const ErrorDisplay = document.getElementById('error_display')
const addTransactionButton = document.getElementById('add_transaction')
addTransactionButton.addEventListener('click', addtransaction)
const transactionlist = document.getElementById('transaction_list')
refreshAndSave()


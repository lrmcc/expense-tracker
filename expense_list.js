let entryCount = 1;
let entries = [];

let emptyTable = "<tr><th>Name</th><th>Date</th><th>Amount</th><th></th></tr>"
let defaultTable = emptyTable + "<tr><td>No Entries!</td><td>yyyy-mm-dd</td><td>$0</td><td></td></tr>";

function getExpense(){
    let expenseName = document.getElementById("expense-name-text").value;
    let expenseDate = document.getElementById("expense-date").value;
    let expenseAmount = document.getElementById("expense-amount").value;
    if (checkAmount(expenseAmount)){
        let expenseTuple = [expenseName, expenseDate, expenseAmount];
        entries.push(expenseTuple);
        putExpense(expenseTuple);
        clearExpenseInput();}
    else{
        alert("Try Again: Invalid 'Amount' Entry");
    }  
} 

function putExpense(expenseTuple){
    entryCount = entries.length;
    var expenseTable = document.getElementById("expense-table");
    if (entryCount === 1) expenseTable.innerHTML = emptyTable;
    addTableRow(entryCount, expenseTuple, expenseTable);
}

function clearExpenseItemFromTable(itemEntryCount){
    entries = entries.filter(a => a !== entries[itemEntryCount-1]);
    entryCount = entries.length;
    var expenseTable = document.getElementById("expense-table");
    if (entryCount === 0){
        expenseTable.innerHTML = defaultTable;
    }
    else{
        expenseTable.innerHTML = emptyTable;
        for (let i = 0; i < entries.length; i++){
            let expenseTuple = [entries[i][0], entries[i][1], entries[i][2]];
            addTableRow((i+1), expenseTuple, expenseTable);
        }
    }
}

function addTableRow(entryCount, expenseTuple, expenseTable){
    var row = document.createElement("tr");
    row.id = entryCount;
    expenseTable.appendChild(row);
    for (var i = 0; i < 4; i++) {
        var cell = document.createElement("td");
        if (i<3){
            cell.innerHTML = expenseTuple[i];
        }else{
            cell.innerHTML = getClearItemButton(entryCount)
        }
        row.appendChild(cell)
    }
}

function exportExpenseTable(){
    let csvContent = "data:text/csv;charset=utf-8," + entries.toString();
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "expense_data.csv");
    document.body.appendChild(link);
    link.click(); 
}

function clearExpenseTable(){
    let choice = confirm("Are you sure you want to clear the table?");
    if (choice){
        var expenseTable = document.getElementById("expense-table");
        entries = [];
        entryCount = 0;
        expenseTable.innerHTML = defaultTable;
    }
}

function checkAmount(expenseAmount){
    return ( /^\d+$/.test(expenseAmount))
}

function submitWithReturn(event) {
    if (event.keyCode === 13) {
        getExpense();
       }
  }

function clearExpenseInput(){
    let nameInput = document.getElementById("expense-name-text");
    nameInput.value = "";
}

function getClearItemButton(count){
    return "<button type='button' class='clear-expense-item-from-table-button' id=" + count +" onclick='clearExpenseItemFromTable(" + count + ")'>x</button>";
}
let entryCount = 1;
let entries = [];

let listItemString = ["<tr onclick='expenseListItemDone(this)' id=","</tr>"];
let emptyTable = "<tr><th>Name</th><th>Date</th><th>Amount</th><th>Actions</th></tr>"
let defaultTable = emptyTable + "<tr><td>No Entries!</td><th>yyyy-mm-dd</th><td>$0</td><td></td></tr><tr></tr><tr></tr>";

function submitWithReturn(event) {
    if (event.keyCode === 13) {
        getExpense();
       }
  }

function getExpense(){
    let expenseName = document.getElementById("expense-name-text").value;
    let expenseDate = document.getElementById("expense-date").value;
    let expenseAmount = document.getElementById("expense-amount").value;
    let expenseTuple = [expenseName, expenseDate, expenseAmount];
    entries.push(expenseTuple);
    putExpense(expenseTuple);
    let input = document.getElementById("expense-name-text");
    input.value = "";
} 

function putExpense(expenseTuple){
    entryCount = entries.length;
    console.log("Entry Count: " + entryCount);
    var completelist = document.getElementById("expense-list");
    if (entryCount === 1){
        completelist.innerHTML = emptyTable;
    }
    completelist.innerHTML +=  listItemString[0] + entryCount +"><td>"  + expenseTuple[0] + "</td><td>" + expenseTuple[1]+ "</td><td>$" + expenseTuple[2] + "</td><td>" + getClearItem(entryCount) + getDoneItem(entryCount) +"</td>" + listItemString[1];
    console.log("clear Item: " + getClearItem(entryCount));
} 

function expenseListItemDone(item) {
    let txtDec = item.style.textDecoration;
    if (txtDec === "line-through"){
        item.style = "text-decoration:none;";
    }else{
      item.style = "text-decoration:line-through;";  
    }
    
  }

function getClearItem(count){
    return "<button type='button' class='clear-expense-item-from-list-button' id=" + entryCount +" onclick='clearExpenseItemFromList(" + entryCount + ")'>x</button>";
}

function getDoneItem(count){
    return "<button type='button' class='expense-list-item-done-button' id=" + entryCount +" onclick='expenseListItemDone(" + entryCount + ")'>Done</button>"
}

function clearExpenseItemFromList(itemEntryCount){
    console.log("target item count is: " + itemEntryCount);
    entries = entries.filter(a => a !== entries[itemEntryCount-1]);
    console.log(entries);
    var completelist = document.getElementById("expense-list");
    completelist.innerHTML = emptyTable;
    entryCount = 1;
    for (let i = 0; i < entries.length; i++){
        completelist.innerHTML += listItemString[0] + entryCount +"><td>"  + entries[i][0] + "</td><td>" + entries[i][1]+ "</td><td>$" + entries[i][2] + "</td><td>" + getClearItem(entryCount) + getDoneItem(entryCount) +"</td>" + listItemString[1];
        entryCount++;
    }
}

function clearExpenseList(){
    let choice = confirm("Are you sure you want to clear the list?");
    if (choice){
        var completelist = document.getElementById("expense-list");
        entries = [];
        entryCount = 0;
        completelist.innerHTML = defaultTable;
    }
    
}
function exportExpenseList(){
    let csvContent = "data:text/csv;charset=utf-8," + entries.toString();
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "expense_data.csv");
    document.body.appendChild(link);
    link.click(); 
}

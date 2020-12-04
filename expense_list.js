let entryCount = 1;
let entries = [];

let done = "<button type='button' class='expense-list-item-done-button' id=" + entryCount +" onclick='expenseListItemDone(" + entryCount + ")'>Done</button>"
let clearItem = "<button type='button' class='clear-expense-item-from-list-button' id=" + entryCount +" onclick='clearExpenseItemFromList(" + entryCount + ")'>x</button>";
let listItemString = ["<li onclick='expenseListItemDone(this)' id=","</li><hr>"];

function submitWithReturn(event) {
    if (event.keyCode === 13) {
        getExpense();
       }
  }
function getExpense(){
    let expenseName = document.getElementById("expense-name-text").value;
    let expenseAmount = document.getElementById("expense-amount").value;
    let expenseDate = document.getElementById("expense-date").value;
    let expenseTuple = [expenseName, expenseAmount, expenseDate];
    entries.push(expenseTuple);
    putExpense(expenseTuple);
    let input = document.getElementById("expense-name-text");
    input.value = "";
} 

function putExpense(expenseTuple){
    entryCount = entries.length;
    console.log("Entry Count: " + entryCount);
    var completelist = document.getElementById("expense-list");
    completelist.innerHTML +=  listItemString[0] + entryCount +">" + "Date:" + expenseTuple[2] +" Name: " + expenseTuple[0] + " Amount: " + expenseTuple[1] + clearItem + done + listItemString[1];
} 

function expenseListItemDone(item) {
    let txtDec = item.style.textDecoration;
    if (txtDec === "line-through"){
        item.style = "text-decoration:none;";
    }else{
      item.style = "text-decoration:line-through;";  
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

function clearExpenseItemFromList(itemEntryCount){
    entries = entries.filter(a => a !== entries[itemEntryCount-1]);
    var completelist = document.getElementById("expense-list");
    completelist.innerHTML = ""
    entryCount = 1;
    for (let i = 0; i < entries.length; i++){
        completelist.innerHTML += listItemString[0] + entryCount +">" + "Date:" + entries[i][2] +" Name: " + entries[i][0] + " Amount: " + entries[i][1] + clearItem + done + listItemString[1];
        entryCount++;
    }
}

function clearExpenseList(){
    let choice = confirm("Are you sure you want to clear the list?");
    if (choice){
        var completelist = document.getElementById("expense-list");
        entries = [];
        entryCount = 0;
        completelist.innerHTML = "";
    }
    
}


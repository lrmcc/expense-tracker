let entryCount = 1;
let entries = [];
let dates = [];
let amounts = [];

let done = "<button type='button' class='expense-list-item-done-button' id=" + entryCount +" onclick='expenseListItemDone(" + entryCount + ")'>Done</button>"
let clearItem = "<button type='button' class='clear-expense-item-from-list-button' id=" + entryCount +" onclick='clearExpenseItemFromList(" + entryCount + ")'>x</button>";

function submitWithReturn(event) {
    if (event.keyCode === 13) {
        getExpense();
       }
  }
function getExpense(){
    let expenseItem = document.getElementById("expense-name-text").value;
    entries.push(expenseItem);
    putExpense(expenseItem);
    let input = document.getElementById("expense-name-text");
    input.value = "";
} 

function putExpense(expenseItem){
    entryCount = entries.length;
    var completelist = document.getElementById("expense-List");
    completelist.innerHTML += "<li onclick='expenseListItemDone(this)' id=" + entryCount +">" + entryCount +". " + expenseItem + clearItem + done + "</li><hr>";
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
    var completelist = document.getElementById("expense-List");
    completelist.innerHTML = ""
    entryCount = 1;
    for (let i = 0; i < entries.length; i++){
        completelist.innerHTML += "<li onclick='expenseListItemDone(this)' id=" + entryCount +">" + entryCount +". " + entries[i] + clearItem + done + "</li><hr>";
        entryCount++;
    }
}

function clearExpenseList(){
    let choice = confirm("Are you sure you want to clear the list?");
    if (choice){
        var completelist = document.getElementById("expense-List");
        entries = [];
        entryCount = 0;
        completelist.innerHTML = "";
    }
    
}


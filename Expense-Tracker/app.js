const balance = document.getElementById("balance");
const moneyPlus = document.getElementById("money-plus");
const moneyMinus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// const dummyTransactions = [
//   {
//     id: 1,
//     text: "Flower",
//     amount: -1000,
//   },
// ]

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

//add transactions
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please enter a valid text and amount!!!");
  }
  const newTransaction = {
    id: transactions.length + 1,
    text: text.value,
    amount: Number(amount.value),
  };

  transactions.push(newTransaction);
  updateLocalStorage();
  addTransactionToDOM(newTransaction);
  updateValues();
  text.value = "";
  amount.value = "";
}

//remove transactions
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id != id);
  updateLocalStorage();
  init();
}

//add transactions to DOM list

function addTransactionToDOM(transaction) {
  //get the sign
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");
  item.innerHTML = `${transaction.text} <span>${sign}₹${Math.abs(
    transaction.amount
  )}</span><button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>
  `;

  list.appendChild(item);
}

//updates the balance income and expense
function updateValues() {
  const amounts = transactions.map((transactions) => transactions.amount);
  balance.innerText = `₹${amounts
    .reduce((arr, exp) => arr + exp, 0)
    .toFixed(2)}`;
  moneyMinus.innerText = `₹${Math.abs(
    amounts.filter((amount) => amount < 0).reduce((arr, exp) => arr + exp, 0)
  ).toFixed(2)}`;
  moneyPlus.innerText = `₹${amounts
    .filter((amount) => amount > 0)
    .reduce((arr, exp) => arr + exp, 0)
    .toFixed(2)}`;
}

//Init app

function init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionToDOM);
  updateValues();
}

init();

//update local storage transactions

function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

//Event Listeners
form.addEventListener("submit", addTransaction);

const main = document.getElementById('main');

const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');


let data = [];

//fetch a new user
async function getNewUser(){
    const res = await fetch("https://randomuser.me/api");
    const data = await res.json();
    const user = {
        name: `${data.results[0].name.first} ${data.results[0].name.last}`,
        money: Math.random()*10000000
    }
    addData(user);
}
getNewUser();
getNewUser();
getNewUser();

//add new data to data array

function addData(user){
    data.push(user);
    updateDOM();
}

function updateDOM(providedData = data){
    //clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    providedData.forEach((elem)=>{
        let div = document.createElement('div');
        div.className = 'person';
        div.innerHTML = `<strong>${elem.name}</strong> $ ${
            formatMoney(elem.money)
        }`;
        main.appendChild(div);
    });
}

//formating money
function formatMoney(num){
    return num.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//Doubling Money
function doubleMoney(){
    data = data.map((elem)=>{
        return {
            ...elem, 
            money : elem.money*2
        }
    });
    updateDOM(data);
}

//Sort By Money
function sortByMoney(){
    data = data.sort((a,b)=> b.money - a.money );
    updateDOM(data);
}

//Show Only Millionaires
function showOnlyMillionaires(){
    data = data.filter((elem)=> elem.money > 1000000);
    updateDOM(data);
}

//calculate total
function calculateTotal(){
    let total = data.reduce((acc,elem)=>(elem.money + acc),0);
    
    let div = document.createElement('div');
    div.innerHTML = `<h3>Total: <strong>$ ${formatMoney(total)}</strong></h3>`;
    main.appendChild(div);
}

//Event Listeners
addUserBtn.addEventListener('click',getNewUser);
doubleBtn.addEventListener('click',doubleMoney);
sortBtn.addEventListener('click',sortByMoney);
showMillionairesBtn.addEventListener('click',showOnlyMillionaires);
calculateWealthBtn.addEventListener('click',calculateTotal);

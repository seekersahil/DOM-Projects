const addForm = document.querySelector("#addForm");
const itemsList = document.querySelector("#items");
const item = document.querySelector("#list-item");
const filter = document.querySelector("#filter");

//addForm submit event

addForm.addEventListener('submit',addItem);
itemsList.addEventListener('click',editItem);
filter.addEventListener('keyup',filterItems);

function addItem(e){
    e.preventDefault();

    //get Input Value
    let input = document.getElementById("newItem").value;

    //creat new li
    let newLi = document.createElement('li');
    newLi.className = "list-group-item";

    //add divs to li
    let div1 = document.createElement('div');
    div1.className = "input-group";
    newLi.appendChild(div1);
    let div2 = document.createElement('div');
    div2.className = "form-control";
    div2.id = "list-item";
    div2.style.border = "none";
    div1.appendChild(div2);

    //add Text Node with input value
    let createNode = document.createTextNode(input);
    div2.appendChild(createNode);

    //add Delete Button
    let div3 = document.createElement("div");
    div3.classList.add("input-group-append","float-right");
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("btn","btn-danger","delete");
    deleteButton.innerHTML = "X";
    console.log(newLi);
    div3.appendChild(deleteButton);
    div1.appendChild(div3);
    
    itemsList.appendChild(newLi)
}

function editItem(e){
    //deleting the item
    if(e.target.classList.contains("delete")){
        if(confirm("Are you sure you want to delete?")){
            let li = e.target.parentElement.parentElement.parentElement;
            itemsList.removeChild(li);
        }
    }
}

function filterItems(e){
    let input = e.target.value.toLowerCase();
    var items = itemsList.getElementsByTagName("li");
    Array.from(items).forEach(function(item){
        let name = item.firstElementChild.firstElementChild.textContent;
        if(name.toLowerCase().indexOf(input) != -1){
            item.style.display = "block";
        }
        else{
            item.style.display = "none";
        }
    });
}
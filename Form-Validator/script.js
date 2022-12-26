const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

function showError(input, message) {
    input.parentElement.className ="form-control error";
    const small = input.parentElement.querySelector("small");
    small.innerText = message;
}
function showSuccess(input) {
    input.parentElement.className = "form-control success";
}
//eventListeners
form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkUsername(username,3,15);
    checkEmail(email);
    checkPassword(password,6,25);
    confirmPassword(password,password2);
});

//check Username
function checkUsername(username,min,max){
    if(!checkIfEmpty(username))
    checkLength(username,min,max);
}

//check Email
function checkEmail(email){
    if(!checkIfEmpty(email)){
        if(/^[\w.!#$%&'*+/=?^_`{|}~-]+\@[\w-.]+\.[\w]+$/gi.test(email.value)){
            showSuccess(email);
        } else{
            showError(email, "Please enter a valid email");
        }
    };
}

//check Password
function checkPassword(password,min,max){
    if(!checkIfEmpty(password))
    checkLength(password,min,max);
}

//confirm Password
function confirmPassword(password,password2){
    if(password2.value === ""){
        showError(password2,"This can't be empty");
    } else if(password2.value === password.value){
        showSuccess(password2)
    } else{
        showError(password2,"Passwords don't match");
    }
}

//check if a field is empty
function checkIfEmpty(input){
    if(input.value == ""){
        showError(input,input.id[0].toUpperCase()+input.id.slice(1)+" is required");
        return true;
    } else{
        showSuccess(input);
        return false;

    }
}

//check length of input
function checkLength(input,min,max){
    if(input.value.length < min){
        showError(input,input.id[0].toUpperCase()+input.id.slice(1)+" should be atleast "+min+" characters");
    }
    else if(input.value.length > max){
        showError(input,input.id[0].toUpperCase()+input.id.slice(1)+" must be less than "+max+" characters");
    }
    else{
        showSuccess(input)
    }
}

const movieList = [
    {
        name:"Brahmastra",
        price:150
    },
    {
        name:"Baahubali",
        price:180
    },
    {
        name:"Avengers: Endgame",
        price:210
    },
    {
        name:"Avatar: The way of Water",
        price:240
    },
];

//add movieList
const movieContainer = document.getElementById("movie");
for(let movie in movieList){
    let movieOption  = document.createElement("option");
    movieOption.innerHTML = movieList[movie].name+" (₹"+movieList[movie].price+")";
    movieOption.value = movieList[movie].price;
    movieContainer.appendChild(movieOption);
}

const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
populateUI();
let ticketPrice = +movieSelect.value;

//update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    let seatsIndex  = [...selectedSeats].map(seat=>[...seats].indexOf(seat));

    console.log(seatsIndex)
    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));

    const SelectedSeatsCount = selectedSeats.length;
    count.innerText = SelectedSeatsCount;
    total.innerText = SelectedSeatsCount*ticketPrice;
}

//Get data from local storage and populate UI
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats!=null && selectedSeats.length>0){
        seats.forEach((seat,index)=>{
            if(selectedSeats.indexOf(index)>-1){
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex!=null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }

}

//save movie attribuites to local storage
function saveMovieData(index,value) {
    localStorage.setItem('selectedMovieIndex',index);
    localStorage.setItem('selectedMoviePrice',value);
}

//movie select event
movieSelect.addEventListener("change", (e) => {
    ticketPrice = +e.target.value;
    saveMovieData(e.target.selectedIndex,e.target.value);
    updateSelectedCount();
});

//seat click event
container.addEventListener("click",(e) => {
    if(e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
        e.target.classList.toggle("selected");
        updateSelectedCount();
    }
});

//initial count and total set
updateSelectedCount();
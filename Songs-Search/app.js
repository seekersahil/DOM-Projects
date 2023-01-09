const form = document.getElementById("form");
const result = document.getElementById("result");
const more = document.getElementById("more");
const search = document.getElementById("search");

//api urls for song info and covers
const apiURL = "https://musicbrainz.org/ws/2";
const coverURL = "https://coverartarchive.org";

const defaultImg = "./img/cover.jpg";

//api offset values
let limit = 20;
let offset = 0;

//previous songs
function prevSongs() {
  const searchTerm = search.value.trim();
  if (offset >= limit) {
    offset -= limit;
  }
  searchSongs(searchTerm, offset);
}

//next songs
function nextSongs() {
  const searchTerm = search.value.trim();
  offset += limit;
  searchSongs(searchTerm, offset);
}

//Search by song or artist
async function searchSongs(searchText, offset) {
  const res = await fetch(
    `${apiURL}/recording/?query=${searchText}&offset=${offset}&limit=${limit}&fmt=json`
  );
  const data = await res.json();
  console.log(data.count);
  showData(data);
}

//show song and artist in dom
function showData(data) {
  result.innerHTML = `
    <ul class="songs">
        ${data.recordings
          .map(
            (song) => `
        <li>
          <span>${song["artist-credit"][0]["name"]} - <strong>${song["title"]}</strong></span>
          <button class="btn" data-id='${song["id"]}'>Get Info</button>
        </li>
      `
          )
          .join("")}
    </ul>
    `;
  let totalPages = Math.floor(+data.count / limit + 1);
  let currentPage = Math.floor(offset / limit + 1);

  let prev = currentPage <= 1 ? false : true;
  let next = currentPage >= totalPages ? false : true;

  // get number of recordings
  const count = data.recordings.length;
  console.log(count);

  if (prev || next) {
    more.innerHTML = `
    ${
      prev ? `<button class="btn" onclick="prevSongs()">Previous</button>` : ""
    }<p>Page ${currentPage} of ${totalPages}</p>
    ${next ? `<button class="btn" onclick="nextSongs()">Next</button>` : ""}
    `;
  } else {
    more.innerHTML = data.count
      ? `<p>Page 1 of 1</p>`
      : `<p>No Results founds</p>`;
  }
}

//Get info of song
function getInfo(id) {
  return fetch(
    `${apiURL}/recording/${id}?inc=artist-credits+isrcs+releases&fmt=json`
  )
    .then((res) => res.json())
    .then((data) => {
      getCover(data);
    });
}

// Get coverArt from https://coverartarchive.org/ based on the MBID from MusicBrainz_API
async function getCover(song) {
  let mbid = song.releases[0].id;
  fetch(`${coverURL}/release/${mbid}`)
    .then((res) => res.json())
    .then((data) => {
      showInfo(song, data.images[0].image);
    })
    .catch(() => {
      showInfo(song, defaultImg);
    });
}

//show data on DOM
function showInfo(song, imageURL) {
  const searchTerm = search.value.trim();

  // duration of the song in seconds
  let time = song.length / 1000;
  let hrs = ~~(time / 3600);
  let mins = ~~((time % 3600) / 60);
  let secs = ~~(time % 60);

  //default value
  var noValue = typeof noValue === "undefined" ? "Unknown" : noValue;

  result.innerHTML = `
  <h2><strong>${song["title"]}</strong> by ${
    song["artist-credit"][0]["name"]
  } </h2>
  <ul class="detail">
    <li>Release Year: <span>${
      song.hasOwnProperty("first-release-date")
        ? song["first-release-date"].slice(0, 4)
        : "Unknown"
    }</span></li>
    <li>Song Length: <span>${hrs >= 10 ? hrs : "0" + hrs.toString()}:${
    mins >= 10 ? mins : "0" + mins.toString()
  }:${secs >= 10 ? secs : "0" + secs.toString()}</span></li>
  <li>From the Album: <span>${song.releases[0].title || noValue}</span></li>
  <li>Group type: <span>${
    song["artist-credit"][0].artist.type || noValue
  }</span></li>
  <li>Artist type: <span>${
    song["artist-credit"][0].artist.disambiguation || noValue
  }</span<</li>
  </ul>
  <img src="${imageURL}" alt="${song["title"]}">`;
  more.innerHTML = `
  <button class="btn" onclick="searchSongs('${searchTerm}', ${offset})">Go Back</button>`;
}

//Event Listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value.trim();
  offset = 0;

  if (!searchTerm) {
    alert("Please enter a search term");
  } else {
    searchSongs(searchTerm, 0);
  }
});

//get lyrics button click
result.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const id = e.target.getAttribute("data-id");

    getInfo(id);
  }
});

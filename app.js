const authorization =
  "nPq6X2zH4L8li45eG8pNUwRwd3D4SfFciQiXWEyweCMbhij04vtIcT3s";
let fetchLink = "";
let searchValue = "";

// console.log(Boolean(searchValue));
let curatedPage = 1;
let searchPage = 1;
const gallery = document.querySelector(".gallery");
const form = document.querySelector(".search-form");
const searchInput = document.querySelector(".search-input");
const more = document.querySelector(".more");

searchInput.addEventListener("input", updateInput);
more.addEventListener("click", loadMore);

function updateInput(e) {
  searchValue = e.target.value;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchPhotos(searchValue);
});

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: authorization,
    },
  });
  const data = await dataFetch.json();
  // console.log(data);
  return data;
}

const generatePictures = (data) => {
  // console.log(data.photos);
  data.photos.forEach((photo) => {
    // console.log(photo);
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
  <div class="gallery-info">
  <p>${photo.photographer}</p>
  <a target="_blank" href="${photo.src.original}">Download</a>
  </div>
  <img src="${photo.src.original}"/>
  `;
    gallery.appendChild(galleryImg);
  });
};

async function searchPhotos(query) {
  // console.log(Boolean(searchValue));

  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;
  // console.log(fetchLink);
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

async function curatedPhotos() {
  fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
  // console.log(fetchLink);
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

function clear() {
  searchInput.value = "";
  gallery.innerHTML = "";
}
// console.log("fetchlink", fetchLink);

async function loadMore() {
  if (searchValue) {
    searchPage++;
    fetchLink = `https://api.pexels.com/v1/search?query=${searchValue}+query&per_page=15&page=${searchPage}`;
    // console.log(fetchLink);
  } else {
    curatedPage++;
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${curatedPage}`;
    // console.log(fetchLink);
  }
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

curatedPhotos();



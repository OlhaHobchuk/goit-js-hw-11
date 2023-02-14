// // 33499449-ef034a74262b4ba1fb6bf3d8d

import { ImageApiService } from "./api-sourse";
import { LoadButton } from "./loadButton";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";



const refs = {
    form: document.querySelector(".search-form"),
    galleryContainer: document.querySelector(".gallery"),
    infoItem: document.querySelectorAll(".info-item")
}

const imageApiService = new ImageApiService();
const loadButton = new LoadButton({
    selector: '.load-more',
isHidden: true});
let gallery = new SimpleLightbox('.gallery a');

console.log(loadButton);

refs.form.style.display = "flex";
refs.form.style.justifyContent = "center";
refs.form.style.padding = "20px";
refs.form.style.backgroundColor = "blue";


refs.galleryContainer.style.display = "flex";
refs.galleryContainer.style.flexWrap = "wrap";
refs.galleryContainer.style.gap = "30px";
refs.galleryContainer.style.display = "flex";
refs.galleryContainer.style.justifyContent = "space-between";
refs.galleryContainer.style.padding = "20px";




refs.form.addEventListener('submit', onFormSubmit);
loadButton.button.addEventListener('click', onLoadButtonClick);



function onFormSubmit(event) {
    
    event.preventDefault();
    imageApiService.query = event.currentTarget.elements.searchQuery.value.trim();

    if (!imageApiService.query) {
        Notiflix.Notify.warning("Please, enter something and try again!");
        return
    }

    
    imageApiService.resetPage();
    loadButton.show();
    onLoadButtonClick();
    clearGalleryContainer();
    
}



function onLoadButtonClick(event) {
    loadButton.disable();
    loadButton.show();
    return imageApiService
        .fetchImages()
        .then(data => {
            message(data);
            return data.hits
        })
        .then(makeMarkup).catch(error => { console.log(error);}).finally(() => {
        refs.form.reset();
        loadButton.enable();
    });
    
}

let markup = "";



function makeMarkup(hits) {
    const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = hits;
    

    if (!hits.length) {
        Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.");
        loadButton.hide();
        return
    }
    else {
        markup = hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
            return `<a href="${largeImageURL}"><div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes:</b>
      <span>${likes}<span>
    </p>
    <p class="info-item">
      <b>Views:</b>
      <span>${views}</span>
    </p>
    <p class="info-item">
      <b>Comments:</b>
      <span> ${comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads: </b>
      <span>${downloads}</span>
    </p>
  </div>
</div></a>`}).join('');

        refs.galleryContainer.innerHTML = markup;
    
    }
    return markup, gallery.refresh();
}

function message(data) {
  
    if (imageApiService.page == 2) {
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    }
  if (data.hits.length < imageApiService.perPage) {
    loadButton.hide();
    Notiflix.Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
  } 
  }


function clearGalleryContainer() {
    refs.galleryContainer.innerHTML = "";
}


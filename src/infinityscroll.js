import { ImageApiService } from "./api-sourse";

import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";



const refs = {
    form: document.querySelector(".search-form"),
    galleryContainer: document.querySelector(".gallery"),
  infoItem: document.querySelectorAll(".info-item"),
  guard: document.querySelector('.js-guard'),
}

const imageApiService = new ImageApiService();


let gallery = new SimpleLightbox('.gallery a');


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


function onFormSubmit(event) {
    
    event.preventDefault();
    imageApiService.query = event.currentTarget.elements.searchQuery.value.trim();

    if (!imageApiService.query) {
        Notiflix.Notify.warning("Please, enter something and try again!");
        return
    }
    
    imageApiService.resetPage();
    return imageApiService
        .fetchImages()
      .then(data => {
          observer.observe(refs.guard);
            message(data);
            return data.hits
        })
        .then(makeMarkup).catch(onError).finally(() => {
        refs.form.reset();
    });
    clearGalleryContainer();
    
}

function makeMarkup(hits) {
    const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = hits;
    let markup = "";

    markup = hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `<a href="${largeImageURL}" class="image-link"><div class="photo-card">
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

    refs.galleryContainer.insertAdjacentHTML("beforeend", markup);
    return markup, gallery.refresh();
}

function message(data) {
    if (imageApiService.page === 2) {
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`); 
    } else if (data.hits.length < imageApiService.perPage) {
      observer.observe(refs.guard);
    Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
    } 
    console.log(data.hits);
  }


function clearGalleryContainer() {
    refs.galleryContainer.innerHTML = "";
}

function onError(error) {
    console.log(error);
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
  
}

const details = {
    root: null,
    rootMargin: '300px',
  };
  const observer = new IntersectionObserver(onload, details);

let page = 1;

function onload(entries) {
    console.log(entries);
    entries.forEach(entry => {
        console.log('entry.isIntersecting', entry.isIntersecting);
        if (entry.isIntersecting) {
            page += 1;
            imageApiService
                .fetchImages()
                .then(data => {
                    observer.observe(refs.guard);
                    message(data);
                    return data.hits
                })
                .then(makeMarkup).catch(onError).finally(() => refs.form.reset())
        }})
       
    }
  
   


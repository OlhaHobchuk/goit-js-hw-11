function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},o=t.parcelRequired7c6;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var o={id:e,exports:{}};return n[e]=o,t.call(o.exports,o,o.exports),o.exports}var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,t){r[e]=t},t.parcelRequired7c6=o);var s=o("2RDrW");var a=o("7Y9D8"),i=o("fZKcF");const l={form:document.querySelector(".search-form"),galleryContainer:document.querySelector(".gallery"),infoItem:document.querySelectorAll(".info-item")},d=new(0,s.ImageApiService),c=new class{getButton(e){return document.querySelector(e)}hide(){this.button.classList.add("hidden")}show(){this.button.classList.remove("hidden")}disable(){this.button.disabled=!0,this.button.textContent="Loading..."}enable(){this.button.removeAttribute("disabled"),this.button.textContent="Load more"}constructor({selector:e,isHidden:t}){this.button=this.getButton(e),t?this.hide():this.show()}}({selector:".load-more",isHidden:!0});let u=new(e(i))(".gallery a");function f(e){const{webformatURL:t,largeImageURL:n,tags:r,likes:o,views:s,comments:a,downloads:i}=e;let d="";return d=e.map((({webformatURL:e,largeImageURL:t,tags:n,likes:r,views:o,comments:s,downloads:a})=>`<a href="${t}" class="image-link"><div class="photo-card">\n  <img src="${e}" alt="${n}" loading="lazy" />\n  <div class="info">\n    <p class="info-item">\n      <b>Likes:</b>\n      <span>${r}<span>\n    </p>\n    <p class="info-item">\n      <b>Views:</b>\n      <span>${o}</span>\n    </p>\n    <p class="info-item">\n      <b>Comments:</b>\n      <span> ${s}</span>\n    </p>\n    <p class="info-item">\n      <b>Downloads: </b>\n      <span>${a}</span>\n    </p>\n  </div>\n</div></a>`)).join(""),l.galleryContainer.insertAdjacentHTML("beforeend",d),u.refresh()}function y(t){2===d.page?e(a).Notify.success(`Hooray! We found ${t.totalHits} images.`):t.hits.length<d.perPage&&(c.hide(),e(a).Notify.warning("We're sorry, but you've reached the end of search results.")),console.log(t.hits)}function g(t){console.log(t),e(a).Notify.failure("Sorry, there are no images matching your search query. Please try again."),c.hide()}l.form.style.display="flex",l.form.style.justifyContent="center",l.form.style.padding="20px",l.form.style.backgroundColor="blue",l.galleryContainer.style.display="flex",l.galleryContainer.style.flexWrap="wrap",l.galleryContainer.style.gap="30px",l.galleryContainer.style.display="flex",l.galleryContainer.style.justifyContent="space-between",l.galleryContainer.style.padding="20px",l.form.addEventListener("submit",(function(t){if(t.preventDefault(),d.query=t.currentTarget.elements.searchQuery.value.trim(),!d.query)return void e(a).Notify.warning("Please, enter something and try again!");return d.resetPage(),c.show(),c.disable(),d.fetchImages().then((e=>(y(e),e.hits))).then(f).catch(g).finally((()=>{l.form.reset(),c.enable()}))})),c.button.addEventListener("click",(function(e){return c.disable(),c.show(),d.fetchImages().then((e=>(y(e),e.hits))).then(f).catch(g).finally((()=>{l.form.reset(),c.enable()}))}));
//# sourceMappingURL=load-button.edc49bf7.js.map

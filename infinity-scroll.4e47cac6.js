function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},t={},o=n.parcelRequired7c6;null==o&&((o=function(e){if(e in r)return r[e].exports;if(e in t){var n=t[e];delete t[e];var o={id:e,exports:{}};return r[e]=o,n.call(o.exports,o,o.exports),o.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,n){t[e]=n},n.parcelRequired7c6=o);var a=o("2RDrW"),s=o("7Y9D8"),l=o("fZKcF");const i={form:document.querySelector(".search-form"),galleryContainer:document.querySelector(".gallery"),infoItem:document.querySelectorAll(".info-item"),guard:document.querySelector(".js-guard")},c=new(0,a.ImageApiService);let f=new(e(l))(".gallery a");function g(e){const{webformatURL:n,largeImageURL:r,tags:t,likes:o,views:a,comments:s,downloads:l}=e;let c="";return c=e.map((({webformatURL:e,largeImageURL:n,tags:r,likes:t,views:o,comments:a,downloads:s})=>`<a href="${n}" class="image-link"><div class="photo-card">\n  <img src="${e}" alt="${r}" loading="lazy" />\n  <div class="info">\n    <p class="info-item">\n      <b>Likes:</b>\n      <span>${t}<span>\n    </p>\n    <p class="info-item">\n      <b>Views:</b>\n      <span>${o}</span>\n    </p>\n    <p class="info-item">\n      <b>Comments:</b>\n      <span> ${a}</span>\n    </p>\n    <p class="info-item">\n      <b>Downloads: </b>\n      <span>${s}</span>\n    </p>\n  </div>\n</div></a>`)).join(""),i.galleryContainer.insertAdjacentHTML("beforeend",c),f.refresh()}function u(n){2===c.page?e(s).Notify.success(`Hooray! We found ${n.totalHits} images.`):n.hits.length<c.perPage&&(y.observe(i.guard),e(s).Notify.warning("We're sorry, but you've reached the end of search results.")),console.log(n.hits)}function d(n){console.log(n),e(s).Notify.failure("Sorry, there are no images matching your search query. Please try again.")}i.form.style.display="flex",i.form.style.justifyContent="center",i.form.style.padding="20px",i.form.style.backgroundColor="blue",i.galleryContainer.style.display="flex",i.galleryContainer.style.flexWrap="wrap",i.galleryContainer.style.gap="30px",i.galleryContainer.style.display="flex",i.galleryContainer.style.justifyContent="space-between",i.galleryContainer.style.padding="20px",i.form.addEventListener("submit",(function(n){if(n.preventDefault(),c.query=n.currentTarget.elements.searchQuery.value.trim(),!c.query)return void e(s).Notify.warning("Please, enter something and try again!");return c.resetPage(),c.fetchImages().then((e=>(y.observe(i.guard),u(e),e.hits))).then(g).catch(d).finally((()=>{i.form.reset()}))}));const y=new IntersectionObserver((function(e){console.log(e),e.forEach((e=>{console.log("entry.isIntersecting",e.isIntersecting),e.isIntersecting&&(p+=1,c.fetchImages().then((e=>(y.observe(i.guard),u(e),e.hits))).then(g).catch(d).finally((()=>i.form.reset())))}))}),{root:null,rootMargin:"300px"});let p=1;
//# sourceMappingURL=infinity-scroll.4e47cac6.js.map

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryElemnts = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
let gallery = new SimpleLightbox('.gallery a');
const moreBtn = document.querySelector(".more-btn");

export function createGallery(images) {
    const markup = images.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => 
       `<li class="gallery-item">
            <a href="${largeImageURL}" class="gallery-link">
                <img src="${webformatURL}" alt="${tags}" class="gallery-image" />
                <p class="gallery-likes">Likes <span>${likes}</span></p>
                <p class="gallery-views">Views <span>${views}</span></p>
                <p class="gallery-comments">Comments <span>${comments}</span></p>
                <p class="gallery-downloads">Downloads <span>${downloads}</span></p>
            </a>
        </li>`
    ).join("");

    galleryElemnts.insertAdjacentHTML('beforeend', markup);
    gallery.refresh();
}

export function clearGallery() {
    galleryElemnts.innerHTML = "";
}

export function showLoader() {
    loader.classList.remove("hidden");
}

export function hideLoader() {
    loader.classList.add("hidden");
}

export function showLoadMoreButton() {
    moreBtn.classList.remove("hidden");
}

export function hideLoadMoreButton() {
    moreBtn.classList.add("hidden");
}
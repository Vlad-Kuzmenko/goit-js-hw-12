import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { getImagesByQuery } from "./js/pixabay-api"
import { createGallery, clearGallery, showLoader, hideLoader } from "./js/render-functions"

const form = document.querySelector(".form");


form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearGallery();
    const query = event.target.elements["search-text"].value.trim();
    
    event.target.elements["search-text"].value = "";

    if (query === "") {
        return iziToast.error({
            title: 'Error',
            message: `Sorry, your don't write anything. Please try again!`,
            color: 'yellow', 
        });
    }

    showLoader();

    getImagesByQuery(query).then(res => {
        const arr = res.data.hits;

        if (arr.length === 0) {
            hideLoader();
            return iziToast.error({
                title: 'Error',
                message: `Sorry, there are no images matching your search query ${query}. Please try again!`,
            });
        }

        hideLoader();
        createGallery(arr);
    }).catch(err => {
        hideLoader();
        iziToast.error({
            title: 'Error',
            message: `Something went wrong: ${err.message}`,
        })
    });
})


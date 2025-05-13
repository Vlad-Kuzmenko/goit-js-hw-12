import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { getImagesByQuery } from "./js/pixabay-api"
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from "./js/render-functions"

const form = document.querySelector(".form");
const moreBtn = document.querySelector(".more-btn");
let query;
let page = 1;


form.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearGallery();
    hideLoadMoreButton();
    page = 1;
    query = event.target.elements["search-text"].value.trim();
    
    event.target.elements["search-text"].value = "";

    if (query === "") {
        return iziToast.error({
            title: 'Error',
            message: `Sorry, your don't write anything. Please try again!`,
            color: 'yellow', 
        });
    }

    showLoader();

    try {
        const res = await getImagesByQuery(query, page);
        const total = res.totalHits;
        const arr = res.hits;

        if (arr.length === 0) {
            hideLoader();
            return iziToast.warning({
                title: 'Error',
                message: `Sorry, there are no images matching your search query ${query}. Please try again!`,
            });
        } 

        hideLoader();
        createGallery(arr);

        if (total <= (page * 15)) {
            hideLoader();
            hideLoadMoreButton();
            return iziToast.info({
                message: `We're sorry, but you've reached the end of search results.`,
            });
        }

        showLoadMoreButton();
        page++;
    }catch (err) {
        hideLoader();
        iziToast.error({
            title: 'Error',
            message: `Something went wrong: ${err.message}`,
        })
    };
})

moreBtn.addEventListener('click', async (event) => {
    hideLoadMoreButton();
    showLoader();
       
    try { 
        const res = await getImagesByQuery(query, page);
        const arr = res.hits;
        const total = res.totalHits;       
        const elem = document.querySelector(".gallery-item");
        const params = elem.getBoundingClientRect();

        if (arr.length === 0) {
            hideLoader();
            return iziToast.error({
                title: 'Error',
                message: `Sorry, there are no images matching your search query ${query}. Please try again!`,
            });
        }

        hideLoader();
        createGallery(arr);
        
        if (total <= (page * 15)) {
            hideLoader();
            hideLoadMoreButton();
            return iziToast.info({
                message: `We're sorry, but you've reached the end of search results.`,
            });
        }

        window.scrollBy({
            top: params.height * 2,
            behavior: "smooth",
        });

        page++;
        showLoadMoreButton();
    }catch (err) {
        hideLoader();
        iziToast.error({
            title: 'Error',
            message: `Something went wrong: ${err.message}`,
        })
    };
})
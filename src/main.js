import { fetchImages } from './js/pixabay-api.js';
import { renderImages, showError, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton, showEndOfResultsMessage } from './js/render-function.js';


let currentPage = 1;
let currentQuery = '';

document.getElementById('search-form').addEventListener('submit', async event => {
    event.preventDefault();
    currentQuery = document.getElementById('search-input').value.trim();

    if(!currentQuery){
        showError('Please enter a search term.');
        return;
    }

    currentPage = 1;
   hideLoadMoreButton();
    showLoader();

    try{
        const {hits, totalHits} = await fetchImages(currentQuery, currentPage);
        renderImages(hits);
        if(totalHits > hits.length){
            showLoadMoreButton()
        }
    } catch(error){
        showError('An error occurred while fetching images.');
        console.error(error);
    } finally{
        hideLoader();
    }
});

document.getElementById('load-more').addEventListener('click', async ()=>{
    currentPage++;
showLoader();
hideLoadMoreButton()

try{
    const {hits, totalHits}  = await fetchImages(currentQuery, currentPage);
    renderImages(hits, true);
    const displayedImages = document.querySelectorAll('.image-item').length;
    if(displayedImages < totalHits){
        showLoadMoreButton()
    } else {
        showEndOfResultsMessage();
    }
     const gallery = document.querySelector('.image-item');
     if(gallery){
        const galleryHeight = gallery.getBoundingClientRect().height;
        window.scrollBy({
            top: galleryHeight * 2,
            behavior: 'smooth'
        });
     }
} catch(eror){
    showError('An error occurred while fetching images.');
    console.error(error);
}finally{
    hideLoader();
}

})
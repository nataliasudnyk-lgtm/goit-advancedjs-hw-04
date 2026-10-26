import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';

import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const searchButton = form.querySelector('button[type="submit"]');
const loadMoreButton = document.querySelector('.load-more');

const PER_PAGE = 15;

let currentQuery = '';
let currentPage = 1;
let totalLoadedImages = 0;
let isLoading = false;

// Handle a new image search.
form.addEventListener('submit', async event => {
  event.preventDefault();

  if (isLoading) {
    return;
  }

  const query = form.elements['search-text'].value.trim();

  if (!query) {
    iziToast.warning({
      message: 'Please enter a search query!',
      position: 'topRight',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  totalLoadedImages = 0;

  clearGallery();
  hideLoadMoreButton();

  await loadImages(false);
});

// Handle loading the next page of images.
loadMoreButton.addEventListener('click', async () => {
  if (isLoading || !currentQuery) {
    return;
  }

  await loadImages(true);
});

// Fetch images and update the gallery.
async function loadImages(isLoadMore) {
  isLoading = true;

  showLoader();
  hideLoadMoreButton();
  searchButton.disabled = true;

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    const images = data.hits;

    if (images.length === 0) {
      if (isLoadMore) {
        showEndOfCollectionMessage();
      } else {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
      }

      return;
    }

    createGallery(images);

    totalLoadedImages += images.length;
    currentPage += 1;

    // Scroll down after rendering an additional page.
    if (isLoadMore) {
      scrollGallery();
    }

    // Check whether more images are available.
    if (totalLoadedImages >= data.totalHits || images.length < PER_PAGE) {
      hideLoadMoreButton();
      showEndOfCollectionMessage();
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later!',
      position: 'topRight',
    });

    // Allow retrying the same page after a failed request.
    if (isLoadMore) {
      showLoadMoreButton();
    }
  } finally {
    hideLoader();
    searchButton.disabled = false;
    isLoading = false;
  }
}

// Notify the user when no more results are available.
function showEndOfCollectionMessage() {
  iziToast.info({
    message: "We're sorry, but you've reached the end of search results.",
    position: 'topRight',
  });
}

// Smoothly scroll after loading more images.
function scrollGallery() {
  const galleryItem = document.querySelector('.gallery-item');

  if (!galleryItem) {
    return;
  }

  const { height } = galleryItem.getBoundingClientRect();

  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}

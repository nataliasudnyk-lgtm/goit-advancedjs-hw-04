import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// Create image cards and refresh the lightbox.
export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <li class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}">
            <img
              class="gallery-image"
              src="${webformatURL}"
              alt="${tags}"
              loading="lazy"
            />
          </a>

          <div class="gallery-info">
            <div class="info-item">
              <p class="info-label">Likes</p>
              <p class="info-value">${likes}</p>
            </div>

            <div class="info-item">
              <p class="info-label">Views</p>
              <p class="info-value">${views}</p>
            </div>

            <div class="info-item">
              <p class="info-label">Comments</p>
              <p class="info-value">${comments}</p>
            </div>

            <div class="info-item">
              <p class="info-label">Downloads</p>
              <p class="info-value">${downloads}</p>
            </div>
          </div>
        </li>
      `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

// Remove previous search results.
export function clearGallery() {
  gallery.innerHTML = '';
}

// Show the loading indicator.
export function showLoader() {
  loader.classList.remove('is-hidden');
}

// Hide the loading indicator.
export function hideLoader() {
  loader.classList.add('is-hidden');
}

const loadMoreButton = document.querySelector('.load-more');

// Show the Load more button.
export function showLoadMoreButton() {
  loadMoreButton.classList.remove('is-hidden');
}

// Hide the Load more button.
export function hideLoadMoreButton() {
  loadMoreButton.classList.add('is-hidden');
}

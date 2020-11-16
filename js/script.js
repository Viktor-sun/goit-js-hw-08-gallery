import galleryItems from '../gallery-items.js';

const galleryRef = document.querySelector('.js-gallery');
const lightbox = document.querySelector('.js-lightbox');
const buttonCloseRef = document.querySelector(
  'button[data-action="close-lightbox"]',
);
const imgModalRef = lightbox.querySelector('.lightbox__image');
const lightboxOverlay = lightbox.querySelector('.lightbox__overlay');

galleryRef.addEventListener('click', onOpenModal);
buttonCloseRef.addEventListener('click', onCloseModal);
lightboxOverlay.addEventListener('click', onOverlayClick);

let currentIndexImg = null;

function onOpenModal(event) {
  event.preventDefault();
  window.addEventListener('keydown', onPressEscape);
  window.addEventListener('keydown', onPressArrowLeftAndArrowRight);
  if (event.target.nodeName !== 'IMG') return;
  lightbox.classList.add('is-open');
  imgModalRef.src = event.target.dataset.source;
  imgModalRef.alt = event.target.alt;

  currentIndexImg = Number(event.target.dataset.index);
}

function onCloseModal() {
  window.removeEventListener('keydown', onPressEscape);
  window.removeEventListener('keydown', onPressArrowLeftAndArrowRight);
  lightbox.classList.remove('is-open');
  imgModalRef.src = '';
  imgModalRef.alt = '';
}

function onOverlayClick(event) {
  if (event.target === event.currentTarget) {
    onCloseModal();
  }
}

function onPressEscape(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}

function onPressArrowLeftAndArrowRight(event) {
  let index;

  if (event.code === 'ArrowLeft') {
    index = currentIndexImg -= 1;
  }
  if (event.code === 'ArrowRight') {
    index = currentIndexImg += 1;
  }
  if (index < 0 || index > galleryItems.length - 1) return;
  imgModalRef.src = galleryItems[index].original;
  imgModalRef.alt = galleryItems[index].description;
}

// const getTemplate = ({ preview, original, description }, i) => {
//   const li = document.createElement('li');
//   li.classList.add('gallery__item');

//   const a = document.createElement('a');
//   a.classList.add('gallery__link');
//   a.setAttribute('href', original);

//   const img = document.createElement('img');
//   img.classList.add('gallery__image');
//   img.setAttribute('src', preview);
//   img.dataset.source = original;
//   img.setAttribute('alt', description);
//   img.dataset.index = i;

//   a.appendChild(img);
//   li.appendChild(a);
//   return li;
// };

// const arrElements = galleryItems.map((object, index) =>
//   getTemplate(object, index),
// );
// galleryRef.append(...arrElements);

// ===============================================
// ленивая загрузка
const getTemplate = array => {
  return array
    .map(
      (object, i) =>
        `<li class="gallery__item">
      <a
        class="gallery__link"
        href="${object.original}"
      >
        <img
          class="gallery__image"
          src=""
          data-lazy="${object.preview}"
          data-index="${i}"
          data-source="${object.original}"
          alt="${object.description}"
        />
      </a>
    </li>`,
    )
    .join('');
};

const template = getTemplate(galleryItems);
const innerLiToElement = galleryRef.insertAdjacentHTML('beforeend', template);

const images = document.querySelectorAll('img[data-lazy]');

const onEntry = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.src = entry.target.dataset.lazy;

      observer.unobserve(entry.target);
    }
  });
};

const options = {
  rootMargin: '20px',
};

const io = new IntersectionObserver(onEntry, options);

images.forEach(image => io.observe(image));

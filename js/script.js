import galleryItems from "../gallery-items.js";

const galleryRef = document.querySelector(".js-gallery");
const lightbox = document.querySelector(".js-lightbox");
const buttonCloseRef = document.querySelector(
  'button[data-action="close-lightbox"]'
);
const imgModalRef = lightbox.querySelector(".lightbox__image");

galleryRef.addEventListener("click", onOpenModal);
buttonCloseRef.addEventListener("click", onCloseModal);

function onOpenModal(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") return;
  lightbox.classList.add("is-open");
  imgModalRef.src = event.target.dataset.source;
  imgModalRef.alt = event.target.alt;
}

function onCloseModal() {
  lightbox.classList.remove("is-open");
  imgModalRef.src = "";
  imgModalRef.alt = "";
}

const getTemplate = (obj) => {
  const li = document.createElement("li");
  li.classList.add("gallery__item");

  const a = document.createElement("a");
  a.classList.add("gallery__link");
  a.setAttribute("href", obj.original);

  const img = document.createElement("img");
  img.classList.add("gallery__image");
  img.setAttribute("src", obj.preview);
  img.dataset.source = obj.original;
  img.setAttribute("alt", obj.description);

  a.appendChild(img);
  li.appendChild(a);
  return li;
};

const arrElements = galleryItems.map((object) => getTemplate(object));
galleryRef.append(...arrElements);

// const innerLiToElement = (array, element) => {
//   array.forEach((object) =>
//     element.insertAdjacentHTML(
//       "beforeend",
//       `<li class="gallery__item">
//       <a
//         class="gallery__link"
//         href="${object.original}"
//       >
//         <img
//           class="gallery__image"
//           src="${object.preview}"
//           data-source="${object.original}"
//           alt="${object.description}"
//         />
//       </a>
//     </li>`
//     )
//   );
// };

// innerLiToElement(galleryItems, galleryRef);

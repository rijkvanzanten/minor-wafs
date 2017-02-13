/* global document */

export function setBackgroundImage(imgObj) {
  const imageElement = document.querySelector('body > img');
  imageElement.srcset = `${imgObj.url} 960w, ${imgObj.hdurl} 1200w`;
  imageElement.addEventListener('load', () =>
    imageElement.setAttribute('data-loading', false));
}

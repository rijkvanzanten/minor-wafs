/* global document */

export default {

  /**
   * Create background image element
   * @param {Object} img image meta info object
   * @returns {HTMLElement} image html element
   */
  backgroundImage(img) {
    const imageElement = document.createElement('img');

    imageElement.srcset = `${img.url} 960w, ${img.hdurl} 1500w`;
    imageElement.addEventListener('load', () =>
      imageElement.setAttribute('data-loading', false));

    return imageElement;
  },

  /**
   * Create asteroid list section html
   * @param {String} date Date to display in section divider header
   * @param {String} html Html string of children elements
   * @returns {String} html element for single list item
   */
  listSection(date, html) {
    return `
      <li>
        <time datetime="${date}">${date}</time>
        ${html}
      </li>
    `;
  },

  /**
   * Create single list item
   * @param {Object} asteroid Asteroid meta info object
   * @returns {String} Html element
   */
  listItem(asteroid) {
    const size = Math.random() * 50 + 10;
    return `
      <article data-hazardous="${asteroid.is_potentially_hazardous_asteroid}">
        <a href="#asteroid/${asteroid.neo_reference_id}">
          ${this.asteroidSvg(size)}
          <div>
            <h2>${asteroid.name}</h2>
            <p>${asteroid.neo_reference_id}</p>
          </div>
        </a>
      </article>
    `;
  },

  asteroidSvg(size) {
    const rotation = Math.floor(Math.random() * 360);

    const asteroids = [
      `<svg style="transform: rotate(${rotation}deg); height: ${size}px" viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-miterlimit:1.5;"><path d="M6.438,1.737l4.089,5.082l5.687,-4.971l4.517,4.477l-1.822,4.827l1.641,4.231l-6.271,5.674l-7.555,0l-5.065,-5.412l0.021,-9.142l4.758,-4.766Z" style="fill:none;stroke:#fff;stroke-width:0.9px;"/></svg>`,
      `<svg style="transform: rotate(${rotation}deg); height: ${size}px" viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-miterlimit:1.5;"><path d="M6.173,1.521l7.785,0.137l6.775,4.385l-0.136,2.692l-6.273,2.467l6.289,4.358l-4.954,4.993l-2.197,-2.549l-7.151,2.898l-5.094,-7.125l0.299,-7.411l7.406,0.056l-2.749,-4.901Z" style="fill:none;stroke:#fff;stroke-width:0.9px;"/></svg>`,
      `<svg style="transform: rotate(${rotation}deg); height: ${size}px" viewBox="0 0 23 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-miterlimit:1.5;"><path d="M7.08,1.431l4.531,3.171l5.009,-2.709l5.231,5.145l-5.148,1.448l4.212,5.389l-4.857,7.161l-6.437,-2.371l-2.993,2.211l-4.759,-4.529l2.61,-4.952l-3.005,-4.932l5.606,-5.032Z" style="fill:none;stroke:#fff;stroke-width:0.9px;"/></svg>`
    ];

    return asteroids[Math.floor(Math.random() * asteroids.length)];
  },

  toggleOverlay() {
    const overlayElement = document.querySelector('.single-asteroid');
    overlayElement.hidden = !overlayElement.hidden;
  },

  /**
   * Render html to dom
   * @param {HTMLElement} rootElement Element to render html in
   * @param {String|HTMLElement} element Element to render to rootElement
   * @returns {Boolean} Success
   */
  toDom(rootElement, element) {
    if(typeof element === 'string') {
      rootElement.innerHTML += element;
      return true;
    }

    if(typeof element === 'object') {
      rootElement.append(element);
      return true;
    }

    return false;
  }
};

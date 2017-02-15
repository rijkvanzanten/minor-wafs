/* global window, document, fetch */

import utils from './utils.js';
import router from './router.js';

(function() {
  const app = {
    store: {
      asteroids: {},
      minSize: 0,
      maxSize: 0,
      flattenedAsteroids: []
    },

    /**
     * Initialize the app
     */
    init() {
      this.getImageOfTheDay();
      this.getAsteroids();

      router
        .add(/asteroid\/(.*)/, id => {
          render.toggleOverlay();
        })
        // .add(/home/, () => render.toggleOverlay())
        .listen();
    },

    /**
     * Fetch NASA's APOD and render to DOM
     */
    getImageOfTheDay() {
      // Get background image from NASA image of the day
      fetch(
        'https://api.nasa.gov/planetary/apod?api_key=lNMbOmip78PkrKx5w0VAjKIIAB2zAAGca8DXk2c6'
      )
        .then(res => res.json())
        // Render image to DOM
        .then(res => render.backgroundImage(res))
        .then(imgElement => render.toDom(document.body, imgElement))
        // TODO: improve error handling
        .catch(err => console.error(err)); // eslint-disable-line
    },

    /**
     * Fetch the nearest asteroids based on current date
     */
    getAsteroids() {
      fetch(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${utils.formatDate(
          new Date()
        )}&api_key=lNMbOmip78PkrKx5w0VAjKIIAB2zAAGca8DXk2c6`
      )
        .then(res => res.json())
        .then(res => res.near_earth_objects)
        .then(res => {
          this.store.asteroids = res;
          this.store.flattenedAsteroids = [].concat(
            ...Object.keys(res).map(key => res[key])
          );

          this.store.minSize = Math.min(
            ...this.store.flattenedAsteroids.map(
              asteroid =>
                asteroid.estimated_diameter.meters.estimated_diameter_max -
                  asteroid.estimated_diameter.meters.estimated_diameter_min
            )
          );
          this.store.maxSize = Math.max(
            ...this.store.flattenedAsteroids.map(
              asteroid =>
                asteroid.estimated_diameter.meters.estimated_diameter_max -
                  asteroid.estimated_diameter.meters.estimated_diameter_min
            )
          );
          return res;
        })
        .then(res => render.toDom(
          document.querySelector('.asteroid-list'),
          Object.keys(res)
            .sort((a, b) => new Date(a) - new Date(b))
            .map(key => {
              return render.listSection(
                key,
                res[key]
                  .map(asteroid => render.listItem(asteroid))
                  .reduce((html, listItem) => html += listItem)
              );
            })
            .reduce((html, listSectionElement) => html += listSectionElement)
        ))
        .catch(err => console.error(err));
    }
  };

  const render = {
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
      const size = Math.floor(
        asteroid.estimated_diameter.meters.estimated_diameter_max -
          asteroid.estimated_diameter.meters.estimated_diameter_min
      );

      const pixelSize = utils.rangeScale(
        app.store.minSize,
        app.store.maxSize,
        10,
        60,
        size
      );

      return `
        <article data-hazardous="${asteroid.is_potentially_hazardous_asteroid}">
          <a href="#asteroid/${asteroid.neo_reference_id}">
            ${this.asteroidSvg(pixelSize)}
            <div>
              <h2>${asteroid.name}</h2>
              <p>${asteroid.neo_reference_id}</p>
            </div>
          </a>
        </article>
      `;
    },

    /**
     * Create asteroid svg based on given size
     * @param {Number} size SVG size in PX
     */
    asteroidSvg(size) {
      const rotation = Math.floor(Math.random() * 360);

      const asteroids = [
        `<svg style="transform: rotate(${rotation}deg); height: ${size}px" viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-miterlimit:1.5;"><path d="M6.438,1.737l4.089,5.082l5.687,-4.971l4.517,4.477l-1.822,4.827l1.641,4.231l-6.271,5.674l-7.555,0l-5.065,-5.412l0.021,-9.142l4.758,-4.766Z" style="fill:none;stroke:#fff;stroke-width:0.9px;"/></svg>`,
        `<svg style="transform: rotate(${rotation}deg); height: ${size}px" viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-miterlimit:1.5;"><path d="M6.173,1.521l7.785,0.137l6.775,4.385l-0.136,2.692l-6.273,2.467l6.289,4.358l-4.954,4.993l-2.197,-2.549l-7.151,2.898l-5.094,-7.125l0.299,-7.411l7.406,0.056l-2.749,-4.901Z" style="fill:none;stroke:#fff;stroke-width:0.9px;"/></svg>`,
        `<svg style="transform: rotate(${rotation}deg); height: ${size}px" viewBox="0 0 23 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-miterlimit:1.5;"><path d="M7.08,1.431l4.531,3.171l5.009,-2.709l5.231,5.145l-5.148,1.448l4.212,5.389l-4.857,7.161l-6.437,-2.371l-2.993,2.211l-4.759,-4.529l2.61,-4.952l-3.005,-4.932l5.606,-5.032Z" style="fill:none;stroke:#fff;stroke-width:0.9px;"/></svg>`
      ];

      return asteroids[Math.floor(Math.random() * asteroids.length)];
    },

    /**
     * Disable or enable asteroid overlay
     */
    toggleOverlay() {
      const overlayElement = document.querySelector('.single-asteroid-overlay');
      overlayElement.hidden = !overlayElement.hidden;
    },

    /**
     * Render html to dom
     * @param {HTMLElement} rootElement Element to render html in
     * @param {String|HTMLElement} element Element to render to rootElement
     * @returns {Boolean} Success
     */
    toDom(rootElement, element) {
      if (typeof element === 'string') {
        rootElement.innerHTML += element;
        return true;
      }

      if (typeof element === 'object') {
        rootElement.append(element);
        return true;
      }

      return false;
    }
  };

  app.init();
})();

/* global window, document, fetch */

import utils from './utils.js';
import render from './render.js';
import router from './router.js';

(function() {
  const app = {

    /**
     * Initialize the app
     */
    init() {
      this.getImageOfTheDay();
      this.getAsteroids();

      router.init();
    },

    /**
     * Fetch NASA's APOD and render to DOM
     */
    getImageOfTheDay() {
      // Get background image from NASA image of the day
      fetch('https://api.nasa.gov/planetary/apod?api_key=lNMbOmip78PkrKx5w0VAjKIIAB2zAAGca8DXk2c6')
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
      fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${utils.formatDate(new Date())}&api_key=lNMbOmip78PkrKx5w0VAjKIIAB2zAAGca8DXk2c6`)
        .then(res => res.json())
        .then(res => res.near_earth_objects)
        .then(res =>
          render.toDom(
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
          )
        );
    }
  };

  app.init();

})();

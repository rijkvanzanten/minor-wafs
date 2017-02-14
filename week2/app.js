/* global document, fetch */

(function() {

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
      return `
        <article data-hazardous="${asteroid.is_potentially_hazardous_asteroid}">
          <a href="#asteroid/${asteroid.neo_reference_id}">
            <h2>${asteroid.name}</h2>
            <p>${asteroid.neo_reference_id}</p>
          </a>
        </article>
      `;
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

  const routes = {

  };

  const utils = {

    /**
     * Format date to YYYY-MM-DD
     * @param {Object} date Date object to format
     * @returns {String} Formatted date
     */
    formatDate(date) {
      return `${date.getFullYear()}-${this.addLeadingZero(date.getMonth() + 1)}-${this.addLeadingZero(date.getDate())}`;
    },

    /**
     * Add leading zero
     * Ideal for formatting parts of dates like the day of the month (2 => 02)
     * @param {Number|String} number Number to append 0 to
     * @returns {String} formatted number
     */
    addLeadingZero(number) {
      return ('0' + number).slice(-2);
    }
  };

  const app = {

    /**
     * Initialize the app
     */
    init() {
      this.getImageOfTheDay();
      this.getAsteroids();
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

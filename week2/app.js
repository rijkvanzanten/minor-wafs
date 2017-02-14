/* global fetch, document */

import { component, render } from './templater.js';

(function() {

  // Get and set background-image
  fetch('https://api.nasa.gov/planetary/apod?api_key=lNMbOmip78PkrKx5w0VAjKIIAB2zAAGca8DXk2c6')
    .then(res => res.json())
    .then(res => {
      const imageElement = document.querySelector('body > img');

      // add image urls to sourceset
      imageElement.srcset = `${res.url} 960w, ${res.hdurl} 1200w`;

      // Add event listener which changes data attribute on image load
      imageElement.addEventListener('load', () =>
        imageElement.setAttribute('data-loading', false));
    })
    .catch(err => console.error(err)); // TODO: improve error handling

  fetch(
    `https://api.nasa.gov/neo/rest/v1/feed?start_date=${formatDate(new Date())}&api_key=lNMbOmip78PkrKx5w0VAjKIIAB2zAAGca8DXk2c6`
  )
    .then(res => res.json())
    .then(res => {
      render(
        document.querySelector('.asteroid-list'),
        ...createAsteroidList(res)
      );
    });

  /**
   * Formats date to YYYY-MM-DD
   * @param  {Object} date Date object to format
   * @return {String} Formatted date
   */
  function formatDate(date) {
    return `${date.getFullYear()}-${addLeadingZero(date.getMonth() + 1)}-${addLeadingZero(date.getDate())}`;
  }

  /**
   * Adds leading 0 to string if string.length < 2
   * @param {Number} number or String to append 0 to
   * @returns {String}
   */
  function addLeadingZero(number) {
    return ('0' + number).slice(-2);
  }

  function createAsteroidList(res) {
    return Object.keys(res.near_earth_objects)
      .sort((a, b) => new Date(a) - new Date(b))
      .map(key => {
        const li = component('li');
        const time = component('time', { datetime: key });

        const articles = res.near_earth_objects[key]
          .map(asteroid => createAsteroidElement(asteroid));

        return (
          li(
            time(new Date(key)),
            ...articles
          )
        );
      }
    );
  }

  function createAsteroidElement(asteroid) {
    const article = component('article', { 'data-hazardous': asteroid.is_potentially_hazardous_asteroid });
    const a = component('a', { href: '/asteroid/' + asteroid.neo_reference_id });
    const h2 = component('h2');
    const p = component('p');

    return (
      article(
        a(
          h2(asteroid.name),
          p(asteroid.neo_reference_id)
        )
      )
    );
  }

})();

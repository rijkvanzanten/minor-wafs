/* global fetch, document */
import { component, render } from './templater.js';

const now = new Date();

// Get and set background-image
fetch(
  'https://api.nasa.gov/planetary/apod?api_key=lNMbOmip78PkrKx5w0VAjKIIAB2zAAGca8DXk2c6'
)
  .then(res => res.json())
  .then(res => {
    const imageElement = document.querySelector('body > img');
    imageElement.srcset = `${res.url} 960w, ${res.hdurl} 1200w`;
    imageElement.addEventListener('load', () =>
      imageElement.setAttribute('data-loading', false));
  })
  .catch(err => console.error(err)); // TODO: improve error handling

fetch(
  `https://api.nasa.gov/neo/rest/v1/feed?start_date=${now.getFullYear()}-${addLeadingZero(
    now.getMonth() + 1
  )}-${addLeadingZero(
    now.getDate()
  )}&api_key=lNMbOmip78PkrKx5w0VAjKIIAB2zAAGca8DXk2c6`
)
  .then(res => res.json())
  .then(res => {
    render(
      document.body,
      component('ol', { class: 'asteroid-list' })(
        ...Object.keys(res.near_earth_objects).map(date =>
          component('li')(
            component('time', { datetime: date })(date),
            ...res.near_earth_objects[date].map(asteroid =>
              component('article')(asteroid.name))
          ))
      )
    );
  });

function addLeadingZero(number) {
  return ('0' + number).slice(-2);
}

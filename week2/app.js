/* global fetch, document */
import { component, render } from './templater.js';

const now = new Date();

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
  `https://api.nasa.gov/neo/rest/v1/feed?start_date=${now.getFullYear()}-${addLeadingZero(
    now.getMonth() + 1
  )}-${addLeadingZero(
    now.getDate()
  )}&api_key=lNMbOmip78PkrKx5w0VAjKIIAB2zAAGca8DXk2c6`
)
  .then(res => res.json())
  .then(res => {
    render(
      document.querySelector('.asteroid-list'),
      ...Object.keys(res.near_earth_objects)
        .sort((a, b) => new Date(a) - new Date(b))
        .map(key =>
          component('li')(
            component('time', { datetime: key })(new Date(key)),
            ...res.near_earth_objects[key]
              .map(asteroid =>
                component('article', { 'data-hazardous': asteroid.is_potentially_hazardous_asteroid })(
                  component('a', { href: '/asteroid/' + asteroid.neo_reference_id })(
                    component('h2')(asteroid.name),
                    component('p')(asteroid.neo_reference_id)
                  )
                )
            )
          )
      )
    );
  });

function addLeadingZero(number) {
  return ('0' + number).slice(-2);
}

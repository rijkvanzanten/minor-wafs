/* global fetch */
import { setBackgroundImage } from './templater.js';

fetch('https://api.nasa.gov/planetary/apod?api_key=lNMbOmip78PkrKx5w0VAjKIIAB2zAAGca8DXk2c6')
  .then(res => res.json())
  .then(res => {
    setBackgroundImage(res);
  })
  .catch(err => console.error(err)); // TODO: improve error handling

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

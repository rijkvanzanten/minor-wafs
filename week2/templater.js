/* global document */

export function component(tag, attributes = {}) {
  // Create elementNode
  const element = document.createElement(tag);

  // Add attributes to element
  Object.keys(attributes).forEach(key => {
    element.setAttribute(key, attributes[key]);
  });

  // Return function which accepts child elements array
  return (...children) => {
    children.forEach(child => {
      // If given child is a string, append as textNode. Else, append child element
      if (typeof child === 'string') {
        element.append(document.createTextNode(child));
      } else {
        element.append(child);
      }
    });

    return element;
  };
}

export function render(rootEl, el) {
  rootEl.append(el);
}

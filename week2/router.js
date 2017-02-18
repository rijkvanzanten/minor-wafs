/* global window, location */

/**
 * Loosely based on Krasimir Tsonevs 100-line router
 *
 * http://krasimirtsonev.com/blog/article/A-modern-JavaScript-router-in-100-lines-history-api-pushState-hash-url
 */

/**
 * Usage:
 *
 * Router
 *  .add(/about/, () => console.log('about'))
 *  .add(/page\/(.*)/, id => console.log('page: ' + id))
 *  .listen();
 */

const Router = {
  routes: [],
  root: '/',

  /**
   * Get fragment of url string
   */
  getFragment() {
    const match = location.href.match(/#(.*)$/);
    const fragment = match ? match[1] : '';
    return this.clearSlashes(fragment);
  },

  /**
   * Removes / from beginning and end of string
   * @param {String} path String to remove slashed from
   */
  clearSlashes(path) {
    return path.toString().replace(/\/$/, '').replace(/^\//, '');
  },

  /**
   * Add route to routes array for later usage
   * @param {Regex} regex Regular expression to check route with
   * @param {Function} handler Callback function when route is called
   */
  add(regex, handler) {
    if (typeof regex == 'function') {
      handler = regex;
      regex = '';
    }
    this.routes.push({
      regex,
      handler
    });
    return this;
  },

  /**
   * Match fragment to handler function
   * @param {String} f URL fragment
   */
  check(f) {
    const fragment = f || this.getFragment();
    this.routes.forEach(route => {
      const match = fragment.match(route.regex);
      if (match) {
        match.shift();
        route.handler.apply({}, match);
        return this;
      }
      return this;
    });
  },

  /**
   * Add the hashchange eventlistener and check on change
   */
  listen() {
    window.addEventListener('hashchange', () => {
      this.check(this.getFragment());
    });
  }
};

export default Router;

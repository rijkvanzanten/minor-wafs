/* global geo_position_js google window */

/**
 * GeoLocator constructor
 *
 * Usage: new GeoLocator(options: Object, locations: Array);
 * @param options [object] set options (only refreshRate atm)
 * @param locations [array] array of {lat: String, lon: String} objects
 */
const GeoLocator = (function() { // eslint-disable-line no-unused-vars

  /**
   * Emitter object
   *
   * Allows for custom events and event listeners
   * Loosely based on [Mitt](https://github.com/developit/mitt/blob/master/src/index.js)
   */
  const emitter = {
    all: {},
    list(type) {
      const t = type.toLowerCase();
      return this.all[t] || (this.all[t] = []);
    },
    on(type, handler) {
      this.list(type).push(handler);
    },
    off(type, handler) {
      const e = this.list(type);
      const i = e.indexOf(handler);
      if(~i) e.splice(i, 1);
    },
    emit(type, event) {
      this.list('*').concat(this.list(type)).forEach(f => { f(event); });
    }
  };

  // Return object creator for GeoLocator object
  return function GeoLocator(options, locations) {
    function startInterval() {
      this.updatePosition();
      setInterval(updatePosition, this.options.refreshRate || 1000);
      emitter.on('POSITION_UPDATED', checkLocations);
    }

    function updatePosition() {
      this.intervalCounter++;
      geo_position_js.getCurrentPosition(setPosition);
    }

    function setPosition(position) {
      this.currentPosition = position;
      emitter.emit('POSITION_UPDATED');
    }

    function checkLocations() {
      this.locations.forEach(location => {
        if(calculateDistance(location, this.currentPosition) < location.distance) {
          if(window.location !== location.url) window.location = location.url;
        }
      });
    }

    function calculateDistance(p1, p2) {
      const pos1 = new google.maps.LatLng(p1.coords.latitude, p1.coords.longitude);
      const pos2 = new google.maps.LatLng(p2.coords.latitude, p2.coords.longitude);
      return Math.round(google.maps.geometry.spherical.computeDistanceBetween(pos1, pos2), 0);
    }

    this.options = options;
    this.intervalCounter = 0;
    this.currentPosition = '';
    this.locations = locations;

    geo_position_js.init() ? startInterval() : console.error('Geen geolocatie beschikbaar'); // eslint-disable-line no-console
  };
}());

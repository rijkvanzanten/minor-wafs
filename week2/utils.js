export default {

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
  },

  rangeScale(min, max, a, b, x) {
    return ((b - a) * (x - min)) / (max - min) + a;
  }
};

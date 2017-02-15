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

  /**
   * Convert number from one scale to another
   * based on this mathematical function:
   *        (b - a)(x - min)
   * f(x) = ---------------- + a
   *          (max - min)
   *
   * @param {Number} min Original scale minimum
   * @param {Number} max Original scale maximum
   * @param {Number} a Target scale minimum
   * @param {Number} b Target scale maximum
   * @param {Number} x Original number to convert
   */
  rangeScale(min, max, a, b, x) {
    return ((b - a) * (x - min)) / (max - min) + a;
  }
};

export default {
  routes: {},
  init() {
    window.addEventListener('hashchange', () => console.log('yay'));
  }
};

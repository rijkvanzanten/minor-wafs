/* global window document */

window.onload = function() {
  if(!window.location.hash.length) window.location.hash = '#home';
};

// 'use strict';
//
// (function() {
//   const app = {
//     init() {
//       routes.init();
//       sections.init('#best-practices');
//     }
//   };
//
//   const routes = {
//     init() {
//       window.addEventListener('hashchange', () => sections.toggle(window.location.hash));
//     }
//   };
//
//   const sections = {
//     init(route) {
//       document.querySelector(route).classList.add('hidden');
//     },
//     toggle(route) {
//       document.querySelectorAll('section').forEach(section => section.classList.add('hidden'));
//       document.querySelector(route).classList.remove('hidden');
//     }
//   };
//
//   app.init();
// })();

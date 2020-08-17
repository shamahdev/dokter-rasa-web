import 'regenerator-runtime'; /* for async await transpile */
import 'styles/main.sass';
import App from '@/views/app.js';
import swRegister from '@/utils/sw-register';

const app = new App({
  hamburger: document.querySelector('#hamburger'),
  drawer: document.querySelector('#drawer'),
  content: document.querySelector('main'),
});

window.addEventListener('hashchange', () => {
  app.loadPage();
});

window.addEventListener('load', () => {
  app.loadPage();
  swRegister();
});

// const main = _ => {

//     window.onscroll = _ => {
//         const toTop = document.querySelector(".back-to-top");
//         if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
//             toTop.classList.add("show-to-top");
//         } else {
//             toTop.classList.remove("show-to-top");
//         }
//     };
// }

// document.addEventListener("DOMContentLoaded", main);

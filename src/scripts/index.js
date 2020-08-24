import 'regenerator-runtime';
import App from '@/views/app.js';
import swRegister from '@/utils/sw-register';
import '@/components/navigation-drawer';
import '@/components/skipto-main';
import '@/components/to-top';
import 'styles/main.sass';

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


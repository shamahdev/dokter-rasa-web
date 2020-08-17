import '@/components/loading-spinner';
import UrlParser from '@/routes/urlparser';
import Routes from '@/routes/routes';
import NavigationDrawer from '@/utils/navigation-drawer-init';


class App {
  constructor({hamburger, drawer, content}) {
    this._hamburger = hamburger;
    this._drawer = drawer;
    this._content = content;

    this._initialAppShell();
  }

  _initialAppShell() {
    NavigationDrawer.init({
      hamburger: this._hamburger,
      drawer: this._drawer,
      content: this._content,
    });
  }
  async loadPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = await Routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();
  }
  static async refreshPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = Routes[url];
    await page.afterRender();
  }
}

export default App;

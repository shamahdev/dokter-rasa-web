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
    if (!(url in Routes)) {
      this._content.innerHTML = await this._load404();
    }
    const page = await Routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();
  }

  static async refreshPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = Routes[url];
    await page.afterRender();
  }

  async _load404() {
    return `
        <article id="main">
            <h2 class="center">Halaman tidak ditemukan</h2>
            <div id="card-group">
                <div class="msg-group">
                    <p class="center mh-auto"><span class="material-icons mr1" aria-hidden="true">error</span>Error 404 Not Found</p>
                    <a tabindex="0" href="#/home" class="btn primary rounded center mh-auto">Kembali ke Home</a>
                </div>
            </div>
        </article>
      `;
  }
}

export default App;

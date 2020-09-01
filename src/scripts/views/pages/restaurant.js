import UrlParser from '@/routes/urlparser';
import SlugParser from '@/routes/slugparser';
import RestaurantDetail from '@/utils/restaurant-detail-init';
import RestaurantApiData from '@/data/restaurant-api-data';
import RestaurantBookmark from '@/data/restaurant-bookmark-idb';

const Restaurant = {
  async render() {
    return `
        <article id="main">
            <ul class="breadcrumb">
            </ul>
            <div class="card-group">
              <div class="mh-auto center">
                  <loading-spinner></loading-spinner>
              </div>
            </div>      
        </article>
      `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const title = SlugParser.parseToText(url.slug);
    this._renderBreadcrumb(url, title);

    const main = document.querySelector('.card-group');
    let notFound = true;
    const restaurantCatalogData = await this._getCatalogData(url.resource);
    if (JSON.stringify(restaurantCatalogData) === '{}') {
      main.innerHTML =
        `<div class="msg-group">
          <p class="center mh-auto"><span class="material-icons mr1" aria-hidden="true">wifi_off</span>Detail Restoran tidak dapat di tampilkan. Periksa kembali internet anda :)</p>
          <a tabindex="0" href="#/restaurant/${url.slug}" class="btn primary rounded center mh-auto">Refresh</a>
        </div>`;
    } else {
      restaurantCatalogData.forEach((restaurant) => {
        if (restaurant.name.toLowerCase() === title.toLowerCase()) {
          main.innerHTML = '';
          notFound = false;
          RestaurantDetail.init(restaurant.id, main, RestaurantBookmark, RestaurantApiData);
        }
      });
      if (notFound) {
        window.location.hash = '#/bookmark';
      }
    }
  },

  async _getCatalogData(url) {
    if (url === 'bookmark') {
      return await RestaurantBookmark.getAllBookmark();
    } else {
      return await RestaurantApiData.getCatalog();
    }
  },

  _renderBreadcrumb(url, title) {
    const breadCrumbHtml = document.querySelector('.breadcrumb');
    breadCrumbHtml.innerHTML =
    `<li><a class="guide" href="#/${url.resource}">${url.resource}</a></li>
    <li>${title}</li>`;
  },
};

export default Restaurant;

import UrlParser from '@/routes/urlparser';
import SlugParser from '@/routes/slugparser';
import RestaurantApiData from '@/data/restaurant-api-data';
import RestaurantDetail from '@/utils/restaurant-detail-init';

const Restaurant = {
  async render() {
    return `
        <article id="main">
            <div class="mh-auto center">
                <loading-spinner></loading-spinner>
            </div>
        </article>
      `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const title = SlugParser.parseToText(url.slug);
    console.log(title);
    const main = document.getElementById('main');
    try {
      const restaurantCatalogData = await RestaurantApiData.getCatalog();
      restaurantCatalogData.forEach((restaurant) => {
        if (restaurant.name.toLowerCase() === title.toLowerCase()) {
          main.innerHTML = '';
          RestaurantDetail.init(restaurant.id, main);
        }
      });
    } catch (err) {
      main.innerHTML =
      `<div class="msg-group">
        <p class="center mh-auto"><span class="material-icons mr1" aria-hidden="true">wifi_off</span>Detail Restoran tidak dapat di tampilkan. Periksa kembali internet anda :)</p>
        <a tabindex="0" href="#/home" class="btn primary rounded center mh-auto">Refresh</a>
      </div>`;
    }
  },
};

export default Restaurant;

import RestaurantBookmark from '@/data/restaurant-bookmark-idb';
import RestaurantCatalog from '@/utils/restaurant-catalog-init';

const Bookmark = {
  async render() {
    return `
        <article id="main">
            <h2 class="center">Bookmark</h2>
            <p class="description center mh-auto">Mau pergi kemana hari ini?</p>
            <div id="card-group">
              <loading-spinner></loading-spinner>
            </div>
        </article>
      `;
  },

  async afterRender() {
    const restaurantCatalogData = await RestaurantBookmark.getAllBookmark();
    const cardGroup = document.getElementById('card-group');
    if (restaurantCatalogData.length > 0) {
      cardGroup.innerHTML = ``;
      await RestaurantCatalog.init(restaurantCatalogData, cardGroup);
      RestaurantCatalog.initModalFromBookmark();
    } else {
      cardGroup.innerHTML =
      `<div class="msg-group">
        <p class="center mh-auto"><span class="material-icons mr1" aria-hidden="true">not_interested</span>Belum ada restoran yang ditambahkan ke bookmark</p>
        <a tabindex="0" href="#/home" class="btn primary rounded center mh-auto">Cari Restoran</a>
      </div>`;
    }
  },
};

export default Bookmark;

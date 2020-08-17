import RestaurantBookmark from '@/data/restaurant-bookmark-idb';
import RestaurantCatalog from '@/utils/restaurant-catalog-init';

const Bookmark = {
  async render() {
    return `
        <article id="main">
            <h2 class="center">Bookmark</h2>
            <div id="card-group">
              <loading-spinner></loading-spinner>
            </div>
        </article>
      `;
  },

  async afterRender() {
    const restaurantCatalogData = await RestaurantBookmark.getAllBookmark();
    const cardGroup = document.getElementById('card-group');
    cardGroup.innerHTML = ``;
    await RestaurantCatalog.init(restaurantCatalogData, cardGroup);
    RestaurantCatalog.initModalFromBookmark();
  },
};

export default Bookmark;

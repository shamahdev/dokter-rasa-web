import BookmarkPresenter from '@/utils/bookmark-presenter';
import RestaurantBookmark from '@/data/restaurant-bookmark-idb';
import RestaurantApiData from '@/data/restaurant-api-data';
import ToastInitializer from '@/utils/toast-initializer';

const RestaurantCatalog = {
  init(restaurantCatalog, container, getFromBookmark = false) {
    this._container = container;
    this._getFromBookmark = getFromBookmark;
    this._restaurantCatalog = restaurantCatalog;

    this._restaurantCatalog.forEach((restaurant) => {
      const RestaurantCardElement = document.createElement('restaurant-card');
      if (getFromBookmark) {
        RestaurantCardElement.detailPage = 'bookmark';
      }
      RestaurantCardElement.restaurant = restaurant;
      this._container.appendChild(RestaurantCardElement);
    });
    this._initBookmarkEvent();
  },

  _initBookmarkEvent() {
    const bookmarkButton = this._container.querySelectorAll('button[data-bookmark]');
    bookmarkButton.forEach( async (button) => {
      await BookmarkPresenter.init(button, RestaurantBookmark, RestaurantApiData, ToastInitializer);
    });
  },
};

export default RestaurantCatalog;

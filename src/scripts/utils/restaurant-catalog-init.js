import '@/components/restaurant-card';
import BookmarkEvent from '@/utils/bookmark-event-init';

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
      await BookmarkEvent.init(button);
    });
  },
};

export default RestaurantCatalog;

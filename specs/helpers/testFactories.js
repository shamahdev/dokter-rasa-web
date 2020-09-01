import BookmarkPresenter from '@/utils/bookmark-presenter';
import RestaurantBookmark from '@/data/restaurant-bookmark-idb';
import RestaurantApiData from '@/data/restaurant-api-data';
import ToastInitializer from '@/utils/toast-initializer';

const initializeBookmarkButton = async (bookmarkSelector) => {
  setTimeout( async () => {
    await BookmarkPresenter.init(bookmarkSelector, RestaurantBookmark, RestaurantApiData, ToastInitializer);
  }, 100);
};

export { initializeBookmarkButton };
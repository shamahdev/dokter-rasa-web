import BookmarkPresenter from '@/utils/bookmark-presenter';
import RestaurantBookmark from '@/data/restaurant-bookmark-idb';
import RestaurantApiData from '@/data/restaurant-api-data';

const initializeBookmarkButton = async (bookmarkSelector) => {
  await BookmarkPresenter.init(bookmarkSelector, RestaurantBookmark, RestaurantApiData);
};

export { initializeBookmarkButton };
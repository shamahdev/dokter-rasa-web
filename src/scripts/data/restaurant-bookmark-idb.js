import {openDB} from 'idb';
import CONFIG from '@/global/config';
import SlugParser from '@/routes/slugparser';
import ToastInitializer from '@/utils/toast-initializer';

const {DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME} = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, {keyPath: 'id'});
  },
});

const RestaurantBookmark = {
  async getBookmark(restaurantId) {
    // console.log('%c Bookmark: Restaurant detail data is collected from IndexedDB.', 'background-color: green; color: white');
    if (!restaurantId) {
      return;
    }
    return (await dbPromise).get(OBJECT_STORE_NAME, restaurantId);
  },
  async getAllBookmark() {
    // console.log('%c Bookmark: Restaurant catalog datas are collected from IndexedDB.', 'background-color: green; color: white');
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },
  async putBookmark(restaurant) {
    if (restaurant.name) {
      ToastInitializer.init({
        message: `<a class="guide" href="#/restaurant/${SlugParser.parseToSlug(restaurant.name)}">${restaurant.name}</a> telah ditambahkan kedalam bookmark`,
        type: 'success',
      });
    }
    return (await dbPromise).put(OBJECT_STORE_NAME, restaurant);
  },
  async deleteBookmark(restaurantId) {
    ToastInitializer.init({
      message: `Bookmark berhasil dihapus`,
      type: 'failed',
    });
    return (await dbPromise).delete(OBJECT_STORE_NAME, restaurantId);
  },
};

export default RestaurantBookmark;

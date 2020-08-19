import {openDB} from 'idb';
import CONFIG from '@/global/config';
import ToastEvent from '@/utils/toast-event-init';

const {DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME} = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, {keyPath: 'id'});
  },
});

const RestaurantBookmark = {
  async getBookmark(restaurantId) {
    return (await dbPromise).get(OBJECT_STORE_NAME, restaurantId);
  },
  async getAllBookmark() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },
  async putBookmark(restaurant) {
    ToastEvent.init({
      message: `Bookmark berhasil ditambahkan`,
      type: 'success',
    });
    return (await dbPromise).put(OBJECT_STORE_NAME, restaurant);
  },
  async deleteBookmark(restaurantId) {
    ToastEvent.init({
      message: `Bookmark berhasil dihapus`,
      type: 'failed',
    });
    return (await dbPromise).delete(OBJECT_STORE_NAME, restaurantId);
  },
};

export default RestaurantBookmark;

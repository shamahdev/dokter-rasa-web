import {openDB} from 'idb';
import CONFIG from '@/global/config';
import Toast from '@/components/toast';

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
    Toast.init(`Restoran berhasil ditambahkan ke bookmark`, 'success');
    return (await dbPromise).put(OBJECT_STORE_NAME, restaurant);
  },
  async deleteBookmark(restaurantId) {
    Toast.init('Restoran telah dihapus dari bookmark', 'failed');
    return (await dbPromise).delete(OBJECT_STORE_NAME, restaurantId);
  },
};

export default RestaurantBookmark;

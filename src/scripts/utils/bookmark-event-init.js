import RestaurantBookmark from '@/data/restaurant-bookmark-idb';
import RestaurantApiData from '@/data/restaurant-api-data';
import ToastEvent from '@/utils/toast-event-init';

const BookmarkEvent = {
  async init(bookmarkButton) {
    this._bookmarkButton = bookmarkButton;
    await this._createEvent();
  },

  async _createEvent(bookmarkButton = this._bookmarkButton, bookmarkId = bookmarkButton.dataset.bookmark) {
    if (await this._isRestaurantExist(bookmarkId)) {
      this._removeBookmark(bookmarkButton);
    } else {
      this._addBookmark(bookmarkButton);
    }
  },

  async _isRestaurantExist(bookmarkId) {
    const restaurant = await RestaurantBookmark.getBookmark(bookmarkId);
    return !!restaurant;
  },

  _addBookmark(bookmarkButton) {
    const bookmarkId = bookmarkButton.dataset.bookmark;
    const bookmarkIcon = bookmarkButton.querySelector(`span`);
    bookmarkIcon.innerHTML = 'bookmark_border';

    const addEvent = async (event) => {
      event.stopPropagation();
      const restaurant = await RestaurantApiData.getRestaurantDetail(bookmarkId);
      if (JSON.stringify(restaurant) === '{}') {
        ToastEvent.init({
          message: `Gagal ditambahkan ke bookmark, Periksa kembali internet anda.`,
          type: 'failed',
        });
      } else {
        await RestaurantBookmark.putBookmark(restaurant.restaurant);
        this._createEvent(bookmarkButton);
      }
    };
    bookmarkButton.addEventListener('click', addEvent.bind(this), {once: true});
  },

  _removeBookmark(bookmarkButton) {
    const bookmarkId = bookmarkButton.dataset.bookmark;
    const bookmarkIcon = bookmarkButton.querySelector(`span`);
    bookmarkIcon.innerHTML = 'bookmark';

    const removeEvent = async (event) => {
      event.stopPropagation();
      await RestaurantBookmark.deleteBookmark(bookmarkId);
      this._createEvent(bookmarkButton);
    };
    bookmarkButton.addEventListener('click', removeEvent.bind(this), {once: true});
  },

};

export default BookmarkEvent;

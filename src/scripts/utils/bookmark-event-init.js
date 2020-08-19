import RestaurantBookmark from '@/data/restaurant-bookmark-idb';
import RestaurantApiData from '@/data/restaurant-api-data';
import App from '@/views/app';
import ToastEvent from '@/utils/toast-event-init';

const BookmarkEvent = {
  init(bookmarkButton) {
    this._bookmarkButton = bookmarkButton;
    this._id = this._bookmarkButton.dataset.bookmark;
    this._createEvent();
  },

  async _createEvent() {
    const bookmark = this._bookmarkButton;
    const id = this._id;
    if (await this._isRestaurantExist(id)) {
      this._removeBookmark(bookmark, id);
    } else {
      this._addBookmark(bookmark, id);
    }
  },

  async _isRestaurantExist(id) {
    const restaurant = await RestaurantBookmark.getBookmark(id);
    return !!restaurant;
  },

  _addBookmark(bookmark, id) {
    const bookmarkIcon = bookmark.querySelector(`span`);
    bookmarkIcon.innerHTML = 'bookmark_border';

    const addEvent = async (event) => {
      event.stopPropagation();
      const restaurant = await RestaurantApiData.getRestaurantDetail(id);
      if (JSON.stringify(restaurant) === '{}') {
        ToastEvent.init({
          message: `Gagal ditambahkan ke bookmark, Periksa kembali internet anda.`,
          type: 'failed',
        });
      } else {
        RestaurantBookmark.putBookmark(restaurant.restaurant);
        this._sync(bookmark, addEvent);
      }
    };
    bookmark.addEventListener('click', addEvent.bind(this));
  },

  _removeBookmark(bookmark, id) {
    const bookmarkIcon = bookmark.querySelector(`span`);
    bookmarkIcon.innerHTML = 'bookmark';

    const removeEvent = async (event) => {
      event.stopPropagation();
      await RestaurantBookmark.deleteBookmark(id);
      this._sync(bookmark, removeEvent);
    };
    bookmark.addEventListener('click', removeEvent.bind(this));
  },

  async _sync(bookmark, event) {
    bookmark.removeEventListener('click', event.bind(this));
    await this._createEvent();
    App.refreshPage();

    setTimeout(async () => {
      const backtoDetailButton = document.querySelector(`button[data-bookmark="${bookmark.dataset.bookmark}"]`);
      if (backtoDetailButton) {
        await backtoDetailButton.focus();
      }
    }, 300);
  },
};

export default BookmarkEvent;

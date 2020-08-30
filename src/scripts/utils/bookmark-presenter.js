import App from '@/views/app';
import UrlParser from '@/routes/urlparser';
import ToastInitializer from '@/utils/toast-initializer';

const BookmarkPresenter = {
  async init(bookmarkButton, RestaurantBookmark, RestaurantApiData) {
    this._bookmarkButton = bookmarkButton;
    this._RestaurantApiData = RestaurantApiData;
    this._RestaurantBookmark = RestaurantBookmark;
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
    const restaurant = await this._RestaurantBookmark.getBookmark(bookmarkId);
    return !!restaurant;
  },

  _addBookmark(bookmarkButton) {
    const bookmarkId = bookmarkButton.dataset.bookmark;
    const bookmarkIcon = bookmarkButton.querySelector(`span`);
    bookmarkIcon.innerHTML = 'bookmark_border';

    const addEvent = async (event) => {
      event.stopPropagation();
      const restaurant = await this._RestaurantApiData.getRestaurantDetail(bookmarkId);
      if (JSON.stringify(restaurant) === '{}' || restaurant.error) {
        ToastInitializer.init({
          message: `Gagal ditambahkan ke bookmark, Periksa kembali internet anda.`,
          type: 'failed',
        });
      } else {
        this._createEvent(bookmarkButton);
      }
      await this._RestaurantBookmark.putBookmark(restaurant.restaurant || {'id': bookmarkId, 'error': true});
    };
    bookmarkButton.addEventListener('click', addEvent.bind(this), {once: true});
  },

  _removeBookmark(bookmarkButton) {
    const bookmarkId = bookmarkButton.dataset.bookmark;
    const bookmarkIcon = bookmarkButton.querySelector('span');
    bookmarkIcon.innerHTML = 'bookmark';

    const removeEvent = async (event) => {
      event.stopPropagation();
      await this._RestaurantBookmark.deleteBookmark(bookmarkId);

      const url = UrlParser.parseActiveUrlWithCombiner();
      const page = url;
      if (page.includes('/bookmark')) {
        App.refreshPage();
      } else {
        this._createEvent(bookmarkButton);
      }
    };
    bookmarkButton.addEventListener('click', removeEvent.bind(this), {once: true});
  },

};

export default BookmarkPresenter;

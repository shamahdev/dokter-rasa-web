import UrlParser from '@/routes/urlparser';
import Routes from '@/routes/routes';

const BookmarkPresenter = {
  async init(bookmarkButton, RestaurantBookmark, RestaurantApiData, ToastInitializer) {
    this._bookmarkButton = bookmarkButton;
    this._RestaurantApiData = RestaurantApiData;
    this._RestaurantBookmark = RestaurantBookmark;
    this._ToastInitializer = ToastInitializer;
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
        this._ToastInitializer.init({
          message: `Gagal ditambahkan ke bookmark, Periksa kembali internet anda.`,
          type: 'failed',
        });
      } else {
        this._removeBookmark(bookmarkButton);
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
      if (url.includes('/bookmark')) {
        const page = await Routes[url];
        await page.afterRender();
      } else {
        this._createEvent(bookmarkButton);
      }
    };
    bookmarkButton.addEventListener('click', removeEvent.bind(this), {once: true});
  },

};

export default BookmarkPresenter;

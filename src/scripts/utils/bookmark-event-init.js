import RestaurantBookmark from '@/data/restaurant-bookmark-idb';
import RestaurantApiData from '@/data/restaurant-api-data';
import App from '@/views/app';

const BookmarkEvent = {
  async init(bookmarkButton) {
    this._bookmarkButton = bookmarkButton;
    this._id = this._bookmarkButton.dataset.bookmark;
    await this._createEvent();
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
      RestaurantBookmark.putBookmark(restaurant.restaurant);

      bookmark.removeEventListener('click', addEvent.bind(this));
      App.refreshPage();
    };
    bookmark.addEventListener('click', addEvent.bind(this));
  },

  _removeBookmark(bookmark, id) {
    const bookmarkIcon = bookmark.querySelector(`span`);
    bookmarkIcon.innerHTML = 'bookmark';

    const removeEvent = async (event) => {
      event.stopPropagation();
      await RestaurantBookmark.deleteBookmark(id);

      bookmark.removeEventListener('click', removeEvent.bind(this));
      App.refreshPage();
    };
    bookmark.addEventListener('click', removeEvent.bind(this));
  },
};

export default BookmarkEvent;

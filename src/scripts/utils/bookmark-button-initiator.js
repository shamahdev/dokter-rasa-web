import UrlParser from '@/routes/urlparser';
import routes from '@/routes/routes';
import RestaurantBookmark from '@/data/restaurant-idb';
import RestaurantDataSource from '@/data/data';

const BookmarkBtnInitiator = {
  async init(bookmarkButton) {
    this._bookmarkButton = bookmarkButton;
    await this._renderButton(this._bookmarkButton);
  },

  async _renderButton(bookmark) {
    const id = bookmark.dataset.bookmark;

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
    const bookmarkIcon = bookmark.querySelector(`i`);
    bookmarkIcon.innerHTML = 'bookmark_border';

    const add = async (event) => {
      event.stopPropagation();
      const restaurant = await RestaurantDataSource.detail(id);
      RestaurantBookmark.putBookmark(restaurant.restaurant);
      bookmark.removeEventListener('click', add);
      this._refresh();
      this._renderButton(bookmark);
    };

    bookmark.addEventListener('click', add);
  },

  _removeBookmark(bookmark, id) {
    const bookmarkIcon = bookmark.querySelector(`i`);
    bookmarkIcon.innerHTML = 'bookmark';

    const remove = async (event) => {
      event.stopPropagation();
      await RestaurantBookmark.deleteBookmark(id);
      bookmark.removeEventListener('click', remove);
      this._refresh();
      this._renderButton(bookmark);
    };
    bookmark.addEventListener('click', remove);
  },

  async _refresh() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    await page.afterRender();
  },
};

export default BookmarkBtnInitiator;

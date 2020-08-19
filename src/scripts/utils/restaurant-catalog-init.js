import '@/components/restaurant-card';
import ModalInitiator from '@/utils/restaurant-modal-init';
import BookmarkEvent from '@/utils/bookmark-event-init';
import ToastEvent from '@/utils/toast-event-init';

const RestaurantCatalog = {
  init(restaurantCatalog, container) {
    this._container = container;
    this._catalog = restaurantCatalog;

    this._catalog.forEach((restaurant) => {
      const RestaurantCardElement = document.createElement('restaurant-card');
      RestaurantCardElement.restaurant = restaurant;
      this._container.appendChild(RestaurantCardElement);
    });
  },

  initModal() {
    this.initBookmark();
    const detailButton = document.querySelectorAll('button[data-modal]');
    detailButton.forEach( (element) => {
      element.addEventListener('click', async (event) => {
        event.stopPropagation();
        try {
          await ModalInitiator.init(element.dataset.modal);
        } catch (err) {
          console.log(err);
          ToastEvent.init({
            message: `Gagal menampilkan data, Periksa kembali internet anda.`,
            type: 'failed',
          });
        }
      });
    });
  },

  initModalFromBookmark() {
    this.initBookmark();
    const detailButton = this._container.querySelectorAll('button[data-modal]');
    detailButton.forEach( (element) => {
      element.addEventListener('click', async (event) => {
        event.stopPropagation();
        await ModalInitiator.init(element.dataset.modal, true /* Create Modal from Bookmark: true */);
      });
    });
  },

  initBookmark() {
    const bookmarkButton = this._container.querySelectorAll('button[data-bookmark]');
    bookmarkButton.forEach( async (element) => {
      await BookmarkEvent.init(element);
    });
  },
};

export default RestaurantCatalog;

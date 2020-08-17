import '@/components/restaurant-modal';
import RestaurantApiData from '@/data/restaurant-api-data';
import RestaurantBookmark from '@/data/restaurant-bookmark-idb';
import BookmarkEvent from '@/utils/bookmark-event-init';

const ModalInitiator = {
  async init(restaurantId, getFromBookmark = false) {
    this._body = document.querySelector('body');
    this._restaurantId = restaurantId;
    this._getFromBookmark = getFromBookmark;

    this._RestaurantModalElement = document.createElement('restaurant-modal');
    this._RestaurantModalElement.restaurant = await this._getData();
    await this._body.appendChild(this._RestaurantModalElement);

    // Modal
    this._modal = document.getElementById(this._restaurantId);
    this._allModalButtons = this._modal.querySelectorAll('button, a');
    this._bookmarkButton = this._modal.querySelector(`button[data-bookmark="${this._modal.id}"]`);
    this._closeButton = this._modal.querySelector('button.close-button');

    // Review
    this._reviewForm = this._modal.querySelector('form#review-form');
    this._reviewContent = this._modal.querySelector('.modal-review');
    this._reviewContent.innerHTML = await this._RestaurantModalElement.reviewList;


    setTimeout(() => {
      this._createEvent();
    }, 100);
  },

  async _resyncReview(review) {
    console.warn('Review re-sync complete.');
    const reviewContent = this._reviewContent;
    const RestaurantModalElement = this._RestaurantModalElement;
    RestaurantModalElement.reviews = review;
    reviewContent.innerHTML = await RestaurantModalElement.reviewList;
  },

  async _getData() {
    let restaurantData = '';
    if (this._getFromBookmark) {
      restaurantData = await RestaurantBookmark.getBookmark(this._restaurantId);
      console.warn('Data is collected from IndexedDB.');
    } else {
      restaurantData = await RestaurantApiData.getRestaurantDetail(this._restaurantId);
      restaurantData = restaurantData.restaurant;
    }
    return restaurantData;
  },

  async _createEvent() {
    const bookmarkButton = this._bookmarkButton;
    const closeButton = this._closeButton;

    await BookmarkEvent.init(bookmarkButton);
    await this._initReviewForm();

    this._toggleModal();

    document.addEventListener('keyup', this._keyEvent.bind(this));
    closeButton.addEventListener('click', this._closeModal.bind(this));
  },

  async _initReviewForm() {
    const modalForm = this._modal.querySelector('.modal-form');
    const reviewForm = this._reviewForm;
    const collapseToggler = this._modal.querySelector('#review-collapse');
    const iconToggler = collapseToggler.querySelector('span');

    const getCollapseIcon = () => {
      return (modalForm.classList.contains('collapse') ? 'keyboard_arrow_down' : 'keyboard_arrow_up');
    };

    collapseToggler.addEventListener('click', (event) => {
      event.stopPropagation();
      modalForm.classList.toggle('collapse');
      iconToggler.innerHTML = getCollapseIcon();
    });

    reviewForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const nameInput = reviewForm.querySelector('input#name');
      const reviewInput = reviewForm.querySelector('textarea#review');
      const reviewData = {
        id: this._modal.id,
        name: nameInput.value,
        review: reviewInput.value,
      };

      const updatedReview = await RestaurantApiData.addReview(reviewData);
      reviewForm.reset();
      this._resyncReview(updatedReview.customerReviews);
    });
  },

  _keyEvent(event) {
    const modal = this._modal;
    const allModalButtons = this._allModalButtons;
    if (modal.id) {
      if (event.keyCode === 27) {
        this._closeModal();
      } else if (event.keyCode === 70) {
        // Nothing
      } else if (event.keyCode === 9) {
        if (event.target === allModalButtons[allModalButtons.length - 2]) {
          const collapseToggler = modal.querySelector('#review-collapse');
          collapseToggler.click();
        }
      }
    }
  },

  _toggleModal() {
    const body = this._body;
    const modal = this._modal;
    body.classList.toggle('opened2');
    modal.classList.toggle('show-modal');
  },

  _closeModal() {
    const body = document.querySelector('body');
    const modal = this._modal;
    body.classList.remove('opened2');
    modal.classList.remove('show-modal');

    setTimeout(async () => {
      await document.querySelector(`button[data-modal="${modal.id}"]`).focus();
      modal.remove();
    }, 300);
  },


};
export default ModalInitiator;
